'use client';
import {
    Typography, Box, Grid, Table, TextField,
    TableBody, TableCell, TableHead, TableRow, Button, Stack, Fab, TablePagination, TableContainer,
} from '@mui/material';
import DashboardCard from '@/components/CompAdmin/shared/DashboardCard';
import { ChangeEvent, useEffect, useState } from 'react';
import { CustomUserOptimizedType, UserProfileOptimizedType, UserType } from '@/Utils/types';
import { getAllUsers } from '@/Utils/functions';
import AddUserFormModal from '@/Designs/Modals/AddUserFormModal';
import EditUserFormModal from '@/Designs/Modals/EditUserFormModal';
import DeleteItemFormModal from '@/Designs/Modals/DeleteItemFormModal';
import { UserCRUDUrl, UserControlOptimizedQueryUrl } from '@/Utils/Config';
import MyButtonAdd from '@/Designs/MyButtonAdd';
import { green, red } from '@mui/material/colors';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addChoosenUserProfile, removeChoosenUser } from '@/Redux/Reducers/sliceChoosenUserAndProfile';
import MyButtonLoader from '@/Designs/MyButtonLoader';
import { getData, getOptimizedQuery } from '@/Utils/pagination';
import { CustomUserFieldList, UserProfileFieldList } from '@/Utils/constants';


const TableUsers = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [ page, setPage ] = useState<number>(0)
    const [ count, setCount ] = useState<number>(0)
    const [ countTotal, setCountTotal ] = useState<number>(0)
    const [ nextLink, setNextLink ] = useState<boolean>(false)
    const [ prevLink, setPrevLink ] = useState<boolean>(false)
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ rowsPerPage, setRowsPerPage ] = useState<number>(100)
    const [ fetching, setFetching ] = useState<boolean>(true);
    const [ record, setRecord ] = useState<CustomUserOptimizedType>();
    const [ selectedUser, setSelectedUser ] = useState<CustomUserOptimizedType>();
    const [ userProfiles, setUserProfiles ] = useState<UserProfileOptimizedType[]>();
    const [ users, setUsers ] = useState<CustomUserOptimizedType[]>([]);
    const [ usersData, setUsersData ] = useState<CustomUserOptimizedType[]>([]);
    const [ usersDataPrev, setUsersDataPrev ] = useState<CustomUserOptimizedType[]>([])
    const [ usersDataNext, setUsersDataNext ] = useState<CustomUserOptimizedType[]>([])
    const [ addUserFormModal, setAddUserFormModal ] = useState<boolean>(false);
    const [ editUserFormModal, setEditUserFormModal ] = useState<boolean>(false);
    const [ deleteUserFormModal, setDeleteUserFormModal ] = useState<boolean>(false);

    const [ customUserFieldList, setCustomUserFielList] = useState<string[]>(CustomUserFieldList)
    const [ userProfileFieldList, setUserProfileFieldList] = useState<string[]>(UserProfileFieldList)

    useEffect(() => {
        if (count == 0) {
            // if (page == 0) { getOptimizedQuery(setUserProfiles, ()=>{}, ()=>{}, ()=>{}, ()=>{}, UserControlOptimizedQueryUrl, { model: "UserProfile", fieldList: [...userProfileFieldList], page: 1}) }
            if (page == 0) { getOptimizedQuery(setUsers, setFetching, setCountTotal, setNextLink, setPrevLink, UserControlOptimizedQueryUrl, { model: "CustomUser", fieldList: [...customUserFieldList], page: 1}) }
            if (page != 0) { getOptimizedQuery(setUsers, setFetching, setCountTotal, setNextLink, setPrevLink, UserControlOptimizedQueryUrl, { model: "CustomUser", fieldList: [...customUserFieldList], page: page}) }
            setCount(count + 1)
        }

        if (count == 1) {
            if (users.length > 0) {
                setUsersData(users)
                setCount(count + 1)
            }
        }

        if (count == 2) {
            if (page == 0){
                setUsersDataPrev([])
                if (nextLink) { getOptimizedQuery(setUsersDataNext, setFetching, setCountTotal, setNextLink, setPrevLink, UserControlOptimizedQueryUrl, { model: "CustomUser", page: 2, fieldList: [...customUserFieldList]}) }
            }
            if (page > 0){
                getOptimizedQuery(setUsersDataPrev, setFetching, setCountTotal, setNextLink, setPrevLink, UserControlOptimizedQueryUrl, { model: "CustomUser", page: page, fieldList: [...customUserFieldList]} )
                if (nextLink) { getOptimizedQuery(setUsersDataNext, setFetching, setCountTotal, setNextLink, setPrevLink, UserControlOptimizedQueryUrl, { model: "CustomUser", page: page + 2, fieldList: [...customUserFieldList]}) }
                else { setUsersDataNext([]) }
            }
            setCount(count + 1)
        }

        if (count == 4) {
            getOptimizedQuery(setUserProfiles, setFetching, setCountTotal, setNextLink, setPrevLink, UserControlOptimizedQueryUrl, { 
                model: "UserProfile", 
                searchField: "user__id", 
                value: selectedUser && selectedUser[0], 
                fieldList: [...userProfileFieldList]
            })
            if (userProfiles) {
                dispatch(addChoosenUserProfile(userProfiles[0]));
                router.push(`/AdministrationPages/AccountSettings`);
                setCount(count + 1)
            }
        }
    }, [users, selectedUser, userProfiles, usersData, nextLink, prevLink, count, page, userProfileFieldList, customUserFieldList, dispatch, router])

    const reset = () => {
        setCount(0)
        setUsersData([]);
        setUsersDataPrev([]);
        setUsersDataNext([]);
        setFetching(true)
        getAllUsers(setUsers, setFetching)
    }

    const buttonSx = (val: boolean) => { return {
        ...(val ? {
            bgcolor: green[500], '&:hover': {
                bgcolor: green[800],
            },
        } : {
            bgcolor: red[500], '&:hover': {
                bgcolor: red[800],
            },
        })
        ,
        
    }};

    const Search = (val: any) => {
        const filA = users.filter((item: CustomUserOptimizedType) => item[1]?.toLowerCase().includes(val.toLowerCase()))
        const filB = users.filter((item: CustomUserOptimizedType) => item[3]?.toLowerCase().includes(val.toLowerCase()))
        const filC = users.filter((item: CustomUserOptimizedType) => item[4]?.toLowerCase().includes(val.toLowerCase()))
        const filD = users.filter((item: CustomUserOptimizedType) => item[6]?.toString().includes(val.toString()))
        setUsersData([...new Set([...filA, ...filB, ...filC, ...filD])])
    }
  
    const handleChangePage = (e: unknown, newPage: number) => {
        setPage(newPage);
        setCount(2);
        if (newPage < page) { setUsersData(usersDataPrev); }
        if (newPage > page) { setUsersData(usersDataNext); }  
    }

    const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    }

    return (
        <DashboardCard title={`Users List`} loading={false}>
            <Box sx={{ overflow: 'auto', width: { xs: '380px', sm: 'auto' } }}>
                <Grid container spacing={0}>
                    <Stack direction="row" spacing={2} sx={{alignItems: "center",alignContent: "center"}}>
                        <MyButtonAdd setAddItem={setAddUserFormModal} />
                        <MyButtonLoader fetching={fetching} loadingText='Loading' info={usersData.length} onClick={reset} />
                        <Box>
                            <TextField label="Search" onChange={(e) => {Search(e.target.value)}} placeholder={`Search Users ...`} sx={{width: 260}} />
                        </Box>
                    </Stack>

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
                                    
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Username
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Full Name
                                            </Typography>
                                        </TableCell>
                    
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Role
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Password
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Email
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Last Login
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Status
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
                                    {usersData.map((item: CustomUserOptimizedType) => (
                                        <TableRow key={item[0]}>
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {item[1]}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {item[3]} {item[4]}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {item[10]}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    <Fab
                                                        aria-label="save"
                                                        color="primary"
                                                        sx={buttonSx(item[12] ? true : false)}
                                                        onClick={() => reset()}
                                                    >
                                                    {item[12] ? "OK" : <>-</>}
                                                    </Fab>
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                {item[13] ? 
                                                <Typography sx={{ backgroundColor: "lightgreen", border: 1, textAlign: "center", alignItems: "center", borderRadius: 2 }}  variant="subtitle2" fontWeight={400}>
                                                    {item[7]}
                                                </Typography> 
                                                : 
                                                <Typography sx={{ backgroundColor: "lightpink", border: 1, textAlign: "center", alignItems: "center", borderRadius: 2 }}  variant="subtitle2" fontWeight={400}>
                                                    {item[7]}
                                                </Typography>}
                                            </TableCell>

                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {/* {item[11].includes("undefined") ? "-" : item[11]} */}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {item[9] ? <Typography sx={{ backgroundColor: "lightgreen", border: 1, textAlign: "center", alignItems: "center", borderRadius: 2 }}  variant="subtitle2" fontWeight={400}>
                                                            Active
                                                        </Typography>  : 
                                                        <Typography sx={{ backgroundColor: "lightpink", border: 1, textAlign: "center", alignItems: "center", borderRadius: 2 }}  variant="subtitle2" fontWeight={400}>
                                                            Inactive
                                                        </Typography>
                                                    }
                                                </Typography>
                                            </TableCell>

                                            <TableCell align='left'>
                                                <Stack justifyItems="center" direction="row" spacing={1} justifyContent="center">
                                                    <Button onClick={() => {setRecord(item); setEditUserFormModal(true)}} variant="contained" disableElevation color="primary">
                                                        Edit
                                                    </Button>
                                                    <Button 
                                                        onClick={ () => { 
                                                            setSelectedUser(item);
                                                            setCount(4);
                                                        }} 
                                                        variant="contained" disableElevation color="primary">
                                                        View
                                                    </Button>
                                                    <Button onClick={() => {setRecord(item); setDeleteUserFormModal(true)}} variant="contained" disableElevation color="primary">
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

                    <Grid item xs={12}>
                        <AddUserFormModal 
                            showModal={addUserFormModal}
                            setShowModal={setAddUserFormModal}
                            resetItems={reset}
                        />

                        <EditUserFormModal 
                            showModal={editUserFormModal}
                            setShowModal={setEditUserFormModal}
                            record={record}
                            reset={reset}
                            setRecord={setRecord}
                        />

                        <DeleteItemFormModal 
                            showModal={deleteUserFormModal}
                            setShowModal={setDeleteUserFormModal}
                            record={record}
                            url={UserCRUDUrl}
                            record_name={record && record[1]}
                            reset={reset}
                        />
                        
                    </Grid>
                </Grid>
            </Box>
        </DashboardCard>
    );
};

export default TableUsers;
