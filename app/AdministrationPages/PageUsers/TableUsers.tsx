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
    TextField,
    TablePagination,
} from '@mui/material';
import DashboardCard from '@/components/CompAdmin/shared/DashboardCard';
import { ChangeEvent, useEffect, useState } from 'react';
import { UserProfile, UserType } from '@/Utils/types';
import { useGetAllUserProfiles, useGetAllUsers } from '@/Utils/customHooks';
import { getAllUsers } from '@/Utils/functions';
import AddUserFormModal from '@/Designs/Modals/AddUserFormModal';
import EditUserFormModal from '@/Designs/Modals/EditUserFormModal';
import DeleteItemFormModal from '@/Designs/Modals/DeleteItemFormModal';
import { UserCRUDUrl } from '@/Utils/Config';
import MyButtonAdd from '@/Designs/MyButtonAdd';
import { green, red } from '@mui/material/colors';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addChoosenUserProfile, removeChoosenUser } from '@/Redux/Reducers/sliceChoosenUserAndProfile';
import MyButtonLoader from '@/Designs/MyButtonLoader';


const TableUsers = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [ page, setPage ] = useState<number>(0)
    const [ rowsPerPage, setRowsPerPage ] = useState<number>(10)
    const [ fetching, setFetching ] = useState<boolean>(true);
    const [ record, setRecord ] = useState<UserType>();
    const [ userProfiles, setUserProfiles ] = useState<UserProfile[]>([]);
    const [ users, setUsers ] = useState<UserType[]>([]);
    const [ usersData, setUsersData ] = useState<UserType[]>([]);
    const [ addUserFormModal, setAddUserFormModal ] = useState<boolean>(false);
    const [ editUserFormModal, setEditUserFormModal ] = useState<boolean>(false);
    const [ deleteUserFormModal, setDeleteUserFormModal ] = useState<boolean>(false);
    dispatch(removeChoosenUser())

    useGetAllUsers(setUsers, setFetching)
    useGetAllUserProfiles(setUserProfiles, setFetching)

    useEffect(() => {
        setUsersData(users)
    }, [users])

    const reset = () => {
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
        const filA = users.filter((item: UserType) => item.username?.toLowerCase().includes(val.toLowerCase()))
        const filB = users.filter((item: UserType) => item.first_name?.toLowerCase().includes(val.toLowerCase()))
        setUsersData([...new Set([...filA, ...filB])])
    }
  
    const handleChangePage = (e: unknown, newPage: number) => {
        setPage(newPage);
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
                                {usersData.map((item: UserType) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {item.username}
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {item.first_name} {item.last_name}
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                {item.role}
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                <Fab
                                                    aria-label="save"
                                                    color="primary"
                                                    sx={buttonSx(item.password ? true : false)}
                                                    onClick={() => reset()}
                                                >
                                                {item.password ? "OK" : <>-</>}
                                                </Fab>
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            {item.email_confirmed ? 
                                            <Typography sx={{ backgroundColor: "lightgreen", border: 1, textAlign: "center", alignItems: "center", borderRadius: 2 }}  variant="subtitle2" fontWeight={400}>
                                                {item.email}
                                            </Typography> 
                                            : 
                                            <Typography sx={{ backgroundColor: "lightpink", border: 1, textAlign: "center", alignItems: "center", borderRadius: 2 }}  variant="subtitle2" fontWeight={400}>
                                                {item.email}
                                            </Typography>}
                                        </TableCell>

                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                {item.last_login.includes("undefined") ? "-" : item.last_login}
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                {item?.is_active ? <Typography sx={{ backgroundColor: "lightgreen", border: 1, textAlign: "center", alignItems: "center", borderRadius: 2 }}  variant="subtitle2" fontWeight={400}>
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
                                                        console.log(item.id);
                                                        console.log(userProfiles.filter((item: UserProfile) => item.user.id == item.id )[0]);
                                                        dispatch(addChoosenUserProfile( userProfiles.filter((up: UserProfile) => up.user.id == item.id )[0]) ); 
                                                        router.push(`/AdministrationPages/AccountSettings`) 
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
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50]}
                            component="div"
                            count={usersData.length}
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
                            record_name={record?.username ? record.username : ""}
                            reset={reset}
                        />
                        
                    </Grid>
                </Grid>
            </Box>
        </DashboardCard>
    );
};

export default TableUsers;
