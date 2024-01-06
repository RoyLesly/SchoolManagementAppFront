import { MainCourseOptimizedType } from '@/Utils/types';
import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { FC } from 'react'


interface TableCourseMainProps {
    coursesMainData: MainCourseOptimizedType[]
    setRecordMain: any
    setEditCourseMainFormModal: any
    setDeleteCourseMainFormModal: any
}

const TableCourseMain:FC<TableCourseMainProps> = ({ coursesMainData, setRecordMain, setEditCourseMainFormModal, setDeleteCourseMainFormModal }) => {
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
                {coursesMainData.map((item: MainCourseOptimizedType) => (
                    <TableRow key={item[0]}>
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
}

export default TableCourseMain