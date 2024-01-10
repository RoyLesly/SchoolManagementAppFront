import { currentAcademicYear, nowYear } from '@/Utils/constants'
import { DomainOptimizedType, SpecialtyOptimizedType } from '@/Utils/types'
import { Box, Grid, Stack, Typography } from '@mui/material'
import { Table } from 'antd'
import React, { FC, useEffect, useState } from 'react'


interface Page2BySpecialty1ThisYearProps {
    storeChoosenDomain: DomainOptimizedType | any,
    specialtyList: SpecialtyOptimizedType[],
    setSpecialties: any,
    COLUMNS_SPECIALTIES: any,
}
const Page2BySpecialty1ThisYear:FC<Page2BySpecialty1ThisYearProps> = ({ storeChoosenDomain, specialtyList, setSpecialties, COLUMNS_SPECIALTIES }) => {
    // console.log(specialtyList)
    const [ count, setCount ] = useState<number>(0)
    const [ levelList, setLevelList ] = useState<number[]>([])

    useEffect(() => {
        if (count == 0) {
            if (specialtyList.length > 0) {
                const l = specialtyList.map((item: SpecialtyOptimizedType) => item[6])
                setLevelList([ ...new Set(l)].sort());
            }
        }
    }, [count, specialtyList])

    // console.log(fetching)
  return (
    <Grid>
        {(storeChoosenDomain[0] > 0 && specialtyList?.length > 0) ? levelList.map((item: number) => (
            <Grid item xs={12} key={item} paddingBottom={4} alignContent="center" justifyContent="center" alignItems="center">
                <Stack alignContent="center">
                    <Grid 
                        item xs={12}
                        marginBottom={1}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        >
                        <Typography color="teal" variant='h4'>{specialtyList[0][2]} - LEVEL {item} - SPECIALTIES</Typography>
                    </Grid>

                    <Box>
                        <Table
                            dataSource={specialtyList?.filter((item2: SpecialtyOptimizedType) => item2[6] == item )}
                            columns={COLUMNS_SPECIALTIES}
                            pagination={false}  
                            // className={`${resultsData && resultsData?.filter((item2: ResultOptimizedType) => {if (item2[13].includes(item.toString())) {return item2}}).length < 1 ? "hidden" : ""}`}
                        />
                    </Box>
                </Stack>
            </Grid>
            ))
            
            :

            <Grid item xs={12}>
              <Box 
                marginBottom={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                paddingY={26}
              >
                <Typography justifyContent="center" display="flex" variant='h4'>No Specialties For {storeChoosenDomain[1]} !!!</Typography>
              </Box>
            </Grid>
        }
    </Grid>
  )
}

export default Page2BySpecialty1ThisYear