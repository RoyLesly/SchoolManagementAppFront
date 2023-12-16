'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/components/CompAdmin/container/PageContainer';
// components
import SalesOverview from '@/components/CompAdmin/dashboard/SalesOverview';
import YearlyBreakup from '@/components/CompAdmin/dashboard/YearlyBreakup';
import RecentTransactions from '@/components/CompAdmin/dashboard/RecentTransactions';
import ProductPerformance from '@/components/CompAdmin/dashboard/ProductPerformance';
import Blog from '@/components/CompAdmin/dashboard/Blog';
import MonthlyEarnings from '@/components/CompAdmin/dashboard/MonthlyEarnings';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
