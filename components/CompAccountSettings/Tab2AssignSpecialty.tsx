import MyButtonLoader from '@/Designs/MyButtonLoader'
import { AppControlOptimizedQueryUrl, UserProfilesUrl } from '@/Utils/Config'
import { SpecialtyFieldList, listOfAcademicYears } from '@/Utils/constants'
import { getOptimizedQuery } from '@/Utils/pagination'
import { DomainOptimizedType, LevelOptimizedType, SpecialtyOptimizedType, UserProfileOptimizedType } from '@/Utils/types'
import { Button, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { message, notification } from 'antd';
import React, { FC, useEffect, useState } from 'react'
import { selectAuthUser } from '@/Redux/Reducers/sliceUser'
import { useSelector } from 'react-redux'
import { axiosRequest } from '@/Utils/functions'
import { useRouter } from 'next/navigation'


interface Props {
    selectedProfile: any
}

const Tab2AssignSpecialty:FC<Props> = ({ selectedProfile }) => {
    const router = useRouter();
    const storeUser = useSelector(selectAuthUser);
    const [ count, setCount ] = useState<number>(0)
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ domains, setDomains ] = useState<DomainOptimizedType[]>()
    const [ levels, setLevels ] = useState<LevelOptimizedType[]>()
    const [ specialties, setSpecialties ] = useState<any[]>()
    const [ specialtiesData, setSpecialtiesData ] = useState<any[]>()

    const [ selectedDomainID, setSelectedDomainID ] = useState<number>(0)
    const [ selectedSpecialtyID, setSelectedSpecialtyID ] = useState<number>(0)
    const [ selectedLevelID, setSelectedLevelID ] = useState<number>(0)
    const [ selectedAcademicYear, setSelectedAcademicYear ] = useState<string>('')

    const [ specialtyFieldList, setSpecialtyFieldList ] = useState(SpecialtyFieldList) 

    useEffect(() => {
        if (count == 0) {
            getOptimizedQuery(setDomains, ()=>{}, ()=>{}, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, { model: "Domain", fieldList: ["id", "domain_name"]}) ;
            getOptimizedQuery(setLevels, ()=>{}, ()=>{}, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, { model: "Level", fieldList: ["id", "level"]});
            setCount(count + 1)
        }
        if (count == 1) {
            if (selectedDomainID > 0 && selectedAcademicYear != "" && selectedLevelID > 0) {
                getOptimizedQuery(setSpecialties, ()=>{}, ()=>{}, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, { 
                    model: "Specialty", 
                    searchField: ["main_specialty__domain__id", "academic_year", "level__id"],
                    value: [selectedDomainID, selectedAcademicYear, selectedLevelID],
                    fieldList: [...specialtyFieldList]}
                );
                if (specialties != undefined) { 
                    setCount(count + 1); 
                    setSpecialtiesData(specialties);
                }
            }
        }
        if (count == 2) {
            if (specialties) { 
                setSpecialtiesData(specialties);
            }
        }
    }, [count, specialties, selectedDomainID, selectedAcademicYear, selectedLevelID, specialtyFieldList])

    const handleChange = (val: any) => {
        setSelectedSpecialtyID(val.target.value)
    }
    const handleChangeDomain = (val: any) => {
        setSelectedDomainID(val.target.value);
        setSpecialtiesData([]);
        setCount(1);
    }
    const handleChangeAcademicYear = (val: any) => {
        setSelectedAcademicYear(val.target.value);
        setSpecialtiesData([]);
        setCount(1);
    }
    const handleChangeLevel = (val: any) => {
        setSelectedLevelID(val.target.value);
        setSpecialtiesData([]);
        setCount(1);
    }

    const onSubmit = async (data: number) => {
        if (selectedSpecialtyID < 1) {
          message.error("Select a Specialty !!!");
          return;
        }
        setLoading(true);

        let values = {
            user_id: selectedProfile[15],
            role: selectedProfile[12],
            specialty_id: selectedSpecialtyID,
            updated_by_id: storeUser.id,
        }
        const response = await axiosRequest<any>({
            method: "put",
            url: UserProfilesUrl + "/" + selectedProfile[0],
            payload: values,
            hasAuth: true,
        })

        setLoading(false)
        if (response?.data) {
          if (response.data.success) {
            notification.success({
              "message": "OK",
              "description": "Specialty Assigned Successfully"
            });
            router.back();
          }
          if (response.data.errors) {
            notification.error({
              "message": "FAILED",
              "description": `${JSON.stringify(response.data.errors)}`
            });
          }
          if (response.data.error) {
            notification.error({
              "message": "FAILED",
              "description": `${JSON.stringify(response.data.error)}`
            });
          }
          setLoading(false)
        }
    }

    return (
        <div>
            <Grid spacing={3} p={2}>
                <Grid item xs={12} py={1}>
                    <Typography color="blue" variant='h4' textAlign="center">
                        Assign Specialty To Student
                    </Typography>
                </Grid>
        
                <Grid item xs={12} sm={6} lg={4} py={1}>
                    <InputLabel htmlFor='account-settings-confirm-new-password'>Select Field</InputLabel>
                    <Select
                    id="label_select_field"
                    labelId="label_select_field"
                    value={selectedDomainID}
                    label="Select Field"
                    onChange={handleChangeDomain}
                    fullWidth
                    >
                    {domains?.map((item: any) => (
                        <MenuItem key={item[0]} value={item[0]}>{item[1]}</MenuItem>
                    ))}
                    </Select>
                </Grid> 

                <Grid item xs={12} sm={6} lg={4} py={1}>
                    <InputLabel htmlFor='account-settings-confirm-new-password'>Academic Year</InputLabel>
                    <Select
                    id="label_select_academic_year"
                    labelId="label_select_academic_year"
                    value={selectedAcademicYear}
                    label="Select Academic Year"
                    onChange={handleChangeAcademicYear}
                    fullWidth
                    >
                    {listOfAcademicYears.map((item: string) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                    </Select>
                </Grid> 

                <Grid item xs={12} sm={6} lg={4} py={1}>
                    <InputLabel htmlFor='account-settings-confirm-new-password'>Select Level</InputLabel>
                    <Select
                    id="label_select_level"
                    labelId="label_select_level"
                    value={selectedLevelID}
                    label="Select Level"
                    onChange={handleChangeLevel}
                    fullWidth
                    >
                    {levels?.map((item: LevelOptimizedType) => (
                        <MenuItem key={item[0]} value={item[0]}>{item[1]}</MenuItem>
                    ))}
                    </Select>
                </Grid> 

                <Grid item xs={12} py={1}>
                    <InputLabel htmlFor='account-settings-confirm-new-password'>Select Specialty</InputLabel>
                    <Select
                    id="label_select_specialty"
                    labelId="label_select_specialty"
                    value={selectedSpecialtyID}
                    label="Select Specialty"
                    onChange={handleChange}
                    fullWidth
                    >
                    {specialtiesData?.map((item: any) => (
                        <MenuItem key={item[0]} value={item[0]}>{item[1]} {item[2]} Level-{item[6]}</MenuItem>
                    ))}
                    </Select>
                </Grid> 

                <Grid item xs={12} py={2}>
                    <Button 
                        color="primary"
                        variant="contained"
                        size="large"
                        onClick={() =>{onSubmit(selectedSpecialtyID)}} 
                        sx={{ marginRight: 2, width: "70%" }}
                        disabled={loading || (selectedSpecialtyID < 1)}
                    >
                        Save
                    </Button>

                    {loading ? <MyButtonLoader
                        onClick={() => {}}
                        fetching={loading}
                        loadingText="Saving"
                    /> : <></>}
                </Grid>
            </Grid>
        </div>
  )
}

export default Tab2AssignSpecialty