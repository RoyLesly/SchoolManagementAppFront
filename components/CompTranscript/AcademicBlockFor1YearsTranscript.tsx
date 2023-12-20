import MyReactTanstackTable from '@/Designs/MyReactTanstackTable'
import TableTanstack1 from '@/Designs/TableTanstack1'
import TableTanstack2 from '@/Designs/TableTanstack2'
import { Box, Typography } from '@mui/material'
import React from 'react'

const AcademicBlockFor1YearsTranscript = (props: any) => {
  return (
    <Box sx={{ height: '50%'}} mx={0} mt={0} mb={0}>
      <Box textAlign="center" m={-0.5}>
          <Typography sx={{ fontSize: 13, margin: 0 }}>SEMESTER {props.title}</Typography>
          <TableTanstack2 data={props.data} />
      </Box>
  </Box>
  )
}

export default AcademicBlockFor1YearsTranscript