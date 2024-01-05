'use client';
import React, { FC, useEffect, useState } from 'react';
import MyTableCard from '@/Designs/Tables/MyTableCard'
import {
    Typography, 
    Table, TableBody, TableCell, TableHead, TableRow,
    Button, Stack,
} from '@mui/material';
import { LevelProps } from '@/Utils/types';
import MyButtonAdd from '@/Designs/MyButtonAdd';
import EditLevelFormModal from '@/Designs/Modals/EditLevelFormModal';
import AddLevelFormModal from '@/Designs/Modals/AddLevelFormModal';
import { LevelCRUDUrl, PageLevelCRUDUrl } from '@/Utils/Config';
import MyButtonLoader from '@/Designs/MyButtonLoader';
import { getData } from '@/Utils/pagination';
import DeleteItemFormModal from '@/Designs/Modals/DeleteItemFormModal';

const Levels = () => {
    const [ fetching, setFetching ] = useState<boolean>(true)
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ count, setCount ] = useState<number>(0)
    const [ record, setRecord ] = useState<LevelProps | null>(null)
    const [ levels, setLevels ] = useState<LevelProps[]>([])
    const [ levelsData, setLevelsData ] = useState<LevelProps[]>([])
    const [ addLevelFormModal, setAddLevelFormModal ] = useState<boolean>(false)
    const [ editLevelFormModal, setEditLevelFormModal ] = useState<boolean>(false)
    const [ deleteLevelFormModal, setDeleteLevelFormModal ] = useState<boolean>(false)

    useEffect(() => {
        if (count == 0) {
            getData(setLevels, setFetching, ()=>{}, ()=>{}, ()=>{}, PageLevelCRUDUrl + "?page=" + 1)
            setLevelsData(levels);
            setCount(count + 1);
        } 
        if (count == 1) {
            if (levels.length > 0) {
                setLevelsData(levels);
                setCount(count + 1);
                setLoading(false)
            }
        }      
    }, [levels, levelsData, count])
    const reset = () => {
        setFetching(true)
        getData(setLevels, setFetching, ()=>{}, ()=>{}, ()=>{}, PageLevelCRUDUrl + "?page=" + 1)
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
        buttonReset={<MyButtonLoader fetching={fetching} loadingText='Loading' info={levelsData.length} onClick={reset} />  }
        buttonAdd={<MyButtonAdd setAddItem={setAddLevelFormModal} />}
        table={<TableComp />}
        loading={loading}
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