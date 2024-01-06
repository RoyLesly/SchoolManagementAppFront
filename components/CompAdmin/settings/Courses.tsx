'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import MyTableCard from '@/Designs/Tables/MyTableCard'
import {
    Button, Input, LinearProgress, TableContainer, TablePagination,
} from '@mui/material';
import { CourseOptimizedType, CourseProps, DropdownSpecialtyType, DropdownUserTeacherType, LevelProps, MainCourseOptimizedType, MainCourseProps, SpecialtyOptimizedType, SpecialtyProps, UserType } from '@/Utils/types';
import DeleteItemFormModal from '@/Designs/Modals/DeleteItemFormModal';
import MyButtonAdd from '@/Designs/MyButtonAdd';
import EditCourseFormModal from '@/Designs/Modals/EditCourseFormModal';
import AddCourseFormModal from '@/Designs/Modals/AddCourseFormModal';
import { AppControlOptimizedQueryUrl, CourseCRUDUrl, MainCourseCRUDUrl, UserControlOptimizedQueryUrl } from '@/Utils/Config';
import AddMainCourseFormModal from '@/Designs/Modals/AddMainCourseFormModal';
import EditMainCourseFormModal from '@/Designs/Modals/EditMainCourseFormModal';
import MyButtonLoader from '@/Designs/MyButtonLoader';
import TableCourse from '@/Designs/Tables/TableCourse';
import TableCourseMain from '@/Designs/Tables/TableCourseMain';
import { getOptimizedQuery } from '@/Utils/pagination';

const Courses = () => {
    const [ showMain, setShowMain ] = useState<boolean>(false)
    const [ fetching, setFetching ] = useState<boolean>(true)
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ record, setRecord ] = useState<CourseOptimizedType>()
    const [ count, setCount ] = useState<number>(0)
    const [ page, setPage ] = useState<number>(0)
    const [ rowsPerPage, setRowsPerPage ] = useState<number>(100)
    const [ countTotal, setCountTotal ] = useState<number>(0)
    const [ nextLink, setNextLink ] = useState<boolean>(false)
    const [ prevLink, setPrevLink ] = useState<boolean>(false)
    const [ coursesDataPrev, setCoursesDataPrev ] = useState<CourseOptimizedType[]>([])
    const [ coursesDataNext, setCoursesDataNext ] = useState<CourseOptimizedType[]>([])

    const [ recordMain, setRecordMain ] = useState<MainCourseOptimizedType>()
    const [ courses, setCourses ] = useState<CourseOptimizedType[]>([])
    const [ coursesData, setCoursesData ] = useState<CourseOptimizedType[]>([])
    const [ mainCourses, setMainCourses ] = useState<MainCourseOptimizedType[]>([])
    const [ mainCoursesData, setMainCoursesData ] = useState<MainCourseOptimizedType[]>([])
    const [ levels, setLevels ] = useState<LevelProps[]>([])
    const [ addCourseFormModal, setAddCourseFormModal ] = useState<boolean>(false)
    const [ editCourseFormModal, setEditCourseFormModal ] = useState<boolean>(false)
    const [ deleteCourseFormModal, setDeleteCourseFormModal ] = useState<boolean>(false)

    const [ addCourseMainFormModal, setAddCourseMainFormModal ] = useState<boolean>(false)
    const [ editCourseMainFormModal, setEditCourseMainFormModal ] = useState<boolean>(false)
    const [ deleteCourseMainFormModal, setDeleteCourseMainFormModal ] = useState<boolean>(false)
    const [ userTeachers, setUserTeachers ] = useState<DropdownUserTeacherType[]>([])
    const [ specialties, setSpecialties ] = useState<SpecialtyOptimizedType[]>([])

    const [ coursesFieldList, setCoursesFieldList] = useState<string[]>(["id", "main_course__course_name", "specialty__main_specialty__specialty_name", "semester", "course_code", "course_credit", "hours", "completed", 
        "specialty__level__level", "specialty__academic_year", "assigned_to", "assigned_to__first_name", "assigned_to__last_name", "specialty__id", "main_course__id"
    ])
    const [ mainCoursesFieldList, setMainCoursesFieldList] = useState<string[]>(["id", "course_name"])
    const [ specialtyFieldList, setSpecialtyFieldList] = useState<string[]>(["id", "main_specialty__specialty_name", "academic_year", "level_id", "main_specialty__domain__id", "main_specialty__id", "level__level"])

    useEffect(() => {
        if (count == 0) {
            if (page == 0) { 
                getOptimizedQuery(setCourses, setFetching, setCountTotal, setNextLink, setPrevLink, AppControlOptimizedQueryUrl, { model: "Course", fieldList: [...coursesFieldList], page: 1}) 
                getOptimizedQuery(setMainCourses, setFetching, ()=>{}, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, { model: "MainCourse", fieldList: [...mainCoursesFieldList]}) 
                getOptimizedQuery(setLevels, setFetching, ()=>{}, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, { model: "Level", fieldList: ["id", "level"]}) 
                getOptimizedQuery(setSpecialties, setFetching, ()=>{}, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, { model: "Specialty", fieldList: [...specialtyFieldList]}) 
            }
            if (page != 0) { 
                getOptimizedQuery(setCourses, setFetching, setCountTotal, setNextLink, setPrevLink, AppControlOptimizedQueryUrl, { model: "Course", fieldList: [...coursesFieldList], page: page}) 

            }
            setCount(count + 1)
        }
        if (count == 1) {
            if (courses.length > 0) { setCoursesData(courses); setCount(count + 1); setLoading(false); }
        }
        if (count == 2) {
            if (mainCourses.length > 0) { setMainCoursesData(mainCourses); setCount(count + 1); }
        }
        if (count == 3) {
            if (page == 0){
                setCoursesDataPrev([])
                if (nextLink) { getOptimizedQuery(setCoursesDataNext, setFetching, setCountTotal, setNextLink, setPrevLink, AppControlOptimizedQueryUrl, { model: "Course", page: 2, fieldList: [...coursesFieldList]}) }
            }
            if (page > 0){
                getOptimizedQuery(setCoursesDataPrev, setFetching, setCountTotal, setNextLink, setPrevLink, AppControlOptimizedQueryUrl, { model: "Course", page: page, fieldList: [...coursesFieldList]} )
                if (nextLink) { getOptimizedQuery(setCoursesDataNext, setFetching, setCountTotal, setNextLink, setPrevLink, AppControlOptimizedQueryUrl, { model: "Course", page: page + 2, fieldList: [...coursesFieldList]}) }
                else { setCoursesDataNext([]) }
            }
            setCount(count + 1)
        }
    }, [courses, page, mainCourses, nextLink, count, coursesFieldList, mainCoursesFieldList, specialtyFieldList])

    useEffect(() => {
        getOptimizedQuery(setUserTeachers, setFetching, ()=>{}, ()=>{}, ()=>{}, UserControlOptimizedQueryUrl, { model: "CustomUser", searchField: ["role", "is_active"], value: ["teacher", true], fieldList: ["id", "first_name", "last_name"]}) 
    }, [addCourseFormModal, editCourseFormModal])
    const reset = () => {
        setCount(0)
        setFetching(true)
    }

    const SearchMainCourse = (val: string) => {
        const filt = mainCourses.filter((item: MainCourseOptimizedType) => item[1].toLowerCase().includes(val.toLowerCase()))
        setMainCoursesData(filt);
    }

    const SearchCourse = (val: string) => {        
        const filt = courses.filter((item: CourseOptimizedType) => item[1].toLowerCase().includes(val.toLowerCase()))
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
                    buttonReset={<MyButtonLoader fetching={fetching} loadingText='Loading' info={mainCoursesData.length} onClick={reset} />  }
                    search={<Input placeholder='Search Title ...' onChange={(e) => SearchCourse(e.target.value)}/>}
                    buttonAdd={<MyButtonAdd setAddItem={setAddCourseMainFormModal} />}
                    extra={<Button onClick={() => {setShowMain(false)}} variant='outlined' sx={{ marginX: 1 }}>Show All Courses</Button>}
                    table={
                        <>
                            <TableContainer>
                                <TableCourseMain  
                                    coursesMainData={mainCoursesData}
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
                mainCourses={mainCourses}
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
                record_name={record && record[1]}
                specialty={specialties}
                userTeachers={userTeachers}
                mainCoursesData={mainCourses}
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
                record_name={record && record[1]}
                record={record}
                reset={reset}
                url={CourseCRUDUrl}
            />
        
            <DeleteItemFormModal
                showModal={deleteCourseMainFormModal}
                setShowModal={setDeleteCourseMainFormModal}
                record_name={recordMain && recordMain[1]}
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