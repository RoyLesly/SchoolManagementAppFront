'use client';
import { LogoUrl } from '@/Utils/Config'
import { ResultProps } from '@/Utils/types';
import { Box, Grid, Typography, styled } from '@mui/material'
import Image from 'next/image'
import React, { FC } from 'react'

const ItemHeader1 = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.3),
  fontSize: 12,
}))

const Item = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.3),
  textAlign: "left",
  fontSize: 12,
}))

interface TranscriptHeaderProps {
  data: ResultProps
}

const TranscriptHeader:FC<TranscriptHeaderProps> = ({ data}) => {
  return (
    <>
      <Box
        gap={4}
        sx={{ 
          display: "flex", 
          justifyContent: "space-between",
        }}
      >
        <Grid container direction="column" spacing={0} xs={5.7} p={0} m={0}>
          <Grid item p={0} my={0}><Typography sx={{ fontSize: 14}}>ST.JOAN HIGHER INSTITUTE - SAJOHIM</Typography></Grid>
          <Grid item p={0} my={0}><ItemHeader1>N0: 23-0146/L/MINESUP/SG/DDES/ESUP/SDA/ANAP</ItemHeader1></Grid>
          <Grid item p={0} my={0}><ItemHeader1>P.O. Box: 13547, Yaounde, Centre, Cameroon</ItemHeader1></Grid>
          <Grid item p={0} my={0}><ItemHeader1>Email: st.joan.info@gmail.com</ItemHeader1></Grid>
        </Grid>

        <Grid container justifyContent="center" spacing={0} xs={1.3} p={0} m={0}>
          <Image alt='LOGO' src={LogoUrl} width={130} height={130}/>
        </Grid>

        <Grid container direction="column" spacing={0} xs={5}>
          <Grid container justifyContent="center" textAlign="center" spacing={0} mx="auto" xs={9.1}>
            <Grid item p={0} my={-0.1}><Typography sx={{ fontSize: 11}}>REPUBLIC OF CAMEROON</Typography></Grid>
            <Grid item p={0} my={-0.1}><ItemHeader1>Peace - Work - Fatherland</ItemHeader1></Grid>
            <Grid item p={0} my={-1}><ItemHeader1>=================</ItemHeader1></Grid>
            <Grid item p={0} my={-0.1}><ItemHeader1>Ministry of Higher Education</ItemHeader1></Grid>
          </Grid>
        </Grid>
      </Box>

      <Box mx={2} my={2}>
        <Box textAlign="center">
            <Typography sx={{ fontSize: 15, marginBottom: 2 }}>STUDENT ACADEMIC TRANSCRIPT</Typography>
        </Box>
        <Grid container spacing={0}>
            <Grid xs={6}>
                <Box display="flex" justifyContent="space-around">
                <Grid container direction="column" spacing={0} xs={4}>
                    <Grid item p={0} my={0}><Item>Student Name:</Item></Grid>
                    <Grid item p={0} my={0}><Item>Date of Birth:</Item></Grid>
                    <Grid item p={0} my={0}><Item>Place of Birth:</Item></Grid>
                    <Grid item p={0} my={0}><Item>Gender:</Item></Grid>
                </Grid>
                <Grid container direction="column" spacing={0} xs={8}>
                    <Grid item p={0} my={0}><Item>{data.student.user.first_name} {data.student.user.last_name}</Item></Grid>
                    <Grid item p={0} my={0}><Item>{data.student.user.dob}</Item></Grid>
                    <Grid item p={0} my={0}><Item>{data.student.user.address}</Item></Grid>
                    <Grid item p={0} my={0}><Item>{data.student.user.sex}</Item></Grid>
                </Grid>
                </Box>
            </Grid>
            <Grid xs={6}>
                <Box display="flex" justifyContent="space-around">
                <Grid container direction="column" spacing={0} xs={5}>
                    <Grid item p={0} my={0}><Item>Registration Number:</Item></Grid>
                    <Grid item p={0} my={0}><Item>Domain:</Item></Grid>
                    <Grid item p={0} my={0}><Item>Field / Specialty:</Item></Grid>
                    <Grid item p={0} my={0}><Item>Level:</Item></Grid>
                </Grid>
                <Grid container direction="column" spacing={0} xs={7}>
                    <Grid item p={0} my={0}><Item>{data.student.user.matricle}</Item></Grid>
                    <Grid item p={0} my={0}><Item>{data.course.specialty.main_specialty.domain.domain_name}</Item></Grid>
                    <Grid item p={0} my={0}><Item>{data.course.specialty.main_specialty.specialty_name}</Item></Grid>
                    <Grid item p={0} my={0}><Item>{data.course.specialty.level.level}</Item></Grid>
                </Grid>
                </Box>
            </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default TranscriptHeader