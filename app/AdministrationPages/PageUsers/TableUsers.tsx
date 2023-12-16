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
} from '@mui/material';
import DashboardCard from '@/components/CompAdmin/shared/DashboardCard';
import { useEffect, useState } from 'react';
import { UserProfile, UserType } from '@/Utils/types';
import { useGetAllUsers } from '@/Utils/customHooks';
import { getAllUsers } from '@/Utils/functions';
import AddUserFormModal from '@/Designs/Modals/AddUserFormModal';
import EditUserFormModal from '@/Designs/Modals/EditUserFormModal';
import DeleteItemFormModal from '@/Designs/Modals/DeleteItemFormModal';
import { UserCRUDUrl } from '@/Utils/Config';
import MyButtonAdd from '@/Designs/MyButtonAdd';
import { green, red } from '@mui/material/colors';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addChoosenUser, removeChoosenUser } from '@/Redux/Reducers/sliceChoosenUserAndProfile';


const TableUsers = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [ fetching, setFetching ] = useState<boolean>(false);
    const [ record, setRecord ] = useState<UserType>();
    const [ users, setUsers ] = useState<UserType[]>([]);
    const [ usersData, setUsersData ] = useState<UserType[]>([]);
    const [ addUserFormModal, setAddUserFormModal ] = useState<boolean>(false);
    const [ editUserFormModal, setEditUserFormModal ] = useState<boolean>(false);
    const [ deleteUserFormModal, setDeleteUserFormModal ] = useState<boolean>(false);
    dispatch(removeChoosenUser)

    useGetAllUsers(setUsers, setFetching)

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

    return (
        <DashboardCard title={`Users List`}>
            <Box sx={{ overflow: 'auto', width: { xs: '380px', sm: 'auto' } }}>
                <Grid container spacing={0}>
                        <Stack direction="row" spacing={2} sx={{alignItems: "center",alignContent: "center"}}>
                            <MyButtonAdd setAddItem={setAddUserFormModal} />
                            <Fab
                                aria-label="save"
                                color="primary"
                                sx={buttonSx(true)}
                                onClick={() => reset()}
                            >
                            {fetching ? "Loading" : <>{usersData.length}</>}
                            </Fab>
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
                                            Username / Matricle
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
                                                {item.username} / {item?.matricle}
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
                                                        dispatch(addChoosenUser(item)); 
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