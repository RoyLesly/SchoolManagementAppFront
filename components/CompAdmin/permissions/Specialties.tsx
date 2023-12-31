'use client';
import React, { FC, useEffect, useState } from 'react';
import MyTableCard from '@/Designs/Tables/MyTableCard'
import {
    Typography, 
    Table, TableBody, TableCell, TableHead, TableRow,
    Button, Stack,
} from '@mui/material';
import { LevelProps, MainSpecialtyProps, SpecialtyProps } from '@/Utils/types';
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
    const [ record, setRecord ] = useState<SpecialtyProps | null>(null)
    const [ specialties, setSpecialty ] = useState<SpecialtyProps[]>([])
    const [ specialtyData, setSpecialtyData ] = useState<SpecialtyProps[]>([])
    const [ mainSpecialties, setMainSpecialties ] = useState<MainSpecialtyProps[]>([])
    const [ levels, setLevels ] = useState<LevelProps[]>([])
    const [ addSpecialtyFormModal, setAddSpecialtyFormModal ] = useState<boolean>(false)
    const [ editSpecialtyFormModal, setEditSpecialtyFormModal ] = useState<boolean>(false)
    const [ deleteSpecialtyFormModal, setDeleteSpecialtyFormModal ] = useState<boolean>(false)

    useGetAllSpecialties(setSpecialty, setFetching);
    useGetAllMainSpecialties(setMainSpecialties, setFetching);
    useGetAllLevels(setLevels, setFetching);

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
                {specialtyData.map((item: SpecialtyProps) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: "500",
                                }}
                            >
                                {item.main_specialty?.specialty_name}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                {item.academic_year}
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
    />

    <DeleteItemFormModal
        showModal={deleteSpecialtyFormModal}
        setShowModal={setDeleteSpecialtyFormModal}
        record_name={record?.main_specialty?.specialty_name}
        record={record}
        reset={reset}
        url={""}
    />

  </>)
}

export default Specialties