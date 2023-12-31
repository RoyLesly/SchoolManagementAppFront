'use client';
import {
    Typography, Box, Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
    Button,
    Stack,
    Input,
    TableContainer,
} from '@mui/material';
import DashboardCard from '@/components/CompAdmin/shared/DashboardCard';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { UserProfile } from '@/Utils/types';
import EditProfileFormModal from '@/Designs/Modals/EditProfileFormModal';
import DeleteItemFormModal from '@/Designs/Modals/DeleteItemFormModal';
import { PageUserProfilesLecturersUrl, PageUserProfilesStudentsUrl, PageUserProfilesUrl } from '@/Utils/Config';
import { useDispatch } from 'react-redux';
import { addChoosenUserProfile, removeChoosenUser, removeChoosenUserProfile } from '@/Redux/Reducers/sliceChoosenUserAndProfile';
import { useRouter } from 'next/navigation';
import MyButtonLoader from '@/Designs/MyButtonLoader';
import { pageGetAllUserProfiles, getData } from '@/Utils/pagination';


interface UserProfilesProps {
    userprofiletype: string
}
const TableProfiles:FC<UserProfilesProps> = ({ userprofiletype }) => {
    const router = useRouter();
    const dispatch = useDispatch();    
    const [ count, setCount ] = useState<number>(0)
    const [ countTotal, setCountTotal ] = useState<number>(0)
    const [ nextLink, setNextLink ] = useState<string | null>(null)
    const [ prevLink, setPrevLink ] = useState<string | null>(null)
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ page, setPage ] = useState<number>(0)
    const [ rowsPerPage, setRowsPerPage ] = useState<number>(100)
    const [ fetching, setFetching ] = useState<boolean>(true)
    const [ record, setRecord ] = useState<UserProfile | null>(null)
    const [ userProfiles, setUserProfiles ] = useState<UserProfile[]>([])
    const [ userProfilesData, setUserProfilesData ] = useState<UserProfile[]>([])
    const [ userProfilesDataPrev, setUserProfilesDataPrev ] = useState<UserProfile[]>([])
    const [ userProfilesDataNext, setUserProfilesDataNext ] = useState<UserProfile[]>([])
    const [ deleteUserProfileFormModal, setDeleteUserProfileFormModal ] = useState<boolean>(false)

    useEffect(() => {
        let URL = ""
        if (userprofiletype == "student" && count == 0) { URL = PageUserProfilesStudentsUrl}
        if (userprofiletype == "teacher" && count == 0) { URL = PageUserProfilesLecturersUrl}
        if (count == 0) {
            if (page == 0) { pageGetAllUserProfiles(setUserProfiles, setFetching, setCountTotal, setNextLink, setPrevLink, URL) }
            if (page != 0) { pageGetAllUserProfiles(setUserProfiles, setFetching, setCountTotal, setNextLink, setPrevLink, URL + "?page=" + page) }
            setCount(count + 1)
        }
        if (count == 1) {
            dispatch(removeChoosenUser());
            dispatch(removeChoosenUserProfile());
            if (userProfiles.length > 0) {
                setUserProfilesData(userProfiles)
                setCount(count + 1);
                setLoading(false);
            }
        }
        if (count == 3) {
            console.log("Use Effect Completed")
        }
    }, [userProfiles, page, count, userprofiletype, dispatch])

    useEffect(() => {
        let URL = userprofiletype == "student" ? PageUserProfilesStudentsUrl : PageUserProfilesLecturersUrl
        if (count == 4) {
            if (page == 0){
                setUserProfilesDataPrev([])
                getData(setUserProfilesData, setFetching, setCountTotal, setNextLink, setPrevLink, URL + "?page=" + 1)
                if (nextLink != null) { getData(setUserProfilesDataNext, setFetching, setCountTotal, setNextLink, setPrevLink, URL + "?page=" + 2) }
            }
            if (page > 0){
                getData(setUserProfilesDataPrev, setFetching, setCountTotal, setNextLink, setPrevLink, URL + "?page=" + page )
                if (nextLink != null) { getData(setUserProfilesDataNext, setFetching, setCountTotal, setNextLink, setPrevLink, URL + "?page=" + (page + 2)) }
            }
            setCount(count + 1)
        }
    }, [count, prevLink, nextLink, page, userprofiletype])

    const reset = () => {
        setFetching(true)
    }

    const searchProfile = (val: string) => {
        const filter = userProfiles.filter((item: UserProfile) => item.user.role == userprofiletype);
        if (val.length > 1) {
            const filA = filter.filter((item: UserProfile) => item.user?.first_name?.toLowerCase().includes(val.toLowerCase()));
            const filB = filter.filter((item: UserProfile) => item.user?.last_name?.toLowerCase().includes(val.toLowerCase()));
            setUserProfilesData(filA);
        } else {
            setUserProfilesData(filter);
        }
    }

    const handleChangePage = (e: unknown, newPage: number) => {
        setPage(newPage);
        if (newPage < page) { setUserProfilesData(userProfilesDataPrev); }
        if (newPage > page) { setUserProfilesData(userProfilesDataNext); }
        setCount(4);
    }

    const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    }

    return (

        <DashboardCard title={`${userprofiletype == "student" ? "Student" : "Lecturer"} List`} loading={false}>
            <Box sx={{ overflow: 'auto', width: { xs: '380px', sm: 'auto' } }}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <MyButtonLoader fetching={fetching} loadingText='Loading' info={userProfilesData.length} onClick={reset} />                        
                        {userprofiletype == "student" ? 
                            <Input placeholder='Search Student Name or Matricle ...' onChange={(e) => searchProfile(e.target.value)} style={{ width: 250, marginLeft: 12 }}/> 
                                : 
                            <Input placeholder='Search Lecturer Name ...' onChange={(e) => searchProfile(e.target.value)} style={{ width: 250, marginLeft: 12 }}/>
                        }

                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table
                                aria-label="simple table"
                                sx={{
                                    whiteSpace: "nowrap",
                                    mt: 0
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                    
                                        <TableCell>{userprofiletype == "student" ?
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Username / Matricle
                                            </Typography>
                                                : 
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Username
                                            </Typography>}
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
                                                {userprofiletype == "student" ? 
                                                    <Typography
                                                        sx={{
                                                            fontSize: "15px",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        {item.user.username} / {item.user?.matricle}
                                                    </Typography>
                                                    :
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        {item.user.username}                                           
                                                    </Typography>
                                                }
                                            </TableCell>

                                            <TableCell>
                                                {userprofiletype == "student" ? 
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        {item.user?.first_name} {item.user?.last_name}
                                                    </Typography>
                                                :
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        {item.user?.title}. {item.user?.first_name} {item.user?.last_name}                                            
                                                    </Typography>
                                                }
                                            </TableCell>

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
                                                            router.push(`/AdministrationPages/AccountSettings`) 
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
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[100]}
                            component="div"
                            count={countTotal}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Grid>
                </Grid>

                <DeleteItemFormModal 
                    showModal={deleteUserProfileFormModal}
                    setShowModal={setDeleteUserProfileFormModal}
                    record={record}
                    url={PageUserProfilesUrl}
                    record_name={record?.user.username ? record.user.username : ""}
                    reset={reset}
                />
            </Box>            
        </DashboardCard>
    );
};

export default TableProfiles;
