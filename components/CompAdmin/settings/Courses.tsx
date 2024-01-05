'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import MyTableCard from '@/Designs/Tables/MyTableCard'
import {
    Button, Input, LinearProgress, TableContainer, TablePagination,
} from '@mui/material';
import { CourseProps, DropdownSpecialtyType, LevelProps, MainCourseProps, SpecialtyProps, UserType } from '@/Utils/types';
import { getAllLevels, getAllMainCourses, getAllSpecialties, getAllUsers } from '@/Utils/functions';
import DeleteItemFormModal from '@/Designs/Modals/DeleteItemFormModal';
import MyButtonAdd from '@/Designs/MyButtonAdd';
import EditCourseFormModal from '@/Designs/Modals/EditCourseFormModal';
import AddCourseFormModal from '@/Designs/Modals/AddCourseFormModal';
import { CourseCRUDUrl, MainCourseCRUDUrl, PageCourseCRUDUrl } from '@/Utils/Config';
import AddMainCourseFormModal from '@/Designs/Modals/AddMainCourseFormModal';
import EditMainCourseFormModal from '@/Designs/Modals/EditMainCourseFormModal';
import MyButtonLoader from '@/Designs/MyButtonLoader';
import TableCourse from '@/Designs/Tables/TableCourse';
import TableCourseMain from '@/Designs/Tables/TableCourseMain';
import { getData, getDataDropdown, pageGetAllCourses } from '@/Utils/pagination';

const Courses = () => {
    const [ showMain, setShowMain ] = useState<boolean>(false)
    const [ fetching, setFetching ] = useState<boolean>(true)
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ record, setRecord ] = useState<CourseProps | null>(null)
    const [ count, setCount ] = useState<number>(0)
    const [ page, setPage ] = useState<number>(0)
    const [ rowsPerPage, setRowsPerPage ] = useState<number>(100)
    const [ countTotal, setCountTotal ] = useState<number>(0)
    const [ nextLink, setNextLink ] = useState<string | null>(null)
    const [ prevLink, setPrevLink ] = useState<string | null>(null)
    const [ coursesDataPrev, setCoursesDataPrev ] = useState<CourseProps[]>([])
    const [ coursesDataNext, setCoursesDataNext ] = useState<CourseProps[]>([])

    const [ recordMain, setRecordMain ] = useState<MainCourseProps | null>(null)
    const [ courses, setCourses ] = useState<CourseProps[]>([])
    const [ coursesData, setCoursesData ] = useState<CourseProps[]>([])
    const [ coursesMain, setCoursesMain ] = useState<MainCourseProps[]>([])
    const [ coursesMainData, setCoursesMainData ] = useState<MainCourseProps[]>([])
    const [ levels, setLevels ] = useState<LevelProps[]>([])
    const [ addCourseFormModal, setAddCourseFormModal ] = useState<boolean>(false)
    const [ editCourseFormModal, setEditCourseFormModal ] = useState<boolean>(false)
    const [ deleteCourseFormModal, setDeleteCourseFormModal ] = useState<boolean>(false)

    const [ addCourseMainFormModal, setAddCourseMainFormModal ] = useState<boolean>(false)
    const [ editCourseMainFormModal, setEditCourseMainFormModal ] = useState<boolean>(false)
    const [ deleteCourseMainFormModal, setDeleteCourseMainFormModal ] = useState<boolean>(false)
    const [ userTeachers, setUserTeachers ] = useState<UserType[]>([])
    const [ specialties, setSpecialties ] = useState<DropdownSpecialtyType[]>([])

    useEffect(() => {
        if (count == 0){
            pageGetAllCourses(setCourses, setFetching, setCountTotal, setNextLink, setPrevLink) 
            if (courses.length > 0) { setCount(count + 1); setLoading(false) }
        }
        if (count == 1) {
            getDataDropdown(setSpecialties, () => {}, {model: "Specialty"});
            getAllMainCourses(setCoursesMain, ()=>{})
            getDataDropdown(setLevels, () => {}, {model: "Level"});
            getAllUsers(setUserTeachers, ()=>{}, { searchField: ["role", "is_active"], value: ["teacher", true]});
            setCoursesData(courses)
            setCount(count + 1)
        }
        if (count == 2) {
            if (coursesMain.length > 0) {
                setCoursesMainData(coursesMain)
                setCount(count + 1)
            }
        }
        if (count == 3) {
            if (page == 0){
                setCoursesDataPrev([])
                getData(setCoursesData, ()=>{}, setCountTotal, setNextLink, setPrevLink, PageCourseCRUDUrl + "?page=" + 1)
                if (nextLink != null) { getData(setCoursesDataNext, setFetching, setCountTotal, setNextLink, setPrevLink, PageCourseCRUDUrl + "?page=" + 2) }
            }
            if (page > 0){
                getData(setCoursesDataPrev, ()=>{}, setCountTotal, setNextLink, setPrevLink, PageCourseCRUDUrl + "?page=" + page )
                if (nextLink != null) { getData(setCoursesDataNext, setFetching, setCountTotal, setNextLink, setPrevLink, PageCourseCRUDUrl + "?page=" + (page + 2)) }
            }
            setCount(count + 1)
        }
    }, [courses, page, nextLink, fetching, coursesMain, count])


    const reset = () => {
        setFetching(true)
        getData(setCoursesData, setFetching, setCountTotal, setNextLink, setPrevLink, PageCourseCRUDUrl + "?page=" + 1)
        getAllSpecialties(setSpecialties, setFetching)
        getAllMainCourses(setCoursesMain, setFetching)
    }

    const SearchMainCourse = (val: string) => {
        const filt = coursesMain.filter((item: MainCourseProps) => item.course_name.toLowerCase().includes(val.toLowerCase()))
        setCoursesMainData(filt);
    }

    const SearchCourse = (val: string) => {        
        const filt = courses.filter((item: CourseProps) => item.main_course.course_name.toLowerCase().includes(val.toLowerCase()))
        setCoursesData(filt);
    }

    const handleChangePage = (e: unknown, newPage: number) => {
        setPage(newPage);
        if (newPage < page) { setCoursesData(coursesDataPrev); }
        if (newPage > page) { setCoursesData(coursesDataNext); }
        setCount(3);
    }

    const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    }

  return (
    <>
        {(loading == true && fetching == true) ? 
            <div style={{ flex: 1, alignItems: "center", textAlign: "center", justifyContent: "center", fontSize: "30", paddingTop: 50, paddingBottom: 70, paddingLeft: 60, paddingRight: 25 }}>
                Data Loading <LinearProgress style={{ marginTop: 30, padding: 5 }}/>
            </div>  
            : 
            <>

            { showMain ? 
                <MyTableCard
                    title={"Course Title Section"}
                    buttonReset={<MyButtonLoader fetching={fetching} loadingText='Loading' info={coursesMainData.length} onClick={reset} />  }
                    search={<Input placeholder='Search Title ...' onChange={(e) => SearchCourse(e.target.value)}/>}
                    buttonAdd={<MyButtonAdd setAddItem={setAddCourseMainFormModal} />}
                    extra={<Button onClick={() => {setShowMain(false)}} variant='outlined' sx={{ marginX: 1 }}>Show All Courses</Button>}
                    table={
                        <>
                            <TableContainer>
                                <TableCourseMain  
                                    coursesMainData={coursesMainData}
                                    setRecordMain={setRecordMain}
                                    setEditCourseMainFormModal={setEditCourseMainFormModal}
                                    setDeleteCourseMainFormModal={setDeleteCourseMainFormModal}
                                />
                            </TableContainer>
                        </>
                    }
                    loading={loading}
                /> 

                    :

                <MyTableCard
                    title={"Courses Section"}
                    buttonReset={<MyButtonLoader fetching={fetching} loadingText='Loading' info={coursesData.length} onClick={reset} />  }
                    search={<Input placeholder='Search Course ...' onChange={(e) => SearchMainCourse(e.target.value)}/>}
                    buttonAdd={<MyButtonAdd setAddItem={setAddCourseFormModal} />}
                    extra={<Button onClick={() => {setShowMain(true)}} variant='outlined' sx={{ marginX: 1 }}>Show All Titles</Button>}
                    table={
                        <>
                            <TableContainer>
                                <TableCourse     
                                    coursesData={coursesData}
                                    setRecord={setRecord}
                                    setEditCourseFormModal={setEditCourseFormModal}
                                    setDeleteCourseFormModal={setDeleteCourseFormModal}
                                />
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[100]}
                                component="div"
                                count={countTotal}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </>
                    }
                    loading={loading}
                />
            }
        
            <AddCourseFormModal
                showModal={addCourseFormModal}
                setShowModal={setAddCourseFormModal}
                mainCourses={coursesMain}
                reset={reset}
                specialty={specialties}
                userTeachers={userTeachers}
            />
        
            <AddMainCourseFormModal
                showModal={addCourseMainFormModal}
                setShowModal={setAddCourseMainFormModal}
                reset={reset}
            />
        
            <EditCourseFormModal
                showModal={editCourseFormModal} 
                setShowModal={setEditCourseFormModal}
                record={record}
                record_name={record?.main_course?.course_name}
                specialty={specialties}
                userTeachers={userTeachers}
                mainCoursesData={coursesMain}
                reset={reset} 
            />
        
            <EditMainCourseFormModal
                showModal={editCourseMainFormModal} 
                setShowModal={setEditCourseMainFormModal}
                record={recordMain}
                reset={reset} 
            />
        
            <DeleteItemFormModal
                showModal={deleteCourseFormModal}
                setShowModal={setDeleteCourseFormModal}
                record_name={record?.main_course?.course_name}
                record={record}
                reset={reset}
                url={CourseCRUDUrl}
            />
        
            <DeleteItemFormModal
                showModal={deleteCourseMainFormModal}
                setShowModal={setDeleteCourseMainFormModal}
                record_name={recordMain?.course_name}
                record={recordMain}
                reset={reset}
                url={MainCourseCRUDUrl}
            />
        
        </>
        }
    </>
  )
}

export default Courses