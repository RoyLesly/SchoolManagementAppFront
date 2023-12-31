'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/AdministrationPages/components/container/PageContainer';
// components
import { useDispatch } from 'react-redux';
import { removeChoosenCourse, removeChoosenDomain, removeChoosenSpecialty } from '@/Redux/Reducers/sliceDomainSpecialityCourse';
import { removeChoosenUser, removeChoosenUserProfile } from '@/Redux/Reducers/sliceChoosenUserAndProfile';
import DashboardCard from '@/components/CompAdmin/shared/DashboardCard';
import { useState, useEffect } from 'react';
import { UserType } from '@/Utils/types';
import { getAllUsers } from '@/Utils/functions';
import { nowYear } from '@/Utils/constants';
import RecentTransactions from '@/components/CompAdmin/dashboard/RecentTransactions';
import YearlyBreakup from '@/components/CompAdmin/dashboard/YearlyBreakup';
import OverViewRegistration from './components/dashboard/OverViewRegistration';
import ProductPerformance from './components/dashboard/ProductPerformance';
const Dashboard = () => {

  const dispatch = useDispatch();
  dispatch(removeChoosenCourse());
  dispatch(removeChoosenDomain());
  dispatch(removeChoosenUser());
  dispatch(removeChoosenUserProfile());
  dispatch(removeChoosenSpecialty());

  const [ count, setCount ] = useState(1);
  const [ totalUsers, setTotalUsers ] = useState<UserType[]>([]);
  const [ totalLecturers, setTotalLecturers ] = useState<UserType[]>([]);
  const [ totalStudents, setTotalStudents ] = useState<UserType[]>([]);
  const [ totalActiveUsers, setTotalActiveUsers ] = useState<UserType[]>([]);

  useEffect(() => {
    if (count == 1) {
      getAllUsers(setTotalUsers, () => {})
      setCount(count + 1)
    }
    if (count == 2) {
      getAllUsers(setTotalLecturers, () => {}, { searchField: "role", value: "teacher"});
      setCount(count + 1);
    }
    if (count == 3) {
      getAllUsers(setTotalStudents, () => {}, { searchField: "role", value: "student"})
      setCount(count + 1)
    }
    if (count == 4) {
      getAllUsers(setTotalActiveUsers, () => {}, { searchField: "is_active", value: true })
      setCount(count + 1)
    }
  }, [ count ])



  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box p={1}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={3}>
            <DashboardCard loading={false} title='All Users' count={totalUsers.length} cardColor='pink'/>
          </Grid>
          <Grid item xs={12} md={3}>
            <DashboardCard loading={false} title='All Lecturers' count={totalLecturers.length} cardColor='pink'/>
          </Grid>
          <Grid item xs={12} md={3}>
            <DashboardCard loading={false} title='All Students' count={totalStudents.length} cardColor='pink'/>
          </Grid>
          <Grid item xs={12} md={3}>
            <DashboardCard loading={false} title='Active Users' count={totalActiveUsers.length} cardColor='pink'/>
          </Grid>

          <Grid item xs={12}>
            <OverViewRegistration />
          </Grid>
{/* 
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} style={{ height: "100%"}}>
                <DashboardCard title='Domains' />
              </Grid>
              
              <Grid item xs={12}>
                <DashboardCard title='Domains' />
              </Grid>
            </Grid>
          </Grid> */}

          <Grid item xs={12}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <DashboardCard loading={false} title='Domains' cardColor='teal' />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
