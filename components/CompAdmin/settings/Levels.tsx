'use client';
import React, { FC, useEffect, useState } from 'react';
import MyTableCard from '@/Designs/MyTableCard'
import {
    Typography, 
    Table, TableBody, TableCell, TableHead, TableRow,
    Button, Stack,
} from '@mui/material';
import { LevelProps } from '@/Utils/types';
import { getAllLevels } from '@/Utils/functions';
import DeleteItemFormModal from '@/Designs/Modals/DeleteItemFormModal';
import MyButtonReload from '@/Designs/MyButtonReload';
import MyButtonAdd from '@/Designs/MyButtonAdd';
import EditLevelFormModal from '@/Designs/Modals/EditLevelFormModal';
import AddLevelFormModal from '@/Designs/Modals/AddLevelFormModal';
import { useGetAllLevels } from '@/Utils/customHooks';
import { LevelCRUDUrl } from '@/Utils/Config';

const Levels = () => {
    const [ fetching, setFetching ] = useState<boolean>(false)
    const [ record, setRecord ] = useState<LevelProps | null>(null)
    const [ levels, setLevels ] = useState<LevelProps[]>([])
    const [ levelsData, setLevelsData ] = useState<LevelProps[]>([])
    const [ addLevelFormModal, setAddLevelFormModal ] = useState<boolean>(false)
    const [ editLevelFormModal, setEditLevelFormModal ] = useState<boolean>(false)
    const [ deleteLevelFormModal, setDeleteLevelFormModal ] = useState<boolean>(false)

    useGetAllLevels(setLevels, setFetching);
    useEffect(() => {
        setLevelsData(levels)
    }, [levels])
    const reset = () => {
        setFetching(true)
        getAllLevels(setLevels, setFetching)
    }
    const TableComp:FC = () => (
        <Table
            aria-label="simple table"
            sx={{
                whiteSpace: "nowrap",
                mt: 0,
            }}
        >
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Level
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Date Created
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
                {levelsData.map((item: LevelProps) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: "500",
                                }}
                            >
                                {item.level}
                            </Typography>
                        </TableCell>


                        <TableCell>
                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                {item.created_at}
                            </Typography>
                        </TableCell>
                        <TableCell align='center'>
                            <Stack justifyItems="center" direction="row" spacing={1} justifyContent="center">
                                <Button onClick={() => {setRecord(item); setEditLevelFormModal(true)}} variant="contained" disableElevation color="primary">
                                    Edit
                                </Button>
    
                                <Button onClick={() => {setRecord(item); setDeleteLevelFormModal(true)}} variant="contained" disableElevation color="primary">
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
        title={"Levels Section"}
        buttonReset={<MyButtonReload fetching={fetching} reset={reset} />}
        buttonAdd={<MyButtonAdd setAddItem={setAddLevelFormModal} />}
        table={<TableComp />}
    />

    <AddLevelFormModal
        showModal={addLevelFormModal}
        setShowModal={setAddLevelFormModal}
        reset={reset}
    />

    <EditLevelFormModal
        showModal={editLevelFormModal} 
        setShowModal={setEditLevelFormModal}
        record={record}
        reset={reset} 
    />

    <DeleteItemFormModal
        showModal={deleteLevelFormModal}
        setShowModal={setDeleteLevelFormModal}
        record_name={record?.level.toString()}
        record={record}
        reset={reset}
        url={LevelCRUDUrl}
    />

  </>)
}

export default Levels