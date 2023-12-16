import React, { FC } from 'react'
import {
    Box, Grid, 
} from '@mui/material';
import DashboardCard from '@/components/CompAdmin/shared/DashboardCard';



interface MyTableCardProps {
    title: string
    buttonAdd?: any
    buttonReset?: any
    table: any
    extra?: any
    search?: any
}
const MyTableCard:FC<MyTableCardProps> = ({ title, table, buttonAdd, buttonReset, extra, search }) => {
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
                <Grid item xs={12}>
                    {table}
                </Grid>
            </Grid>
        </Box>
    </DashboardCard>
  )
}

export default MyTableCard