'use client';
import React, { FC, useEffect, useState } from 'react';
import MyTableCard from '@/Designs/Tables/MyTableCard'
import {
    Typography, 
    Table, TableBody, TableCell, TableHead, TableRow,
    Button, Stack,
} from '@mui/material';
import { DomainProps } from '@/Utils/types';
import { useGetAllDomains } from '@/Utils/customHooks';
import { getAllDomains } from '@/Utils/functions';
import AddDomainFormModal from '@/Designs/Modals/AddDomainFormModal';
import EditDomainFormModal from '@/Designs/Modals/EditDomainFormModal';
import DeleteItemFormModal from '@/Designs/Modals/DeleteItemFormModal';
import MyButtonAdd from '@/Designs/MyButtonAdd';
import { DomainCRUDUrl } from '@/Utils/Config';
import MyButtonLoader from '@/Designs/MyButtonLoader';
import { getDataDropdown } from '@/Utils/pagination';

const Domains = () => {
    const [ fetching, setFetching ] = useState<boolean>(true)
    const [ count, setCount ] = useState<number>(0)
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ record, setRecord ] = useState<DomainProps | null>(null)
    const [ domain, setDomain ] = useState<DomainProps[]>([])
    const [ domainData, setDomainData ] = useState<DomainProps[]>([])
    const [ addDomainFormModal, setAddDomainFormModal ] = useState<boolean>(false)
    const [ editDomainFormModal, setEditDomainFormModal ] = useState<boolean>(false)
    const [ deleteDomainFormModal, setDeleteDomainFormModal ] = useState<boolean>(false)

    useEffect(() => {
        if (count == 0) {
            getAllDomains(setDomain, setFetching);
            setCount(count + 1);
        }
        if (count == 1) {
            if (domain.length > 0) { setDomainData(domain); setCount(count + 1); }
            setLoading(false)
            
        }
    }, [domain, count])
    const reset = () => {
        setCount(0)
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
        buttonReset={<MyButtonLoader fetching={fetching} loadingText='Loading' info={domainData.length} onClick={reset} />  }
        buttonAdd={<MyButtonAdd setAddItem={setAddDomainFormModal} />}
        table={<TableComp />}
        loading={loading}
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