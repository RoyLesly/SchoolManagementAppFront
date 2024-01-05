import { nowYear } from '@/Utils/constants'
import { DomainProps, ResultProps, SpecialtyProps } from '@/Utils/types'
import { Box, Grid, LinearProgress, Stack, Typography } from '@mui/material'
import { Table } from 'antd'
import React, { FC } from 'react'


interface Page2BySpecialty1ThisYearProps {
    resultsData: ResultProps[]
    storeChoosenDomain: DomainProps,
    specialtyListData: SpecialtyProps[],
    COLUMNS_SPECIALTIES: any,
}
const Page2BySpecialty1ThisYear:FC<Page2BySpecialty1ThisYearProps> = ({ resultsData, storeChoosenDomain, specialtyListData, COLUMNS_SPECIALTIES }) => {
  return (
    <div>
        {(storeChoosenDomain.id > 0 && specialtyListData.length > 0) ? [`${nowYear-1 + "/" + nowYear}`, `${nowYear + "/" + (nowYear + 1)}`].map((item: string) => (
            <Grid item xs={12} key={item} alignContent="center" justifyContent="center" alignItems="center">
                <Stack alignContent="center">
                    <Grid 
                        item xs={12}
                        marginBottom={1}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        >
                        <Typography variant='h5'>SPECIALTIES FOR {nowYear}</Typography>
                    </Grid>

                    <Box sx={{ textAlign: "center", paddingBottom: 1, alignItems: "center", alignContent: "center" }}>
                        <Typography variant='h5' color={"error"}>{item}</Typography>
                    </Box>
                    <Box>
                        <Table
                            dataSource={specialtyListData.filter((item2: SpecialtyProps) => {if (item2?.academic_year.includes(item.toString())) {return item2}})}
                            columns={COLUMNS_SPECIALTIES}  
                            className={`${resultsData.filter((item2: ResultProps) => {if (item2?.course.specialty.academic_year.includes(item.toString())) {return item2}}).length < 1 ? "hidden" : ""}`}
                        />
                    </Box>
                </Stack>
            </Grid>
            )) : <></>
        }
    </div>
  )
}

export default Page2BySpecialty1ThisYear