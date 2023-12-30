'use client';
import React, { FC, useEffect, useState } from 'react';
import MyTableCard from '@/Designs/MyTableCard'
import {
    Typography, 
    Table, TableBody, TableCell, TableHead, TableRow,
    Button, Stack, Input, LinearProgress,
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

const Courses = () => {
    const [ showMain, setShowMain ] = useState<boolean>(false)
    const [ fetching, setFetching ] = useState<boolean>(true)
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ record, setRecord ] = useState<CourseProps | null>(null)
    const [ count, setCount ] = useState<number>(0)
    const [ recordMain, setRecordMain ] = useState<MainCourseProps | null>(null)
    const [ courses, setCourses ] = useState<CourseProps[]>([])
    const [ courseData, setCourseData ] = useState<CourseProps[]>([])
    const [ mainCourses, setMainCourses ] = useState<MainCourseProps[]>([])
    const [ mainCoursesData, setMainCoursesData ] = useState<MainCourseProps[]>([])
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
            getAllMainCourses(setMainCourses, setFetching)
            getAllLevels(setLevels, setFetching);
            getAllUsers(setUserTeachers, setFetching, { searchField: "role", value: "teacher"});
            setCount(count + 1)
        }
        if (count == 1) {
            if (courses.length > 0) {
                setCourseData(courses)
                setCount(count + 1)
            }
            if (mainCourses.length > 0) {
                setMainCoursesData(mainCourses)
            }
        }
        if (count == 2) {
            if (mainCourses.length > 0) {
                setLoading(false)
                setCount(count + 1)
            }
        }
    }, [courses, fetching, mainCourses, count])

    const reset = () => {
        setFetching(true)
        getAllCourses(setCourses, setFetching)
        getAllSpecialties(setSpecialties, setFetching)
        getAllMainCourses(setMainCourses, setFetching)
    }

    const SearchMainCourse = (val: string) => {
        const filt = mainCourses.filter((item: MainCourseProps) => item.course_name.toLowerCase().includes(val.toLowerCase()))
        setMainCoursesData(filt);
    }

    const SearchCourse = (val: string) => {        
        const filt = courses.filter((item: CourseProps) => item.main_course.course_name.toLowerCase().includes(val.toLowerCase()))
        setCourseData(filt);
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
                            Code / Course Name
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Semester
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Specialty / Level / Year
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Lecturer
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
                {courseData.map((item: CourseProps) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: "500",
                                }}
                            >
                                {item.course_code} - {item.main_course?.course_name}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: "500",
                                }}
                            >
                                {item.semester}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                {item.specialty?.main_specialty.specialty_name} / {item.specialty?.level?.level} / {item.specialty?.academic_year}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                {item.assigned_to?.first_name} {item.assigned_to?.last_name}
                            </Typography>
                        </TableCell>

                        <TableCell align='center'>
                            <Stack justifyItems="center" direction="row" spacing={1} justifyContent="center">
                                <Button onClick={() => {setRecord(item); setEditCourseFormModal(true)}} variant="contained" disableElevation color="primary">
                                    Edit
                                </Button>
    
                                <Button onClick={() => {setRecord(item); setDeleteCourseFormModal(true)}} variant="contained" disableElevation color="primary">
                                    Delete
                                </Button>
                            </Stack>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )

    const TableCompMain:FC = () => (
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
                            Course Name
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
                {mainCoursesData.map((item: MainCourseProps) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: "500",
                                }}
                            >
                                {item?.course_name}
                            </Typography>
                        </TableCell>

                        <TableCell align='center' sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                            <Stack justifyItems="center" direction="row" spacing={1} justifyContent="center">
                                <Button onClick={() => {setRecordMain(item); setEditCourseMainFormModal(true)}} variant="contained" disableElevation color="primary">
                                    Edit
                                </Button>
    
                                <Button onClick={() => {setRecordMain(item); setDeleteCourseMainFormModal(true)}} variant="contained" disableElevation color="primary">
                                    Delete
                                </Button>
                            </Stack>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )


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
                    buttonReset={<MyButtonLoader fetching={fetching} loadingText='Loading' info={mainCoursesData.length} onClick={reset} />  }
                    buttonAdd={<MyButtonAdd setAddItem={setAddCourseMainFormModal} />}
                    extra={<Button onClick={() => {setShowMain(false)}} variant='outlined' sx={{ marginX: 1 }}>Show All Courses</Button>}
                    table={<TableCompMain />}
                    search={<Input placeholder='Search Courses ...' onChange={(e) => SearchCourse(e.target.value)}/>}
                    loading={loading}
                /> 
                    :
                <MyTableCard
                    title={"Courses Section"}
                    buttonReset={<MyButtonLoader fetching={fetching} loadingText='Loading' info={courseData.length} onClick={reset} />  }
                    buttonAdd={<MyButtonAdd setAddItem={setAddCourseFormModal} />}
                    extra={<Button onClick={() => {setShowMain(true)}} variant='outlined' sx={{ marginX: 1 }}>Show All Courses</Button>}
                    table={<TableComp />}
                    search={<Input placeholder='Search Course Title ...' onChange={(e) => SearchMainCourse(e.target.value)}/>}
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
                record_name={record?.main_course.course_name}
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