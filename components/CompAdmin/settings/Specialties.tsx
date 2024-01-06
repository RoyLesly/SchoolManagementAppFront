'use client';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import MyTableCard from '@/Designs/Tables/MyTableCard'
import {
    Typography, 
    Table, TableBody, TableCell, TableHead, TableRow,
    Button, Stack, LinearProgress, TableContainer, TablePagination,
} from '@mui/material';
import { DomainOptimizedType, LevelOptimizedType, MainSpecialtyOptimizedType, SpecialtyOptimizedType } from '@/Utils/types';
import { getOptimizedQuery } from '@/Utils/pagination';
import AddSpecialtyFormModal from '@/Designs/Modals/AddSpecialtyFormModal';
import EditSpecialtyFormModal from '@/Designs/Modals/EditSpecialtyFormModal';
import DeleteItemFormModal from '@/Designs/Modals/DeleteItemFormModal';
import MyButtonAdd from '@/Designs/MyButtonAdd';
import { AppControlOptimizedQueryUrl, MainSpecialtyCRUDUrl, PageMainSpecialtyCRUDUrl, PageSpecialtyCRUDUrl, SpecialtyCRUDUrl } from '@/Utils/Config';
import EditMainSpecialtyFormModal from '@/Designs/Modals/EditMainSpecialtyFormModal';
import AddMainSpecialtyFormModal from '@/Designs/Modals/AddMainSpecialtyFormModal';
import MyButtonLoader from '@/Designs/MyButtonLoader';


const Specialties = () => {
    const [ fetching, setFetching ] = useState<boolean>(true)
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ countTotal, setCountTotal ] = useState<number>(0)

    const [ count, setCount ] = useState<number>(0)
    const [ page, setPage ] = useState<number>(0)
    const [ rowsPerPage, setRowsPerPage ] = useState<number>(100)
    const [ specialtyDataPrev, setSpecialtyDataPrev ] = useState<SpecialtyOptimizedType[]>([])
    const [ specialtyDataNext, setSpecialtyDataNext ] = useState<SpecialtyOptimizedType[]>([])
    const [ nextLink, setNextLink ] = useState<boolean>(false)
    const [ prevLink, setPrevLink ] = useState<boolean>(false)

    const [ showSpecialty, setShowSpecialty ] = useState<boolean>(false)
    const [ record, setRecord ] = useState<SpecialtyOptimizedType>()
    const [ specialties, setSpecialties ] = useState<SpecialtyOptimizedType[]>([])
    const [ specialtyData, setSpecialtyData ] = useState<SpecialtyOptimizedType[]>([])
    const [ mainSpecialties, setMainSpecialties ] = useState<MainSpecialtyOptimizedType[]>([])
    const [ levels, setLevels ] = useState<LevelOptimizedType[]>([])
    const [ addSpecialtyFormModal, setAddSpecialtyFormModal ] = useState<boolean>(false)
    const [ editSpecialtyFormModal, setEditSpecialtyFormModal ] = useState<boolean>(false)
    const [ deleteSpecialtyFormModal, setDeleteSpecialtyFormModal ] = useState<boolean>(false)
    const [ deleteMainSpecialtyFormModal, setDeleteMainSpecialtyFormModal ] = useState<boolean>(false)

    const [ domains, setDomains ] = useState<DomainOptimizedType[]>([])
    const [ recordMain, setRecordMain ] = useState<MainSpecialtyOptimizedType>()
    const [ specialtyMainData, setSpecialtyMainData ] = useState<MainSpecialtyOptimizedType[]>([])
    const [ addSpecialtyMainFormModal, setAddSpecialtyMainFormModal ] = useState<boolean>(false)
    const [ editSpecialtyMainFormModal, setEditSpecialtyMainFormModal ] = useState<boolean>(false)

    const [ specialtyFieldList, setSpecialtyFieldList] = useState<string[]>(["id", "main_specialty__specialty_name", "academic_year", "level__level", "main_specialty__domain__id", "main_specialty__id"])
    const [ mainSpecialtyFieldList, setMainSpecialtyFieldList] = useState<string[]>(["id", "specialty_name", "domain__domain_name", "domain__id"])


    useEffect(() => {
        if (count == 0) {
            if (page == 0) { 
                getOptimizedQuery(setSpecialties, setFetching, setCountTotal, setNextLink, setPrevLink, AppControlOptimizedQueryUrl, { model: "Specialty", fieldList: [...specialtyFieldList], page: 1}) 
                getOptimizedQuery(setMainSpecialties, setFetching, ()=>{}, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, { model: "MainSpecialty", fieldList: [...mainSpecialtyFieldList]}) 
                getOptimizedQuery(setLevels, setFetching, ()=>{}, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, { model: "Level", fieldList: ["id", "level"]}) 
                getOptimizedQuery(setDomains, setFetching, ()=>{}, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, { model: "Domain", fieldList: ["id", "domain_name"]}) 
            }
            if (page != 0) { 
                getOptimizedQuery(setSpecialties, setFetching, setCountTotal, setNextLink, setPrevLink, AppControlOptimizedQueryUrl, { model: "Specialty", fieldList: [...specialtyFieldList], page: page}) 
            }
            setCount(count + 1)
        }
        if (count == 1) {
            if (specialties.length > 0) { setSpecialtyData(specialties); setCount(count + 1); setLoading(false); }
        }
        if (count == 2) {
            if (mainSpecialties.length > 0) { setSpecialtyMainData(mainSpecialties); setCount(count + 1); }
        }
        if (count == 3) {
            if (page == 0){
                setSpecialtyDataPrev([])
                if (nextLink) { getOptimizedQuery(setSpecialtyDataNext, setFetching, setCountTotal, setNextLink, setPrevLink, AppControlOptimizedQueryUrl, { model: "Specialty", page: 2, fieldList: [...specialtyFieldList]}) }
            }
            if (page > 0){
                getOptimizedQuery(setSpecialtyDataPrev, setFetching, setCountTotal, setNextLink, setPrevLink, AppControlOptimizedQueryUrl, { model: "Specialty", page: page, fieldList: [...specialtyFieldList]} )
                if (nextLink) { getOptimizedQuery(setSpecialtyDataNext, setFetching, setCountTotal, setNextLink, setPrevLink, AppControlOptimizedQueryUrl, { model: "Specialty", page: page + 2, fieldList: [...specialtyFieldList]}) }
                else { setSpecialtyDataNext([]) }
            }
            setCount(count + 1)
        }
    }, [specialties, page, mainSpecialties, nextLink, count, domains, specialtyFieldList, mainSpecialtyFieldList])

    const resetSpec = () => {
        setCount(0)
        setFetching(true)
    }

    const resetMain = () => {
        setCount(0)
        setFetching(true)
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
                                    ID
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Specialty / Level
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Level
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
                        {specialtyData.map((item: SpecialtyOptimizedType) => (
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

                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {item[3]}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {item[2]}
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
                                    ID
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Specialty Type
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
                        {specialtyMainData.map((item: MainSpecialtyOptimizedType) => (
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

                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {item[2]}
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
                    title={"Specialty Type Section"}
                    buttonReset={<MyButtonLoader fetching={fetching} loadingText='Loading' info={specialtyMainData.length} onClick={resetMain} />}
                    buttonAdd={<MyButtonAdd setAddItem={setAddSpecialtyMainFormModal} />}
                    extra={<Button onClick={() => {setShowSpecialty(false)}} variant='outlined' sx={{ marginLeft: 4 }}>Show All Specialties</Button>}
                    table={<TableCompMainSpecialties />}
                    loading={loading}
                />
                    :

                <MyTableCard
                    title={"Specialty Section"}
                    buttonReset={<MyButtonLoader fetching={fetching} loadingText='Loading' info={specialtyData.length} onClick={resetSpec} />  }
                    buttonAdd={<MyButtonAdd setAddItem={setAddSpecialtyFormModal} />}
                    extra={<Button onClick={() => {setShowSpecialty(true)}} variant='outlined' sx={{ marginLeft: 4 }}>Show All Types</Button>}
                    table={<TableComp />}
                    loading={loading}
                />
            }

            <AddSpecialtyFormModal
                showModal={addSpecialtyFormModal}
                setShowModal={setAddSpecialtyFormModal}
                mainSpecialty={mainSpecialties}
                levels={levels}
                reset={resetSpec}
            />

            <EditSpecialtyFormModal
                showModal={editSpecialtyFormModal} 
                setShowModal={setEditSpecialtyFormModal}
                record={record}
                mainSpecialty={mainSpecialties}
                reset={resetSpec} 
                levels={levels} 
            />

            <AddMainSpecialtyFormModal
                showModal={addSpecialtyMainFormModal}
                setShowModal={setAddSpecialtyMainFormModal}
                domains={domains}
                reset={resetMain}
            />

            <EditMainSpecialtyFormModal
                showModal={editSpecialtyMainFormModal} 
                setShowModal={setEditSpecialtyMainFormModal}
                record={recordMain}
                domains={domains}
                reset={resetMain} 
            />

            <DeleteItemFormModal
                showModal={deleteSpecialtyFormModal}
                setShowModal={setDeleteSpecialtyFormModal}
                record_name={record ? record[1] : null}
                record={record}
                reset={resetSpec}
                url={SpecialtyCRUDUrl}
            />

            <DeleteItemFormModal
                showModal={deleteMainSpecialtyFormModal}
                setShowModal={setDeleteMainSpecialtyFormModal}
                record_name={recordMain ? recordMain[1] : null}
                record={recordMain}
                reset={resetSpec}
                url={MainSpecialtyCRUDUrl}
            />

        </> 
    }

    

    </>
    )
}

export default Specialties