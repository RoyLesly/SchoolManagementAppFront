'use client';
import {
    Typography, Box, Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Stack,
    Fab,
} from '@mui/material';
import DashboardCard from '@/components/CompAdmin/shared/DashboardCard';
import { FC, useEffect, useState } from 'react';
import { UserProfile } from '@/Utils/types';
import { useGetAllUserProfiles } from '@/Utils/customHooks';
import { getAllUserProfiles } from '@/Utils/functions';
import MyButtonReload from '@/Designs/MyButtonReload'; 
import EditProfileFormModal from '@/Designs/Modals/EditProfileFormModal';
import DeleteItemFormModal from '@/Designs/Modals/DeleteItemFormModal';
import { UserProfilesUrl } from '@/Utils/Config';
import { green } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addChoosenUser, addChoosenUserProfile, removeChoosenUser, removeChoosenUserProfile } from '@/Redux/Reducers/sliceChoosenUserAndProfile';
import { useRouter } from 'next/navigation';


interface UserProfilesProps {
    userprofiletype: string
}
const TableProfiles:FC<UserProfilesProps> = ({ userprofiletype }) => {
    const router = useRouter();
    const dispatch = useDispatch();    
    const [ fetching, setFetching ] = useState<boolean>(false)
    const [ record, setRecord ] = useState<UserProfile | null>(null)
    const [ userProfiles, setUserProfiles ] = useState<UserProfile[]>([])
    const [ userProfilesData, setUserProfilesData ] = useState<UserProfile[]>([])
    const [ editUserProfileFormModal, setEditUserProfileFormModal ] = useState<boolean>(false)
    const [ deleteUserProfileFormModal, setDeleteUserProfileFormModal ] = useState<boolean>(false)

    useGetAllUserProfiles(setUserProfiles, setFetching)

    useEffect(() => {
        dispatch(removeChoosenUser())
        dispatch(removeChoosenUserProfile())
        const filter = userProfiles.filter((item: UserProfile) => item.user.role == userprofiletype);
        setUserProfilesData(filter)
    }, [userProfiles, userprofiletype, dispatch])

    const reset = () => {
        setFetching(true)
        getAllUserProfiles(setUserProfiles, setFetching)
    }

    const buttonSx = {
        ...(fetching && {
            bgcolor: green[500], '&:hover': {
                bgcolor: green[800],
            },
        }),
    };

    return (

        <DashboardCard title={`${userprofiletype == "student" ? "Student" : "Lecturer"} List`}>
            <Box sx={{ overflow: 'auto', width: { xs: '380px', sm: 'auto' } }}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <MyButtonReload fetching={fetching} reset={reset} />
                        <Button sx={{ m: 0, position: 'relative' }}>
                            <Fab
                                aria-label="save"
                                color="primary"
                                sx={buttonSx}
                                onClick={() => reset()}
                            >
                            {fetching ? "Loading" : <>{userProfilesData.length}</>}
                            </Fab>
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Table
                            aria-label="simple table"
                            sx={{
                                whiteSpace: "nowrap",
                                mt: 0
                            }}
                        >
                            <TableHead>
                                <TableRow>
                                
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Username / Matricle
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Full Name
                                        </Typography>
                                    </TableCell>
                                                                               
                                    {userprofiletype == "student" ? <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Specialty - Year - Level
                                        </Typography>
                                    </TableCell> : <></>}

                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Telephone
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Email
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Action
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userProfilesData.map((item: UserProfile) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {item.user.username} / {item.user?.matricle}
                                            </Typography>
                                        </TableCell>

                                        {userprofiletype == "student" ? <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {item.user?.first_name} {item.user?.last_name}
                                            </Typography>
                                            </TableCell> : <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    {item.user?.title}. {item.user?.first_name} {item.user?.last_name}                                            
                                                </Typography>
                                            </TableCell>
                                        }

                                        {userprofiletype == "student" && <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {item.specialty ? `${item.specialty?.main_specialty?.specialty_name} ${item.specialty?.academic_year} L${item.specialty?.level?.level}`: ""}
                                            </Typography>
                                        </TableCell>}

                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                {item.user?.telephone}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                {item.user?.email}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='left'>
                                            <Stack justifyItems="center" direction="row" spacing={1} justifyContent="center">
                                                <Button 
                                                    onClick={ () => { 
                                                        dispatch(addChoosenUserProfile(item)); 
                                                        router.push(`/AdministrationPages/AccountSettings/${item.user.id}`) 
                                                    }} 
                                                    variant="contained" disableElevation color="primary">
                                                    View
                                                </Button>
                                                <Button onClick={() => {setRecord(item); setDeleteUserProfileFormModal(true)}} variant="contained" disableElevation color="primary">
                                                    Delete
                                                </Button>
                                            </Stack>
                                            
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>

                <EditProfileFormModal
                    showModal={editUserProfileFormModal}
                    setShowModal={setEditUserProfileFormModal}
                    record={record}
                    reset={reset}
                    userRole={userprofiletype}
                />

                <DeleteItemFormModal 
                    showModal={deleteUserProfileFormModal}
                    setShowModal={setDeleteUserProfileFormModal}
                    record={record}
                    url={UserProfilesUrl}
                    record_name={record?.user.username ? record.user.username : ""}
                    reset={reset}
                />
            </Box>            
        </DashboardCard>
    );
};

export default TableProfiles;
