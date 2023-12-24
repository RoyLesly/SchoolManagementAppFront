'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/AdministrationPages/components/container/PageContainer';
// components
import SalesOverview from '@/app/AdministrationPages/components/dashboard/SalesOverview';
import { useDispatch } from 'react-redux';
import { removeChoosenCourse, removeChoosenDomain, removeChoosenSpecialty } from '@/Redux/Reducers/sliceDomainSpecialityCourse';
import { removeChoosenUser, removeChoosenUserProfile } from '@/Redux/Reducers/sliceChoosenUserAndProfile';
import DashboardCard from '@/components/CompAdmin/shared/DashboardCard';
import { useState, useEffect } from 'react';
import { UserType } from '@/Utils/types';
import { getAllUsers } from '@/Utils/functions';
import BlankCard from '@/components/CompAdmin/shared/BlankCard';
import OverViewRegistration from './components/dashboard/OverViewRegistration';
import { nowYear } from '@/Utils/constants';
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
            <DashboardCard title='All Users' count={totalUsers.length} />
          </Grid>
          <Grid item xs={12} md={3}>
            <DashboardCard title='All Lecturers' count={totalLecturers.length} />
          </Grid>
          <Grid item xs={12} md={3}>
            <DashboardCard title='All Students' count={totalStudents.length} />
          </Grid>
          <Grid item xs={12} md={3}>
            <DashboardCard title='Active Users' count={totalActiveUsers.length} />
          </Grid>

          <Grid item xs={12} lg={8}>
            <OverViewRegistration />
          </Grid>

          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} style={{ height: "100%"}}>
                <DashboardCard title='Domains' />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <DashboardCard title='Domains' />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={8}>
            <DashboardCard title='Table' />
          </Grid>
          <Grid item xs={12} lg={4}>
            <DashboardCard title='Domains' />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
    // <PageContainer title="Dashboard" description="this is Dashboard">
    //   <Box>
    //     <Grid container spacing={3}>
    //       <Grid item xs={12} lg={8}>
    //         <SalesOverview />
    //       </Grid>
    //       <Grid item xs={12} lg={4}>
    //         <Grid container spacing={3}>
    //           <Grid item xs={12}>
    //             <YearlyBreakup />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <MonthlyEarnings />
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //       <Grid item xs={12} lg={4}>
    //         <RecentTransactions />
    //       </Grid>
    //       <Grid item xs={12} lg={8}>
    //         <ProductPerformance />
    //       </Grid>
    //       <Grid item xs={12}>
    //         <Blog />
    //       </Grid>
    //     </Grid>
    //   </Box>
    // </PageContainer>
  )
}

export default Dashboard;
