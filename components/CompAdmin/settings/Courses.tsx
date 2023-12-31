'use client';
import React, { useEffect, useState } from 'react';
import MyTableCard from '@/Designs/Tables/MyTableCard'
import {
    Button, Input, LinearProgress,
} from '@mui/material';
import { CourseProps, LevelProps, MainCourseProps, SpecialtyProps, UserType } from '@/Utils/types';
import { getAllCourses, getAllLevels, getAllMainCourses, getAllSpecialties, getAllUsers } from '@/Utils/functions';
import DeleteItemFormModal from '@/Designs/Modals/DeleteItemFormModal';
import MyButtonAdd from '@/Designs/MyButtonAdd';
import EditCourseFormModal from '@/Designs/Modals/EditCourseFormModal';
import AddCourseFormModal from '@/Designs/Modals/AddCourseFormModal';
import { CourseCRUDUrl, MainCourseCRUDUrl } from '@/Utils/Config';
import AddMainCourseFormModal from '@/Designs/Modals/AddMainCourseFormModal';
import EditMainCourseFormModal from '@/Designs/Modals/EditMainCourseFormModal';
import MyButtonLoader from '@/Designs/MyButtonLoader';
import TableCourse from '@/Designs/Tables/TableCourse';
import TableCourseMain from '@/Designs/Tables/TableCourseMain';

const Courses = () => {
    const [ showMain, setShowMain ] = useState<boolean>(false)
    const [ fetching, setFetching ] = useState<boolean>(true)
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ record, setRecord ] = useState<CourseProps | null>(null)
    const [ count, setCount ] = useState<number>(0)
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
    const [ specialties, setSpecialties ] = useState<SpecialtyProps[]>([])

    useEffect(() => {
        if (count == 0){
            getAllCourses(setCourses, setFetching);
            getAllSpecialties(setSpecialties, setFetching);
            getAllMainCourses(setCoursesMain, setFetching)
            getAllLevels(setLevels, setFetching);
            getAllUsers(setUserTeachers, setFetching, { searchField: "role", value: "teacher"});
            setCount(count + 1)
        }
        if (count == 1) {
            if (courses.length > 0) {
                setCoursesData(courses)
                setCount(count + 1)
            }
            if (coursesMain.length > 0) {
                setCoursesMainData(coursesMain)
            }
        }
        if (count == 2) {
            if (coursesMain.length > 0) {
                setLoading(false)
                setCount(count + 1)
            }
        }
    }, [courses, fetching, coursesMain, count])

    const reset = () => {
        setFetching(true)
        getAllCourses(setCourses, setFetching)
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
                    title={"Courses Types Section"}
                    buttonReset={<MyButtonLoader fetching={fetching} loadingText='Loading' info={coursesMainData.length} onClick={reset} />  }
                    buttonAdd={<MyButtonAdd setAddItem={setAddCourseMainFormModal} />}
                    extra={<Button onClick={() => {setShowMain(false)}} variant='outlined' sx={{ marginX: 1 }}>Show All Courses</Button>}
                    table={
                        <TableCourseMain  
                            coursesMainData={coursesMainData}
                            setRecordMain={setRecord}
                            setEditCourseMainFormModal={setEditCourseMainFormModal}
                            setDeleteCourseMainFormModal={setDeleteCourseMainFormModal}
                        />
                    }
                    search={<Input placeholder='Search Courses ...' onChange={(e) => SearchCourse(e.target.value)}/>}
                    loading={loading}
                /> 
                    :
                <MyTableCard
                    title={"Courses Section"}
                    buttonReset={<MyButtonLoader fetching={fetching} loadingText='Loading' info={coursesData.length} onClick={reset} />  }
                    buttonAdd={<MyButtonAdd setAddItem={setAddCourseFormModal} />}
                    extra={<Button onClick={() => {setShowMain(true)}} variant='outlined' sx={{ marginX: 1 }}>Show All Courses</Button>}
                    table={
                        <TableCourse     
                            coursesData={coursesData}
                            setRecord={setRecord}
                            setEditCourseFormModal={setEditCourseFormModal}
                            setDeleteCourseFormModal={setDeleteCourseFormModal}
                        />
                    }
                    search={<Input placeholder='Search Course Title ...' onChange={(e) => SearchMainCourse(e.target.value)}/>}
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
                record_name={record?.main_course.course_name}
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
                record_name={record?.main_course.course_name}
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