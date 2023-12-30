'use client';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import DashboardCard from '@/components/CompAdmin/shared/DashboardCard';
import { nowYear } from '@/Utils/constants';
import { useEffect, useState } from 'react';
import { MainSpecialtyProps, SpecialtyProps, UserProfile } from '@/Utils/types';
import { getAllMainSpecialties, getAllSpecialties, getAllUserProfiles } from '@/Utils/functions';

const products = [
    {
        id: "1",
        name: "Sunil Joshi",
        post: "Web Designer",
        pname: "Elite Admin",
        priority: "Low",
        pbg: "primary.main",
        budget: "3.9",
    },
    {
        id: "2",
        name: "Andrew McDownland",
        post: "Project Manager",
        pname: "Real Homes WP Theme",
        priority: "Medium",
        pbg: "secondary.main",
        budget: "24.5",
    },
    {
        id: "3",
        name: "Christopher Jamil",
        post: "Project Manager",
        pname: "MedicalPro WP Theme",
        priority: "High",
        pbg: "error.main",
        budget: "12.8",
    },
    {
        id: "4",
        name: "Nirav Joshi",
        post: "Frontend Engineer",
        pname: "Hosting Press HTML",
        priority: "Critical",
        pbg: "success.main",
        budget: "2.4",
    },
];


const ProductPerformance = () => {
    const Yaxis = Array(nowYear - (nowYear - 6)).fill('').map((v, index) => nowYear - index).reverse()
    const [ mainSpecialty, setMainSpecialty ] = useState<MainSpecialtyProps[]>([])
    const [ profiles, setProfiles ] = useState<UserProfile[]>([])
    const [ count, setCount ] = useState<number>(1)
    const [ data, setData ] = useState([{
        id: 0,
        specialty: ""
    }])

    useEffect(() => {
        if (count == 1) {
            getAllMainSpecialties(setMainSpecialty, ()=>{})
            if (mainSpecialty.length > 0) { setCount(count + 1); }
        }
        if (count == 2) {
            getAllUserProfiles(setProfiles, ()=>{}, { searchField: "user__role", value: "student" })
            if (profiles.length > 0) { setCount(count + 1); }
        }
        if (count == 3) {
            const d = []
            if (mainSpecialty.length > 0) {
                
                for (let index = 0; index < mainSpecialty.length; index++) {
                    let record: any = {}
                    const ms = mainSpecialty[index];
                    const prof = profiles.filter((item: UserProfile) => item?.specialty?.main_specialty.id == ms.id);
                    record["id"] = ms.id;
                    record["specialty"] = ms.specialty_name;
                    for (let index = 0; index < Yaxis.length; index++) {
                        const year = Yaxis[index];
                        record[year] = prof.filter((item: UserProfile) => item.created_at.includes(year.toString())).length;
                    }
                    d.push(record)
                }
                setData(d)
                setCount(count + 1)
            }
        }
        if (count == 4) {
            setCount(count + 1)
        }
    }, [count, Yaxis, mainSpecialty, profiles])

    const column = [
        {
            id: "Specialty",
            name: "Specialty",
            width: 600
        }
    ]

    const c = Yaxis.map(item => column.push({
        id: item.toString(),
        name: item.toString(),
        width: 400
    }))

    return (

        <DashboardCard title="Last 6 Year Overview">
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
                            {column.map((item) => (
                                <TableCell key={item.id}>
                                    <Typography variant="subtitle2" fontWeight={item.width}>
                                        {item.name}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((prof: any) => (
                            <TableRow key={prof?.id}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {prof?.specialty}
                                    </Typography>
                                </TableCell>
                                {Yaxis.map(item => (<TableCell key={item}>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {prof[item]}
                                    </Typography>
                                </TableCell>))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default ProductPerformance;
