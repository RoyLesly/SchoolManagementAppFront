'use client';
import React, { FC, useEffect, useState } from 'react';
import MyTableCard from '@/Designs/MyTableCard'
import {
    Typography, Box, 
    Table, TableBody, TableCell, TableHead, TableRow,
    Button, Fab, Modal, Stack,
} from '@mui/material';
import { DomainProps } from '@/Utils/types';
import { useGetAllDomains } from '@/Utils/customHooks';
import { getAllDomains } from '@/Utils/functions';
import AddDomainFormModal from '@/Designs/Modals/AddDomainFormModal';
import EditDomainFormModal from '@/Designs/Modals/EditDomainFormModal';
import DeleteItemFormModal from '@/Designs/Modals/DeleteItemFormModal';
import MyButtonReload from '@/Designs/MyButtonReload';
import MyButtonAdd from '@/Designs/MyButtonAdd';
import { DomainCRUDUrl } from '@/Utils/Config';

const Domains = () => {
    const [ fetching, setFetching ] = useState<boolean>(false)
    const [ record, setRecord ] = useState<DomainProps | null>(null)
    const [ domain, setDomain ] = useState<DomainProps[]>([])
    const [ domainData, setDomainData ] = useState<DomainProps[]>([])
    const [ addDomainFormModal, setAddDomainFormModal ] = useState<boolean>(false)
    const [ editDomainFormModal, setEditDomainFormModal ] = useState<boolean>(false)
    const [ deleteDomainFormModal, setDeleteDomainFormModal ] = useState<boolean>(false)

    useGetAllDomains(setDomain, setFetching);
    useEffect(() => {
        setDomainData(domain)
    }, [domain])
    const reset = () => {
        setFetching(true)
        getAllDomains(setDomain, setFetching)
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
                            Domain Name
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
                {domainData.map((item: DomainProps) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: "500",
                                }}
                            >
                                {item.domain_name}
                            </Typography>
                        </TableCell>

                        <TableCell align='center'>
                            <Stack justifyItems="center" direction="row" spacing={1} justifyContent="center">
                                <Button onClick={() => {setRecord(item); setEditDomainFormModal(true)}} variant="contained" disableElevation color="primary">
                                    Edit
                                </Button>
    
                                <Button onClick={() => {setRecord(item); setDeleteDomainFormModal(true)}} variant="contained" disableElevation color="primary">
                                    Delete
                                </Button>
                            </Stack>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
  return (<>

    <MyTableCard
        title={"Domain Section"}
        buttonReset={<MyButtonReload fetching={fetching} reset={reset} />}
        buttonAdd={<MyButtonAdd setAddItem={setAddDomainFormModal} />}
        table={<TableComp />}
    />

    <AddDomainFormModal
        showModal={addDomainFormModal}
        setShowModal={setAddDomainFormModal}
        reset={reset}
    />

    <EditDomainFormModal 
        showModal={editDomainFormModal} 
        setShowModal={setEditDomainFormModal}
        record={record}
        reset={reset} 
    />

    <DeleteItemFormModal
        showModal={deleteDomainFormModal}
        setShowModal={setDeleteDomainFormModal}
        record_name={record?.domain_name}
        record={record}
        reset={reset}
        url={DomainCRUDUrl}
    />

  </>)
}

export default Domains