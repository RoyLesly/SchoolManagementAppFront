'use client';
import React, { FC, useEffect, useState } from 'react';
import MyTableCard from '@/Designs/MyTableCard'
import {
    Typography, 
    Table, TableBody, TableCell, TableHead, TableRow,
    Button, Stack,
} from '@mui/material';
import { CourseProps, LevelProps, MainCourseProps, SpecialtyProps, UserProfile } from '@/Utils/types';
import { useGetAllLevels, useGetAllMainCourses, useGetAllCourses, useGetAllUserProfiles } from '@/Utils/customHooks';
import { getAllCourses, getAllMainCourses } from '@/Utils/functions';
import DeleteItemFormModal from '@/Designs/Modals/DeleteItemFormModal';
import MyButtonReload from '@/Designs/MyButtonReload';
import MyButtonAdd from '@/Designs/MyButtonAdd';
import EditCourseFormModal from '@/Designs/Modals/EditCourseFormModal';
import AddCourseFormModal from '@/Designs/Modals/AddCourseFormModal';

const Courses = () => {
    const [ fetching, setFetching ] = useState<boolean>(false)
    const [ record, setRecord ] = useState<CourseProps | null>(null)
    const [ courses, setCourses ] = useState<CourseProps[]>([])
    const [ courseData, setCourseData ] = useState<CourseProps[]>([])
    const [ mainCourses, setMainCourses ] = useState<MainCourseProps[]>([])
    const [ levels, setLevels ] = useState<LevelProps[]>([])
    const [ addCourseFormModal, setAddCourseFormModal ] = useState<boolean>(false)
    const [ editCourseFormModal, setEditCourseFormModal ] = useState<boolean>(false)
    const [ deleteCourseFormModal, setDeleteCourseFormModal ] = useState<boolean>(false)
    const [ profiles, setProfiles ] = useState<UserProfile[]>([])
    const [ specialties, setSpecialties ] = useState<SpecialtyProps[]>([])

    useGetAllCourses(setCourses, setFetching);
    useGetAllMainCourses(setMainCourses, setFetching);
    useGetAllLevels(setLevels, setFetching);
    useGetAllUserProfiles(setProfiles, setFetching);

    useEffect(() => {
        setCourseData(courses)
    }, [courses])
    
    const reset = () => {
        getAllCourses(setCourses, setFetching)
        getAllMainCourses(setMainCourses, setFetching)
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
                            Course Name
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Specialty
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
                                {item.main_course?.course_name}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                {item.specialty?.main_specialty.specialty_name}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                {item.assigned_to?.username}
                            </Typography>
                        </TableCell>

                        <TableCell align='center'>
                            <Stack spacing={1} direction="row">
                                <Button onClick={() => {setRecord(item); setEditCourseFormModal(true)}} variant="contained" disableElevation color="primary">
                                    Edit
                                </Button>
                                <Button onClick={() => {setRecord(item); setDeleteCourseFormModal(true)}} variant="contained" disableElevation color="primary"  target="_blank" href="">
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
        title={"Courses Section"}
        buttonReset={<MyButtonReload fetching={fetching} reset={reset} />}
        buttonAdd={<MyButtonAdd setAddItem={setAddCourseFormModal} />}
        table={<TableComp />}
    />

    <AddCourseFormModal
        showModal={addCourseFormModal}
        setShowModal={setAddCourseFormModal}
        mainCourses={mainCourses}
        reset={reset}
        specialty={specialties}
        profile={profiles}
    />

    <EditCourseFormModal
        showModal={editCourseFormModal} 
        setShowModal={setEditCourseFormModal}
        record={record}
        record_name={record?.main_course.course_name}
        specialty={specialties}
        profile={profiles}
        mainCoursesData={mainCourses}
        reset={reset} 
    />

    <DeleteItemFormModal
        showModal={deleteCourseFormModal}
        setShowModal={setDeleteCourseFormModal}
        record_name={record?.main_course.course_name}
        record={record}
        reset={reset}
        url={""}
    />

  </>)
}

export default Courses