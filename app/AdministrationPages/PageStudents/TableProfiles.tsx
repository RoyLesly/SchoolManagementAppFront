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
    CircularProgress,
    styled,
    Paper,
} from '@mui/material';
import DashboardCard from '@/components/CompAdmin/shared/DashboardCard';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { UserProfileOptimizedType } from '@/Utils/types';
import DeleteItemFormModal from '@/Designs/Modals/DeleteItemFormModal';
import { PageUserProfilesUrl, UserControlOptimizedQueryUrl } from '@/Utils/Config';
import { useDispatch } from 'react-redux';
import { removeChoosenUser, removeChoosenUserProfile } from '@/Redux/Reducers/sliceChoosenUserAndProfile';
import { useRouter } from 'next/navigation';
import MyButtonLoader from '@/Designs/MyButtonLoader';
import { getOptimizedQuery } from '@/Utils/pagination';
import { addChoosenUserProfile } from '@/app/Redux/Reducers/sliceUserAndProfile';


interface UserProfilesProps {
    userprofiletype: string
}
const TableProfiles:FC<UserProfilesProps> = ({ userprofiletype }) => {
    const router = useRouter();
    const dispatch = useDispatch();    
    const [ count, setCount ] = useState<number>(0)
    const [ countTotal, setCountTotal ] = useState<number>(0)
    const [ nextLink, setNextLink ] = useState<boolean>(false)
    const [ prevLink, setPrevLink ] = useState<boolean>(false)
    const [ loading, setLoading ] = useState<boolean>(true)

    const [ page, setPage ] = useState<number>(0)
    const [ rowsPerPage, setRowsPerPage ] = useState<number>(100)
    const [ fetching, setFetching ] = useState<boolean>(true)
    const [ record, setRecord ] = useState<UserProfileOptimizedType | null>(null)
    const [ userProfiles, setUserProfiles ] = useState<UserProfileOptimizedType[]>([])
    const [ userProfilesSearch, setUserProfilesSearch ] = useState<UserProfileOptimizedType[]>([])
    const [ userProfilesData, setUserProfilesData ] = useState<UserProfileOptimizedType[]>([])
    const [ userProfilesDataPrev, setUserProfilesDataPrev ] = useState<UserProfileOptimizedType[]>([])
    const [ userProfilesDataNext, setUserProfilesDataNext ] = useState<UserProfileOptimizedType[]>([])
    const [ deleteUserProfileFormModal, setDeleteUserProfileFormModal ] = useState<boolean>(false)

    const [ searchText, setSearchText ] = useState<string>("")
    const [ dataFound, setDataFound ] = useState<boolean>(true)

    const [ userProfileFieldList, setUserProfileFieldList] = useState<string[]>([
        "id", "user__username", "user__matricle", "user__first_name", "user__last_name", "specialty__id", 
        "specialty__main_specialty__specialty_name", "user__title", "user__telephone", "user__email", "user__address",
        "user__is_active", "user__role", "specialty__academic_year", "specialty__level__level", "user__id"
    ])

    useEffect(() => {
        if (count == 0) {
            if (page == 0) { getOptimizedQuery(setUserProfiles, setFetching, setCountTotal, setNextLink, setPrevLink, UserControlOptimizedQueryUrl, { model: "UserProfile", searchField: "user__role", value: userprofiletype, fieldList: [...userProfileFieldList], page: 1}) }
            if (page != 0) { getOptimizedQuery(setUserProfiles, setFetching, setCountTotal, setNextLink, setPrevLink, UserControlOptimizedQueryUrl, { model: "UserProfile", searchField: "user__role", value: userprofiletype, fieldList: [...userProfileFieldList], page: page}) }
            setCount(count + 1)
        }
        if (count == 1) {
            dispatch(removeChoosenUser());
            dispatch(removeChoosenUserProfile());
            if (userProfiles.length > 0) { setUserProfilesData(userProfiles); setCount(count + 1); setLoading(false); }
        }
        if (count == 2) {
            if (page == 0){
                setUserProfilesDataPrev([])
                if (nextLink) { getOptimizedQuery(setUserProfilesDataNext, setFetching, setCountTotal, setNextLink, setPrevLink, UserControlOptimizedQueryUrl, { model: "UserProfile", searchField: "user__role", value: userprofiletype, page: 2, fieldList: [...userProfileFieldList]}) }
            }
            if (page > 0){
                getOptimizedQuery(setUserProfilesDataPrev, setFetching, setCountTotal, setNextLink, setPrevLink, UserControlOptimizedQueryUrl, { model: "UserProfile", searchField: "user__role", value: userprofiletype, page: page, fieldList: [...userProfileFieldList]} )
                if (nextLink) { getOptimizedQuery(setUserProfilesDataNext, setFetching, setCountTotal, setNextLink, setPrevLink, UserControlOptimizedQueryUrl, { model: "UserProfile", searchField: "user__role", value: userprofiletype, page: page + 2, fieldList: [...userProfileFieldList]}) }
                else { setUserProfilesDataNext([]) }
            }
            setCount(count + 1);
        }
        if (count == 4) {
            if (userProfilesSearch.length > 0) {
                setUserProfilesData(userProfilesSearch)
                setDataFound(true);
            } else { 
                setDataFound(false);
            }
            setLoading(false)
        }
    }, [userProfiles, userProfilesSearch, page, count, userprofiletype, nextLink, userProfileFieldList, dispatch])

    const reset = () => {
        setUserProfilesData([]);
        setUserProfilesDataPrev([]);
        setUserProfilesDataNext([]);
        setCount(0)
        setFetching(true)
    }

    const searchProfile = (val: string) => {
        if (val.length > 1) {
            setLoading(true)
            getOptimizedQuery(setUserProfilesSearch, setFetching, setCountTotal, setNextLink, setPrevLink, UserControlOptimizedQueryUrl, { model: "UserProfile", searchField: ["user__role", "user__username"], value: [userprofiletype, val], fieldList: [...userProfileFieldList], page: 1}) 
            setCount(4)
        } else {
            getOptimizedQuery(setUserProfilesData, setFetching, setCountTotal, setNextLink, setPrevLink, UserControlOptimizedQueryUrl, { model: "UserProfile", searchField: ["user__role"], value: userprofiletype, fieldList: [...userProfileFieldList], page: 1}) 
        }
    }

    const handleChangePage = (e: unknown, newPage: number) => {
        setPage(newPage);
        if (newPage < page) { setUserProfilesData(userProfilesDataPrev); }
        if (newPage > page) { setUserProfilesData(userProfilesDataNext); }
        setCount(2);
    }

    const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    }

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2, padding: theme.spacing(1), 
        textAlign: "center", color: theme.palette.text.secondary
    }))

    return (

        <DashboardCard title={`${userprofiletype == "student" ? "Student" : "Lecturer"} List`} loading={false}>
            <Box sx={{ overflow: 'auto', width: { xs: '380px', sm: 'auto' } }}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <MyButtonLoader fetching={fetching} loadingText='Loading' info={userProfilesData.length} onClick={reset} />                        
                        {userprofiletype == "student" ? 
                            <Input placeholder='Search Student Name or Matricle ...' onChange={(e) => setSearchText(e.target.value)} style={{ width: 250, marginLeft: 12 }}/> 
                                : 
                            <Input placeholder='Search Lecturer Name ...' onChange={(e) => setSearchText(e.target.value)} style={{ width: 250, marginLeft: 12 }}/>
                        }
                        { searchText.length > 2 && <MyButtonLoader fetching={loading} loadingText='Search' info="Search" onClick={() => searchProfile(searchText)} /> }                      

                    </Grid>
                    
                    {!loading ? 
                        dataFound ? <Grid item xs={12}>
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
                                        {userProfilesData.map((item: UserProfileOptimizedType) => (
                                            <TableRow key={item[0]}>

                                                <TableCell>
                                                    {userprofiletype == "student" ? 
                                                        <Typography
                                                            sx={{
                                                                fontSize: "15px",
                                                                fontWeight: "500",
                                                            }}
                                                        >
                                                            {item[1]} / {item[2]}
                                                        </Typography>
                                                        :
                                                        <Typography variant="subtitle2" fontWeight={600}>
                                                            {item[1]}                                           
                                                        </Typography>
                                                    }
                                                </TableCell>

                                                <TableCell>
                                                    {userprofiletype == "student" ? 
                                                        <Typography variant="subtitle2" fontWeight={600}>
                                                            {item[3]} {item[4]}
                                                        </Typography>
                                                    :
                                                        <Typography variant="subtitle2" fontWeight={600}>
                                                            {item[7]}. {item[2]} {item[3]}                                            
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
                                                        {item[5] ? `${item[6]} ${item[13]} L${item[14]}`: ""}
                                                    </Typography>
                                                </TableCell>}

                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        {item[8]}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        {item[9]}
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
                        </Grid> : <Grid>No Data Found</Grid>
                        : 
                        <Stack spacing={2} alignItems="center" direction="row" justifyContent="center">
                            <Item>
                                {/* <CircularProgress /> */}
                            </Item>
                        </Stack>
                    }
                </Grid>

                <DeleteItemFormModal 
                    showModal={deleteUserProfileFormModal}
                    setShowModal={setDeleteUserProfileFormModal}
                    record={record}
                    url={PageUserProfilesUrl}
                    record_name={record && record[1]}
                    reset={reset}
                />
            </Box>            
        </DashboardCard>
    );
};

export default TableProfiles;
