'use client';
import { Box, Typography, styled } from '@mui/material'
import React, { FC } from 'react'
import AcademicBlockFor1YearsTranscript from './AcademicBlockFor1YearsTranscript';
import { ResultProps } from '@/Utils/types';


const Item = styled(Typography)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0.3),
    textAlign: "left",
    fontSize: 10,
}))


interface TranscriptBody1yearsProps {
  data: ResultProps[]
}
const TranscriptBody1years:FC<TranscriptBody1yearsProps> = ({ data }) => {
  console.log(data)
  const filtSems = data.map((item: ResultProps) => item.course.semester)
  const semesters = [...new Set(filtSems)]
  console.log(semesters)
  return (
    <Box sx={{ height: '61%'}} mx={0.3}>
      {semesters.length > 1 ? <>
        <Box sx={{ height: '50%'}} mt={0.1} mb={0.1}>
          <AcademicBlockFor1YearsTranscript title={semesters[0]} data={data.filter((item: ResultProps) => item.course.semester == semesters[0])} />
        </Box>
        <Box sx={{ height: '50%'}} mt={0.1} mb={0.1}>
          <AcademicBlockFor1YearsTranscript title={semesters[1]} data={data.filter((item: ResultProps) => item.course.semester == semesters[1])} />
        </Box>
      </>
        :
      <Box sx={{  }} mx={4} justifyContent="center" alignItems="center" pt={20}>
        <Typography variant='h4'>Results Should Contain At least 2 Semesters</Typography>
      </Box>}
    </Box>
  )
}

export default TranscriptBody1years