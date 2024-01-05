'use client';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import DashboardCard from '@/components/CompAdmin/shared/DashboardCard';
import { nowYear } from '@/Utils/constants';
import { useEffect, useState } from 'react';
import { UserProfileCountsTwoType,  } from '@/Utils/types';
import { getDataKpi } from '@/Utils/pagination';
import { KpiUserProfileCountsTwoUrl } from '@/Utils/Config';


const ProductPerformance = () => {
    const [ userProfileCount, setUserProfileCount ] = useState<UserProfileCountsTwoType>();
    const [ count, setCount ] = useState<number>(0)
    const [ columns, setColumns ] = useState([ 
        {
            id: "Specialty",
            name: "Specialty",
            width: 600
        }
    ])
    const [ fetcthing, setFetching ] = useState<boolean>(true)

    useEffect(() => {
        if (count == 0) {
            getDataKpi(setUserProfileCount, setFetching, KpiUserProfileCountsTwoUrl);
            setCount(count + 1);
        }
        if (count == 1) {
            if (userProfileCount) {
                userProfileCount?.academic_years.forEach(year => {
                    columns.push({
                        id: year,
                        name: year,
                        width: 400
                    })
                });
                setCount(count + 1)
            }
        }
        if (count == 2) {
            // setCount(count + 1)
        }
    }, [count, userProfileCount, columns])

    return (

        <DashboardCard title="Last 6 Year Overview" loading={false}>
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            {columns.map((item) => (
                                <TableCell key={item.id}>
                                    <Typography variant="subtitle2" fontWeight={item.width}>
                                        {item.name}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userProfileCount?.list?.map((prof: Object, index: number) => {                
                            return (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {Object.keys(prof)}
                                        </Typography>
                                    </TableCell>
                                    { Object.values(prof)[0].map((item:any, index: number) => { 
                                        return (<TableCell key={index}>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {Object.values(item)}
                                            </Typography>
                                        </TableCell>
                                    )})}
                                </TableRow>
                        )}
                        )}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default ProductPerformance;
