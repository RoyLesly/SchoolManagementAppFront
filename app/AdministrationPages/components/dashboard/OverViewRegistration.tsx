import React, { useEffect, useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/components/CompAdmin/shared/DashboardCard';
import dynamic from "next/dynamic";
import { nowYear } from '@/Utils/constants';
import { UserProfile } from '@/Utils/types';
import { getAllUserProfiles } from '@/Utils/functions';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


const OverViewRegistration = () => {
    // select
    const Yaxis = Array(nowYear - (nowYear - 6)).fill('').map((v, index) => nowYear - index).reverse()
    const [month, setMonth] = React.useState('1');
    const [ count, setCount ] = useState<number>(1);
    const [ profiles, setProfiles ] = useState<UserProfile[]>([])
    const [ profilesRegisteredCount, setProfilesRegisteredCount ] = useState<number[]>([])

    useEffect(() => {
        let data: any = []
        if (count == 1) {
            console.log(count, "count")
            getAllUserProfiles(setProfiles, () => {}, { searchField: "created_at__year__gte", value: nowYear - 6, kpi: true});
            setCount(count + 1)
        }
        if (profiles.length > 0) {
            if (count == 2) {
                console.log(count, "count")
                Yaxis.forEach((year) => {
                    const fil = profiles.filter((item: UserProfile) => item.created_at.includes((year).toString())).length
                    data.push(fil)
                    console.log(profiles, fil, year)
                });
                setCount(count + 1)
                setProfilesRegisteredCount(data)
            }
            if (count == 3) {
                console.log(count, "count")
                setCount(count + 1)
            }
        }


    }, [ count, profiles, Yaxis ])
    console.log(profiles)


    const handleChange = (event: any) => {
        setMonth(event.target.value);
    };

    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    // chart
    const optionscolumnchart: any = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 270,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },

        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
          },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        xaxis: {
            categories: Yaxis,
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };
    const seriescolumnchart: any = [
        {
            name: 'Students Per Year',
            data: profilesRegisteredCount
        },
        // {
            // name: 'Expense this month',
            // data: [10, 20, 5, 15, 5, 10, 20, 25],
        // },
    ];

    console.log(profilesRegisteredCount)

    return (

        <DashboardCard title="Registered Students Overview" action={
            <Select
                labelId="month-dd"
                id="month-dd"
                value={month}
                size="small"
                onChange={handleChange}
            >
                <MenuItem value={1}>March 2023</MenuItem>
                <MenuItem value={2}>April 2023</MenuItem>
                <MenuItem value={3}>May 2023</MenuItem>
            </Select>
        }>
            <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height="370px"
            />
        </DashboardCard>
    );
};

export default OverViewRegistration;
