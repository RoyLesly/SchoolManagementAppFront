import React, { FC } from 'react'
import {
    Box, Grid, LinearProgress, 
} from '@mui/material';
import DashboardCard from '@/components/CompAdmin/shared/DashboardCard';



interface MyTableCardProps {
    title: string
    buttonAdd?: any
    buttonReset?: any
    table: any
    extra?: any
    search?: any
    loading: boolean
}
const MyTableCard:FC<MyTableCardProps> = ({ title, table, buttonAdd, buttonReset, extra, search, loading }) => {
  return (
    <DashboardCard title={`${title}`}>
        <Box sx={{ overflow: 'auto', width: { xs: '380px', sm: 'auto' } }}>
            <Grid container spacing={0}>
                <Grid item xs={12} spacing={1}>
                    {buttonReset}
                    {buttonAdd}
                    {extra}
                    {search}
                </Grid>
                {loading ? 
                    <div style={{ flex: 1, alignItems: "center", textAlign: "center", justifyContent: "center", fontSize: "30", paddingTop: 50, paddingBottom: 70, paddingLeft: 60, paddingRight: 25 }}>
                        Data Loading <LinearProgress style={{ marginTop: 30, padding: 5 }}/>
                    </div> 
                    
                    : 
                    
                    <Grid item xs={12}>
                        {table}
                    </Grid>
                }
            </Grid>
        </Box>
    </DashboardCard>
  )
}

export default MyTableCard