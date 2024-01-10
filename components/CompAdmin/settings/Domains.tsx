'use client';
import React, { FC, useEffect, useState } from 'react';
import MyTableCard from '@/Designs/Tables/MyTableCard'
import {
    Typography, 
    Table, TableBody, TableCell, TableHead, TableRow,
    Button, Stack,
} from '@mui/material';
import { DomainOptimizedType } from '@/Utils/types';
import AddDomainFormModal from '@/Designs/Modals/AddDomainFormModal';
import EditDomainFormModal from '@/Designs/Modals/EditDomainFormModal';
import DeleteItemFormModal from '@/Designs/Modals/DeleteItemFormModal';
import MyButtonAdd from '@/Designs/MyButtonAdd';
import { AppControlOptimizedQueryUrl, DomainCRUDUrl } from '@/Utils/Config';
import MyButtonLoader from '@/Designs/MyButtonLoader';
import { getOptimizedQuery } from '@/Utils/pagination';

const Domains = () => {
    const [ fetching, setFetching ] = useState<boolean>(true)
    const [ count, setCount ] = useState<number>(0)
    const [ countTotal, setCountTotal ] = useState<number>(0)
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ record, setRecord ] = useState<DomainOptimizedType>()
    const [ domain, setDomain ] = useState<DomainOptimizedType[]>([])
    const [ domainData, setDomainData ] = useState<DomainOptimizedType[]>([])
    const [ addDomainFormModal, setAddDomainFormModal ] = useState<boolean>(false)
    const [ editDomainFormModal, setEditDomainFormModal ] = useState<boolean>(false)
    const [ deleteDomainFormModal, setDeleteDomainFormModal ] = useState<boolean>(false)

    useEffect(() => {
        if (count == 0) {            
            getOptimizedQuery(setDomain, setFetching, setCountTotal, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, { model: "Domain", fieldList: ["id", "domain_name"]}) 
            setCount(count + 1);
        }
        if (count == 1) {
            if (countTotal > 0) { setDomainData(domain); setCount(count + 1); }
            setLoading(false)
        }
    }, [domain, count, countTotal])

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
                            ID
                        </Typography>
                    </TableCell>
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
                {domainData?.map((item: DomainOptimizedType) => (
                    <TableRow key={item[0]}>
                        <TableCell>
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: "600",
                                }}
                            >
                                {item[0]}
                            </Typography>
                        </TableCell>
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
        buttonReset={<MyButtonLoader fetching={fetching} loadingText='Loading' info={countTotal} onClick={reset} />  }
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
        record_name={record ? record[1] : null}
        record={record}
        reset={reset}
        url={DomainCRUDUrl}
    />

  </>)
}

export default Domains