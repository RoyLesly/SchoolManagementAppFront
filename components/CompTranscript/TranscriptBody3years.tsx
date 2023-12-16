'use client';
import { Box, Grid, Typography, styled } from '@mui/material'
import React from 'react'
import AcademicBlockFor3YearsTranscript from './AcademicBlockFor3YearsTranscript';


const Item = styled(Typography)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0.3),
    textAlign: "left",
    fontSize: 10,
}))

const TranscriptBody3years = () => {
  return (
    <Box sx={{ height: '55%'}} mx={3} mt={0.1} mb={0.2}>
        <Box sx={{ height: '33%'}} mx={3} mt={0.1} mb={0.2}>
            <AcademicBlockFor3YearsTranscript />
        </Box>
        <Box sx={{ height: '33%'}} mx={3} mt={0.1} mb={0.2}>
            <AcademicBlockFor3YearsTranscript />
        </Box>
        <Box sx={{ height: '33%'}} mx={3} mt={0.1} mb={0.2}>
            <AcademicBlockFor3YearsTranscript />
        </Box>
    </Box>
  )
}

export default TranscriptBody3years