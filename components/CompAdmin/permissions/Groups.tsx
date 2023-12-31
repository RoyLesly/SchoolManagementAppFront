'use client';
import React, { FC, useEffect, useState } from 'react';
import MyTableCard from '@/Designs/Tables/MyTableCard'
import {
    Typography, 
    Table, TableBody, TableCell, TableHead, TableRow,
    Button, Stack, Box,
} from '@mui/material';
import { PermissionsProps, PermGroupsProps } from '@/Utils/types';
import { useGetPermGroups } from '@/Utils/customHooks';
import { getPermGroups } from '@/Utils/functions';
import DeleteItemFormModal from '@/Designs/Modals/DeleteItemFormModal';
import MyButtonReload from '@/Designs/MyButtonReload';
import MyButtonAdd from '@/Designs/MyButtonAdd';
import AddGroupFormModal from '@/Designs/Modals/AddGroupFormModal';
import EditGroupFormModal from '@/Designs/Modals/EditGroupFormModal';

const Groups = () => {
    const [ fetching, setFetching ] = useState<boolean>(true)
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ record, setRecord ] = useState<PermGroupsProps | null>(null)
    const [ items, setItems ] = useState<PermGroupsProps[]>([])
    const [ itemsData, setItemsData ] = useState<PermGroupsProps[]>([])
    const [ addItemFormModal, setAddItemFormModal ] = useState<boolean>(false)
    const [ editItemFormModal, setEditItemFormModal ] = useState<boolean>(false)
    const [ deleteItemFormModal, setDeleteItemFormModal ] = useState<boolean>(false)

    useGetPermGroups(setItems, setFetching);
    useEffect(() => {
        setItemsData(items)
    }, [items])
    const reset = () => {
        getPermGroups(setItems, setFetching)
    }
    const TableComp:FC = () => (
        <Table
            aria-label="simple table"
            sx={{
                whiteSpace: "nowrap",
                mt: 0,
            }}
        >
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Group Name
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography variant="subtitle2" fontWeight={600}>
                            Permissions
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography variant="subtitle2" fontWeight={600}>
                            Actions
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {itemsData.map((i: PermGroupsProps) => (
                    <TableRow key={i.id}>
                        <TableCell>
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: "500",
                                }}
                            >
                                {i.name}
                            </Typography>
                        </TableCell>


                        <TableCell align="center">
                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                <Stack justifyContent="center" direction="row">{i.permissions.map((it: PermissionsProps) => <Box key={it.id}>{it.codename}, </Box>)}</Stack>
                            </Typography>
                        </TableCell>
                        <TableCell align='center'>
                            <Stack spacing={1} direction="row" justifyContent="center">
                                <Button onClick={() => {setRecord(i); setEditItemFormModal(true)}} variant="contained" disableElevation color="primary">
                                    Edit
                                </Button>
                                <Button onClick={() => {setRecord(i); setDeleteItemFormModal(true)}} variant="contained" disableElevation color="primary"  target="_blank" href="">
                                    Delete
                                </Button>
                            </Stack>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )

    console.log(itemsData)
  return (<>

    <MyTableCard
        title={"Groups Section"}
        buttonReset={<MyButtonReload fetching={fetching} reset={reset} />}
        buttonAdd={<MyButtonAdd setAddItem={setAddItemFormModal} />}
        table={<TableComp />}
        loading={loading}
    />

    <AddGroupFormModal
        showModal={addItemFormModal}
        setShowModal={setAddItemFormModal}
        reset={reset}
    />

    <EditGroupFormModal
        showModal={editItemFormModal} 
        setShowModal={setEditItemFormModal}
        record={record}
        reset={reset} 
    />

    <DeleteItemFormModal
        showModal={deleteItemFormModal}
        setShowModal={setDeleteItemFormModal}
        record_name={record?.name}
        record={record}
        reset={reset}
        url={""}
    />

  </>)
}

export default Groups