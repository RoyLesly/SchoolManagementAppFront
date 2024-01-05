'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/AdministrationPages/components/container/PageContainer';
// components
import { useDispatch } from 'react-redux';
import { removeChoosenCourse, removeChoosenDomain, removeChoosenSpecialty } from '@/Redux/Reducers/sliceDomainSpecialityCourse';
import { removeChoosenUser, removeChoosenUserProfile } from '@/Redux/Reducers/sliceChoosenUserAndProfile';
import DashboardCard from '@/components/CompAdmin/shared/DashboardCard';
import { useState, useEffect } from 'react';
import { CustomUserCountsType, UserType } from '@/Utils/types';
import { getAllUsers } from '@/Utils/functions';
import { nowYear } from '@/Utils/constants';
import OverViewRegistration from './components/dashboard/OverViewRegistration';
import ProductPerformance from './components/dashboard/ProductPerformance';
import { getData, getDataKpi } from '@/Utils/pagination';
import { KpiCustomUserCountsUrl, KpiUserControlUrl, UserCRUDUrl } from '@/Utils/Config';
const Dashboard = () => {

  const dispatch = useDispatch();
  dispatch(removeChoosenCourse());
  dispatch(removeChoosenDomain());
  dispatch(removeChoosenUser());
  dispatch(removeChoosenUserProfile());
  dispatch(removeChoosenSpecialty());

  const [ fetching, setFetching ] = useState<boolean>(true);
  const [ count, setCount ] = useState(0);
  const [ customUserCounts, setCustomUserCounts ] = useState<CustomUserCountsType>({
      all_users: 0,
      admin_users: 0,
      lecturer_users: 0,
      student_users: 0,
      active_users: 0,
      non_active_users: 0
  });

  useEffect(() => {
    if (count == 0) {
      getDataKpi(setCustomUserCounts, setFetching, KpiCustomUserCountsUrl)
      setCount(count + 1)
    }
  }, [ count ])



  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box p={1}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={3}>
            <DashboardCard loading={fetching} title='All Users' count={customUserCounts.all_users} cardColor='orange'/>
          </Grid>
          <Grid item xs={12} md={3}>
            <DashboardCard loading={fetching} title='All Lecturers' count={customUserCounts.lecturer_users} cardColor='green'/>
          </Grid>
          <Grid item xs={12} md={3}>
            <DashboardCard loading={fetching} title='All Students' count={customUserCounts.student_users} cardColor='purple'/>
          </Grid>
          <Grid item xs={12} md={3}>
            <DashboardCard loading={fetching} title='Active Users' count={customUserCounts.active_users} cardColor='red'/>
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
