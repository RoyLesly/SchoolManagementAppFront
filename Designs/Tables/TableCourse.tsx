import { CourseProps } from '@/Utils/types';
import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { FC } from 'react'


interface TableCourseProps {
    coursesData: CourseProps[]
    setRecord: any
    setEditCourseFormModal: any
    setDeleteCourseFormModal: any
}

const TableCourse:FC<TableCourseProps> = ({ coursesData, setRecord, setEditCourseFormModal, setDeleteCourseFormModal }) => {
  return (
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
                {coursesData.map((item: CourseProps) => (
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
}

export default TableCourse