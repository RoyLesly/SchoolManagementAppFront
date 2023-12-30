'use client';
import React, { FC, useEffect, useState } from 'react';
import MyTableCard from '@/Designs/MyTableCard'
import {
    Typography, Table, TableBody, TableCell, TableHead, TableRow, Input,
} from '@mui/material';
import { PermissionsProps } from '@/Utils/types';
import MyButtonReload from '@/Designs/MyButtonReload';
import { getPermissions } from '@/Utils/functions';
import { useGetPermissions } from '@/Utils/customHooks';

const Permissions = () => {
    const [ fetching, setFetching ] = useState<boolean>(false)
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ permissions, setPermissions ] = useState<PermissionsProps[]>([])
    const [ permissionsData, setPermissionsData ] = useState<PermissionsProps[]>([])

    useGetPermissions(setPermissions, setFetching);
    useEffect(() => {
        setPermissionsData(permissions)
    }, [permissions])
    const reset = () => {
        getPermissions(setPermissions, setFetching)
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
                            Name
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Action
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Content Type
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {permissionsData.map((item: PermissionsProps) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: "500",
                                }}
                            >
                                {item.name}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: "500",
                                }}
                            >
                                {item.codename}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: "500",
                                }}
                            >
                                {item.content_type.app_label}
                            </Typography>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
  return (<>

    <MyTableCard
        title={"Permissions Section"}
        buttonReset={<MyButtonReload fetching={fetching} reset={reset} />}
        // buttonAdd={<MyButtonAdd setAddItem={setAddPermissionFormModal} />}
        buttonAdd={<Input />}
        table={<TableComp />}
        loading={loading}
    />
  </>)
}

export default Permissions