import { selectChoosenUserProfile } from '@/Redux/Reducers/sliceChoosenUserAndProfile';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import { AppControlOptimizedQueryUrl, UserProfilesUrl } from '@/Utils/Config';
import { SpecialtyFieldList } from '@/Utils/constants';
import { axiosRequest } from '@/Utils/functions';
import { getOptimizedQuery } from '@/Utils/pagination';
import { SpecialtyOptimizedType } from '@/Utils/types';
import { Message } from '@mui/icons-material';
import { Button, Grid, MenuItem, Paper, Select, Typography } from '@mui/material'
import { message, notification } from 'antd';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


interface PromoteProps {
    mySpecialtyList: any
    myLevelList: number[]
}

const Tab2PromoteProfile:FC<PromoteProps> = ({ mySpecialtyList, myLevelList }) => {
        const router = useRouter()
    const storeUser = useSelector(selectAuthUser);
    const storeProfile = useSelector(selectChoosenUserProfile);
    const [ loading, setLoading ] = useState<boolean>(false)
    const lastLevel = myLevelList[myLevelList.length - 1]
    const lastAcademicYear = mySpecialtyList[0][2]
    const nextAcademicYear = (parseInt(lastAcademicYear.slice(0, 4)) + 1).toString() + "/" + (parseInt(lastAcademicYear.slice(0, 4)) + 2).toString()
    const [ promote, setPromote ] = useState<boolean>(false)
    const [ promoteButton, setPromoteButton ] = useState<boolean>(false)
    const [ count, setCount ] = useState<number>(0)
    const [ nextSpecialtyID, setNextSpecialtyID ] = useState<number>(0)
    const [ nextSpecialties, setNextSpecialties ] = useState<SpecialtyOptimizedType[]>()
    const [ allLevels, setAllLevels ] = useState<any[]>([])
    const [ nextLevel, setNextLevel ] = useState<number>(0)

    useEffect(() => {
        if (count == 0) {
           getOptimizedQuery(setAllLevels, ()=>{}, ()=>{}, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, {  model: "Level", fieldList: ["id", "level"] } );
           setCount(count + 1);
        }
        if (count == 1) { 
            if (allLevels.length > 0) { 
                const fil = allLevels.filter(item => item[1] > lastLevel).map(item => item[1]).sort()[0]
                if (fil) { 
                    setNextLevel(fil) 
                } else {
                    setNextLevel(lastLevel)
                }
                setCount(count + 1)
            }
        }
        if (count == 2) {
            if (nextLevel > lastLevel) {
                getOptimizedQuery(setNextSpecialties, ()=>{}, ()=>{}, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, {  
                    model: "Specialty", 
                    searchField: ["level__level", "main_specialty__domain__id", "academic_year"],
                    value: [nextLevel, mySpecialtyList[0][4], nextAcademicYear],
                    fieldList: SpecialtyFieldList } 
                );
            }
            if (nextSpecialties) {
                setCount(count + 1);
            } 
        }
    }, [count, allLevels, lastLevel, nextLevel, nextSpecialties, mySpecialtyList, nextAcademicYear])
    
    const onPromote = async (data: any) => {
        if (nextSpecialtyID < 1) {
            message.error("Select Next Class !!!");
            return;
        }

        let values = {
            user_id: storeProfile[15],
            specialty_id: nextSpecialtyID,
            created_by_id: storeUser.id,
        }
        setLoading(true)
        const response = await axiosRequest<any>({
            method: "post",
            url: UserProfilesUrl,
            payload: values,
            hasAuth: true,
        }) 
        setLoading(false)
        
        if (response?.data) {
            console.log(response.data)
            if (response.data.success) {
              notification.success({
                "message": "OK",
                "description": "Successfully Promoted"
              });
              router.back();
            }
            if (response.data.error) {
              notification.error({
                "message": "FAILED",
                "description": `${JSON.stringify(response.data.error)}`
              });
            }
        }
    } 

    return (
        <div>
            <Grid spacing={3} pt={2} px={2}>
                <Grid item xs={12} py={1}>
                    <Typography color="blue" variant='h4' textAlign="center">
                        Promote Student
                    </Typography>
                </Grid>
            </Grid>

            {mySpecialtyList.map((item: SpecialtyOptimizedType) => (
                <Paper key={item[0]} sx={{ marginX: 3, marginY: 1 }} elevation={8}>
                    <Grid item xs={12} sm={6} lg={4} py={1}>
                        <Typography color="" variant='h4' paddingLeft={3} >
                            Level - {item[6]}
                        </Typography>
                        <Typography color="teal" variant='h5' pl={3}>
                            Academic Year - {item[2]}
                        </Typography>
                        <Typography color="teal" variant='h5' pl={3}>
                            Specialty - {item[1]}
                        </Typography>
                    </Grid>
                </Paper> 
            ))}

            <Grid spacing={3} p={2}>
                <Grid item xs={12} py={2} justifyContent="center" alignItems="center" alignContent="center" display="flex">
                    <Button 
                        variant="outlined"
                        onClick={() => { 
                            setPromote(!promote); 
                            setPromoteButton(!promoteButton)}
                        }
                        disabled={loading}
                    >
                        <Typography color="" variant='h5' textAlign="center">
                            Click To Select Next Class
                        </Typography>
                    </Button>
                </Grid>
            </Grid>

            {promote && nextSpecialties && <Grid item xs={12} px={3} pb={4}>
                <Select
                    id="label_select_field"
                    labelId="label_select_field"
                    value={nextSpecialtyID}
                    label="Select Field"
                    onChange={(e) => setNextSpecialtyID(parseInt(e.target.value.toString()))}
                    fullWidth
                >
                    {nextSpecialties?.map((item: any) => (
                        <MenuItem key={item[0]} value={item[0]}>{item[1]} {item[2]} L-{item[6]}</MenuItem>
                    ))}
                </Select>
            </Grid> }

            {promoteButton && <Grid spacing={3} p={2}>
                <Grid item xs={12} py={1} justifyContent="center" alignItems="center" alignContent="center" display="flex">
                    <Button 
                        variant="contained"
                        onClick={() => onPromote(nextSpecialtyID)}
                        disabled={loading || nextSpecialtyID < 1}
                    >
                        <Typography color="" variant='h3' textAlign="center">
                            Promote
                        </Typography>
                    </Button>
                </Grid>
            </Grid>}

        </div>
    )
}

export default Tab2PromoteProfile