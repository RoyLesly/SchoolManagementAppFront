'use client';
import React, { FC, useEffect, useState } from 'react';
import MyTableCard from '@/Designs/Tables/MyTableCard'
import {
    Typography, 
    Table, TableBody, TableCell, TableHead, TableRow,
    Button, Stack,
} from '@mui/material';
import { LevelOptimizedType, LevelProps, MainSpecialtyOptimizedType, MainSpecialtyProps, SpecialtyOptimizedType, SpecialtyProps } from '@/Utils/types';
import { useGetAllLevels, useGetAllMainSpecialties, useGetAllSpecialties } from '@/Utils/customHooks';
import { getAllSpecialties } from '@/Utils/functions';
import AddSpecialtyFormModal from '@/Designs/Modals/AddSpecialtyFormModal';
import EditSpecialtyFormModal from '@/Designs/Modals/EditSpecialtyFormModal';
import DeleteItemFormModal from '@/Designs/Modals/DeleteItemFormModal';
import MyButtonReload from '@/Designs/MyButtonReload';
import MyButtonAdd from '@/Designs/MyButtonAdd';

const Specialties = () => {
    const [ fetching, setFetching ] = useState<boolean>(true)
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ record, setRecord ] = useState<SpecialtyOptimizedType>()
    const [ specialties, setSpecialty ] = useState<SpecialtyOptimizedType[]>([])
    const [ specialtyData, setSpecialtyData ] = useState<SpecialtyOptimizedType[]>([])
    const [ mainSpecialties, setMainSpecialties ] = useState<MainSpecialtyOptimizedType[]>([])
    const [ levels, setLevels ] = useState<LevelOptimizedType[]>([])
    const [ addSpecialtyFormModal, setAddSpecialtyFormModal ] = useState<boolean>(false)
    const [ editSpecialtyFormModal, setEditSpecialtyFormModal ] = useState<boolean>(false)
    const [ deleteSpecialtyFormModal, setDeleteSpecialtyFormModal ] = useState<boolean>(false)

    // useGetAllSpecialties(setSpecialty, setFetching);
    // useGetAllMainSpecialties(setMainSpecialties, setFetching);
    // useGetAllLevels(setLevels, setFetching);

    useEffect(() => {
        setSpecialtyData(specialties)
    }, [specialties])
    const reset = () => {
        getAllSpecialties(setSpecialty, setFetching)
    }
    const TableComp:FC = () => (
        <Table
            aria-label="simple table"
            sx={{
                whiteSpace: "nowrap",
                m: 0,
            }}
        >
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Specialty Name
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Academic year
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
                {specialtyData.map((item: SpecialtyOptimizedType) => (
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
                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                {item[2]}
                            </Typography>
                        </TableCell>
                        <TableCell align='center'>
                            <Stack spacing={1} direction="row">
                                <Button onClick={() => {setRecord(item); setEditSpecialtyFormModal(true)}} variant="contained" disableElevation color="primary">
                                    Edit
                                </Button>
                                <Button onClick={() => {setRecord(item); setDeleteSpecialtyFormModal(true)}} variant="contained" disableElevation color="primary"  target="_blank" href="">
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
        title={"Specialty Section"}
        buttonReset={<MyButtonReload fetching={fetching} reset={reset} />}
        buttonAdd={<MyButtonAdd setAddItem={setAddSpecialtyFormModal} />}
        table={<TableComp />}
        loading={loading}
    />

    <AddSpecialtyFormModal
        showModal={addSpecialtyFormModal}
        setShowModal={setAddSpecialtyFormModal}
        mainSpecialty={mainSpecialties}
        levels={levels}
        reset={reset}
    />

    <EditSpecialtyFormModal
        showModal={editSpecialtyFormModal} 
        setShowModal={setEditSpecialtyFormModal}
        record={record}
        mainSpecialty={mainSpecialties}
        reset={reset} 
        levels={levels} 
    />

    <DeleteItemFormModal
        showModal={deleteSpecialtyFormModal}
        setShowModal={setDeleteSpecialtyFormModal}
        record_name={record && record[1]}
        record={record}
        reset={reset}
        url={""}
    />

  </>)
}

export default Specialties