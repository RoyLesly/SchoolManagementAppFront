'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/AdministrationPages/components/container/PageContainer';
// components
import SalesOverview from '@/app/AdministrationPages/components/dashboard/SalesOverview';
const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            DASHBOARD
          </Grid>
          <Grid item xs={12} lg={8}>
                <SalesOverview />
              </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                DASHBOARD
              </Grid>
              
              <Grid item xs={12}>
                DASHBOARD
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            DASHBOARD
          </Grid>
          <Grid item xs={12} lg={8}>
            DASHBOARD
          </Grid>
          <Grid item xs={12}>
            DASHBOARD
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