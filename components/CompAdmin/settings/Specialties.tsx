'use client';
import React, { FC, useEffect, useState } from 'react';
import MyTableCard from '@/Designs/MyTableCard'
import {
    Typography, 
    Table, TableBody, TableCell, TableHead, TableRow,
    Button, Stack,
} from '@mui/material';
import { DomainProps, LevelProps, MainSpecialtyProps, SpecialtyProps } from '@/Utils/types';
import { useGetAllDomains, useGetAllLevels, useGetAllMainSpecialties, useGetAllSpecialties } from '@/Utils/customHooks';
import { getAllDomains, getAllMainSpecialties, getAllSpecialties } from '@/Utils/functions';
import AddSpecialtyFormModal from '@/Designs/Modals/AddSpecialtyFormModal';
import EditSpecialtyFormModal from '@/Designs/Modals/EditSpecialtyFormModal';
import DeleteItemFormModal from '@/Designs/Modals/DeleteItemFormModal';
import MyButtonReload from '@/Designs/MyButtonReload';
import MyButtonAdd from '@/Designs/MyButtonAdd';
import { MainSpecialtyCRUDUrl, SpecialtyCRUDUrl } from '@/Utils/Config';
import EditMainSpecialtyFormModal from '@/Designs/Modals/EditMainSpecialtyFormModal';
import AddMainSpecialtyFormModal from '@/Designs/Modals/AddMainSpecialtyFormModal';

const Specialties = () => {
    const [ fetching, setFetching ] = useState<boolean>(false)
    const [ showSpecialty, setShowSpecialty ] = useState<boolean>(false)
    const [ record, setRecord ] = useState<SpecialtyProps | null>(null)
    const [ specialties, setSpecialties ] = useState<SpecialtyProps[]>([])
    const [ specialtyData, setSpecialtyData ] = useState<SpecialtyProps[]>([])
    const [ mainSpecialties, setMainSpecialties ] = useState<MainSpecialtyProps[]>([])
    const [ levels, setLevels ] = useState<LevelProps[]>([])
    const [ addSpecialtyFormModal, setAddSpecialtyFormModal ] = useState<boolean>(false)
    const [ editSpecialtyFormModal, setEditSpecialtyFormModal ] = useState<boolean>(false)
    const [ deleteSpecialtyFormModal, setDeleteSpecialtyFormModal ] = useState<boolean>(false)
    const [ deleteMainSpecialtyFormModal, setDeleteMainSpecialtyFormModal ] = useState<boolean>(false)

    const [ domains, setDomains ] = useState<DomainProps[]>([])
    const [ recordMain, setRecordMain ] = useState<MainSpecialtyProps | null>(null)
    const [ specialtyMainData, setSpecialtyMainData ] = useState<MainSpecialtyProps[]>([])
    const [ addSpecialtyMainFormModal, setAddSpecialtyMainFormModal ] = useState<boolean>(false)
    const [ editSpecialtyMainFormModal, setEditSpecialtyMainFormModal ] = useState<boolean>(false)
    const [ deleteSpecialtyMainFormModal, setDeleteSpecialtyMainFormModal ] = useState<boolean>(false)


    useGetAllSpecialties(setSpecialties, setFetching);
    useGetAllMainSpecialties(setMainSpecialties, setFetching);
    useGetAllDomains(setDomains, setFetching);
    useGetAllLevels(setLevels, setFetching);

    useEffect(() => {
        setSpecialtyData(specialties)
    }, [specialties])

    useEffect(() => {
        setSpecialtyMainData(mainSpecialties)
    }, [mainSpecialties])

    const reset = () => {
        setFetching(true)
        getAllSpecialties(setSpecialties, setFetching)
        getAllMainSpecialties(setMainSpecialties, setFetching)
        getAllDomains(setDomains, setFetching)
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
                            Specialty Level
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Year
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
                                {item.main_specialty?.specialty_name} {item.level?.level}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                {item.academic_year}
                            </Typography>
                        </TableCell>
                        <TableCell align='center'>
                            <Stack justifyItems="center" direction="row" spacing={1} justifyContent="center">
                                <Button onClick={() => {setRecord(item); setEditSpecialtyFormModal(true)}} variant="contained" disableElevation color="primary">
                                    Edit
                                </Button>
    
                                <Button onClick={() => {setRecord(item); setDeleteSpecialtyFormModal(true)}} variant="contained" disableElevation color="primary">
                                    Delete
                                </Button>
                            </Stack>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )

    const TableCompMainSpecialties:FC = () => (
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
                            Domain
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
                {specialtyMainData.map((item: MainSpecialtyProps) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: "500",
                                }}
                            >
                                {item?.specialty_name}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                {item.domain?.domain_name}
                            </Typography>
                        </TableCell>
                        <TableCell align='left'>
                            <Stack justifyItems="center" direction="row" spacing={1} justifyContent="center">
                                <Button onClick={() => {setRecordMain(item); setEditSpecialtyMainFormModal(true)}} variant="contained" disableElevation color="primary">
                                    Edit
                                </Button>
    
                                <Button onClick={() => {setRecordMain(item); setDeleteMainSpecialtyFormModal(true)}} variant="contained" disableElevation color="primary">
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

    { showSpecialty ? 
    <MyTableCard
        title={"Specialty Section"}
        buttonReset={<MyButtonReload fetching={fetching} reset={reset} />}
        buttonAdd={<MyButtonAdd setAddItem={setAddSpecialtyMainFormModal} />}
        extra={<Button onClick={() => {setShowSpecialty(false)}} variant='outlined' sx={{ marginLeft: 4 }}>Show All Classes</Button>}
        table={<TableCompMainSpecialties />}
    />
        :

    <MyTableCard
        title={"Class Section"}
        buttonReset={<MyButtonReload fetching={fetching} reset={reset} />}
        buttonAdd={<MyButtonAdd setAddItem={setAddSpecialtyFormModal} />}
        extra={<Button onClick={() => {setShowSpecialty(true)}} variant='outlined' sx={{ marginLeft: 4 }}>Show All Specialties</Button>}
        table={<TableComp />}
    />}

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

    <AddMainSpecialtyFormModal
        showModal={addSpecialtyMainFormModal}
        setShowModal={setAddSpecialtyMainFormModal}
        domains={domains}
        reset={reset}
    />

    <EditMainSpecialtyFormModal
        showModal={editSpecialtyMainFormModal} 
        setShowModal={setEditSpecialtyMainFormModal}
        record={recordMain}
        domains={domains}
        reset={reset} 
    />

    <DeleteItemFormModal
        showModal={deleteSpecialtyFormModal}
        setShowModal={setDeleteSpecialtyFormModal}
        record_name={record?.main_specialty?.specialty_name}
        record={record}
        reset={reset}
        url={SpecialtyCRUDUrl}
    />

    <DeleteItemFormModal
        showModal={deleteMainSpecialtyFormModal}
        setShowModal={setDeleteMainSpecialtyFormModal}
        record_name={recordMain?.specialty_name}
        record={recordMain}
        reset={reset}
        url={MainSpecialtyCRUDUrl}
    />

  </>)
}

export default Specialties