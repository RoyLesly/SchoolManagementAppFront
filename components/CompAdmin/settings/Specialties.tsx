'use client';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import MyTableCard from '@/Designs/Tables/MyTableCard'
import {
    Typography, 
    Table, TableBody, TableCell, TableHead, TableRow,
    Button, Stack, LinearProgress, TableContainer, TablePagination,
} from '@mui/material';
import { DomainProps, LevelProps, MainSpecialtyProps, SpecialtyProps } from '@/Utils/types';
import { getAllDomains, getAllLevels, getAllSpecialties } from '@/Utils/functions';
import { pageGetAllMainSpecialties } from '@/Utils/pagination';
import AddSpecialtyFormModal from '@/Designs/Modals/AddSpecialtyFormModal';
import EditSpecialtyFormModal from '@/Designs/Modals/EditSpecialtyFormModal';
import DeleteItemFormModal from '@/Designs/Modals/DeleteItemFormModal';
import MyButtonAdd from '@/Designs/MyButtonAdd';
import { MainSpecialtyCRUDUrl, PageMainSpecialtyCRUDUrl, PageSpecialtyCRUDUrl, SpecialtyCRUDUrl } from '@/Utils/Config';
import EditMainSpecialtyFormModal from '@/Designs/Modals/EditMainSpecialtyFormModal';
import AddMainSpecialtyFormModal from '@/Designs/Modals/AddMainSpecialtyFormModal';
import MyButtonLoader from '@/Designs/MyButtonLoader';
import { getData, pageGetAllSpecialties } from '@/Utils/pagination';

const Specialties = () => {
    const [ fetching, setFetching ] = useState<boolean>(true)
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ countTotal, setCountTotal ] = useState<number>(0)

    const [ count, setCount ] = useState<number>(0)
    const [ page, setPage ] = useState<number>(0)
    const [ rowsPerPage, setRowsPerPage ] = useState<number>(100)
    const [ specialtyDataPrev, setSpecialtyDataPrev ] = useState<SpecialtyProps[]>([])
    const [ specialtyDataNext, setSpecialtyDataNext ] = useState<SpecialtyProps[]>([])
    const [ nextLink, setNextLink ] = useState<string | null>(null)
    const [ prevLink, setPrevLink ] = useState<string | null>(null)

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

    useEffect(() => {
        if (count == 0) {
            if (page == 0) { 
                pageGetAllSpecialties(setSpecialties, setFetching, setCountTotal, setNextLink, setPrevLink, PageSpecialtyCRUDUrl) 
                pageGetAllMainSpecialties(setMainSpecialties, setFetching, setCountTotal, setNextLink, setPrevLink, PageMainSpecialtyCRUDUrl) 
                getAllDomains(setDomains, setFetching)
                getAllLevels(setLevels, setFetching)
            }
            if (page != 0) { 
                pageGetAllSpecialties(setSpecialties, setFetching, setCountTotal, setNextLink, setPrevLink, PageSpecialtyCRUDUrl + "?page=" + page)  
            }
            setCount(count + 1)
        }
        if (count == 1) {
            if (mainSpecialties.length > 0) { setSpecialtyMainData(mainSpecialties); setCount(count + 1); }
        }
        if (count == 2) {
            if (specialties.length > 0) { setSpecialtyData(specialties); setCount(count + 1); setLoading(false); }
        }
        if (count == 3) {
            if (page == 0){
                setSpecialtyDataPrev([])
                getData(setSpecialtyData, setFetching, setCountTotal, setNextLink, setPrevLink, PageSpecialtyCRUDUrl + "?page=" + 1)
                if (nextLink != null) { getData(setSpecialtyDataNext, setFetching, setCountTotal, setNextLink, setPrevLink, PageSpecialtyCRUDUrl + "?page=" + 2) }
            }
            if (page > 0){
                getData(setSpecialtyDataPrev, setFetching, setCountTotal, setNextLink, setPrevLink, PageSpecialtyCRUDUrl + "?page=" + page )
                if (nextLink != null) { getData(setSpecialtyDataNext, setFetching, setCountTotal, setNextLink, setPrevLink, PageSpecialtyCRUDUrl + "?page=" + (page + 2)) }
            }
            setCount(count + 1)
        }
    }, [specialties, page, mainSpecialties, nextLink, count, domains])

    const reset = () => {
        setFetching(true)
        getAllSpecialties(setSpecialties, setFetching)
        pageGetAllMainSpecialties(setMainSpecialties, setFetching, setCountTotal, setNextLink, setPrevLink, PageMainSpecialtyCRUDUrl) 
        getAllDomains(setDomains, setFetching)
    }
    
    const handleChangeSpecialtyPage = (e: unknown, newPage: number) => {
        setPage(newPage);
        if (newPage < page) { setSpecialtyData(specialtyDataPrev); }
        if (newPage > page) { setSpecialtyData(specialtyDataNext); }
        setCount(3);
    }

    const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    }

    const TableComp:FC = () => (
        <>
           <TableContainer>
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
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[2]}
                component="div"
                count={countTotal}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangeSpecialtyPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )

    const TableCompMainSpecialties:FC = () => (
        <>
            <TableContainer>
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
            </TableContainer>
        </>
    )
  return (<>

    {(loading == true && fetching == true) ? 

        <div style={{ flex: 1, alignItems: "center", textAlign: "center", justifyContent: "center", fontSize: "30", paddingTop: 50, paddingBottom: 70, paddingLeft: 60, paddingRight: 25 }}>
            Data Loading <LinearProgress style={{ marginTop: 30, padding: 5 }}/>
        </div>  

        :

        <>
            {showSpecialty ? 
                <MyTableCard
                    title={"Specialty Section"}
                    buttonReset={<MyButtonLoader fetching={fetching} loadingText='Loading' info={specialtyMainData.length} onClick={reset} />}
                    buttonAdd={<MyButtonAdd setAddItem={setAddSpecialtyMainFormModal} />}
                    extra={<Button onClick={() => {setShowSpecialty(false)}} variant='outlined' sx={{ marginLeft: 4 }}>Show All Classes</Button>}
                    table={<TableCompMainSpecialties />}
                    loading={loading}
                />
                    :

                <MyTableCard
                    title={"Class Section"}
                    buttonReset={<MyButtonLoader fetching={fetching} loadingText='Loading' info={specialtyData.length} onClick={reset} />  }
                    buttonAdd={<MyButtonAdd setAddItem={setAddSpecialtyFormModal} />}
                    extra={<Button onClick={() => {setShowSpecialty(true)}} variant='outlined' sx={{ marginLeft: 4 }}>Show All Specialties</Button>}
                    table={<TableComp />}
                    loading={loading}
                />
            }

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

        </> 
    }

    

    </>
    )
}

export default Specialties