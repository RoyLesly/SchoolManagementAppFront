import React, { useEffect, useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/components/CompAdmin/shared/DashboardCard';
import dynamic from "next/dynamic";
import { nowYear } from '@/Utils/constants';
import { UserProfile, UserType } from '@/Utils/types';
import { getAllUserProfiles, getAllUsers } from '@/Utils/functions';
import { getDataListKpi } from '@/Utils/pagination';
import { KpiYearlyModelCountList } from '@/Utils/Config';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


const OverViewRegistration = () => {
    // select
    const Yaxis = Array(nowYear - (nowYear - 6)).fill('').map((v, index) => ((nowYear - index) + "/" + (nowYear - index + 1))).reverse()
    const [month, setMonth] = React.useState('1');
    const [ count, setCount ] = useState<number>(0);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ fetching, setFetching ] = useState<boolean>(true);
    const [ profilesListData, setProfilesListData ] = useState<any>([])
    const [ usersListData, setUsersListData ] = useState<any>([])
    const [ xAxis, setXAxis ] = useState<string[]>([])
    const [ profilesRegisteredCount, setProfilesRegisteredCount ] = useState<number[]>([])
    const [ usersRegisteredCount, setUsersRegisteredCount ] = useState<number[]>([])


    useEffect(() => {
        if (count == 0) {
            getDataListKpi(setProfilesListData, setFetching, KpiYearlyModelCountList, { model: "UserProfile" })
            getDataListKpi(setUsersListData, setFetching, KpiYearlyModelCountList, { model: "CustomUser" })
            setCount(count + 1)
        }
        if (count == 1) {
            if (profilesListData.length > 0) {
                setLoading(false);
                setProfilesRegisteredCount(profilesListData[1])
                setXAxis(profilesListData[0])
                setCount(count + 1);
            }
        }
        if (count == 2) {
            let l = []
            if (usersListData.length > 0) {
                l = profilesListData[0].forEach((item: any, index: number) => {
                    if (item.includes(usersListData[0][index])) {
                        console.log(usersListData[0])
                    }
                });
                setLoading(false);
                setUsersRegisteredCount(usersListData[1])
                // setCount(count + 1);
            }
        }
    }, [ count, profilesListData, usersListData ])


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
            height: 200,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '90%',
                columnWidth: '22%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },

        stroke: {
            show: true,
            width: 2,
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
            tickAmount: 3,
        },
        xaxis: {
            categories: xAxis,
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
        // {
            // name: 'Students Per Year',
            // data: usersRegisteredCount
        // },
        {
            name: 'Profiles Per Year',
            data: profilesRegisteredCount
        },
        {
            name: 'Profiles Per Year',
            data: profilesRegisteredCount
        },
    ];

    return (

        <DashboardCard loading={loading} title="Registered Students Overview" action={
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
