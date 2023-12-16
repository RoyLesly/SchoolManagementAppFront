import MyReactTanstackTable from '@/Designs/MyReactTanstackTable'
import { Box, Typography } from '@mui/material'
import React from 'react'

const AcademicBlockFor3YearsTranscript = () => {
  return (
    <Box sx={{ height: '50%'}} mx={3} mt={0} mb={0}>
    <Box textAlign="center" m={-0.5}>
        <Typography sx={{ fontSize: 11, margin: 0 }}>ACADEMIC YEAR 1 (2021/2022)</Typography>
        <MyReactTanstackTable />
    </Box>
</Box>
  )
}

export default AcademicBlockFor3YearsTranscript