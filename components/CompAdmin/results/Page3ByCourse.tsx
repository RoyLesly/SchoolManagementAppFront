'use client';
import { getAllCourses } from '@/Utils/functions'
import { CourseOptimizedType, CourseProps, MainCourseOptimizedType, MainCourseProps, UserType } from '@/Utils/types'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MyButtonView from '@/Designs/MyButtonView';
import PageContainer from '@/app/AdministrationPages/components/container/PageContainer';
import { Box, Grid, Stack, Typography, Input, LinearProgress } from '@mui/material';
import { addChoosenCourse, choosenSpecialty, removeChoosenCourse, removeChoosenDomain, removeChoosenSpecialty} from '@/Redux/Reducers/sliceDomainSpecialityCourse';
import { Table } from 'antd';
import MyButtonLoader from '@/Designs/MyButtonLoader';
import { AppControlOptimizedQueryUrl } from '@/Utils/Config';
import { CourseFieldList } from '@/Utils/constants';
import { getOptimizedQuery } from '@/Utils/pagination';


interface Page3ByCourseProps {
  setSelectedNumber: any
}
const Page3ByCourse:FC<Page3ByCourseProps> = ({ setSelectedNumber }) => {
  const storeSpecialty = useSelector(choosenSpecialty)
  const dispatch = useDispatch()
  const [fetching, setFetching] = useState(true)
  const [count, setCount] = useState<number>(0)
  const [ courses, setCourses] = useState<CourseOptimizedType[]>()
  const [ coursesData, setCoursesData] = useState<CourseOptimizedType[]>()


  useEffect(() => {
    if (count == 0) {  
        getOptimizedQuery(setCourses, setFetching, ()=>{}, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, { 
            model: "Course", 
            searchField: "specialty__id", 
            value: storeSpecialty && storeSpecialty[0], 
            fieldList: [...CourseFieldList]
        });    
        if (courses) { 
            setCoursesData(courses)
            setCount(count + 1)
        }
    }
    if (count == 1) {
    }

  }, [count, dispatch, storeSpecialty, courses])

  const COLUMNS_COURSES = [    
      {title: "COURSE NAME", 
          render: (item: CourseOptimizedType) => <div className='italic font-semibold tracking-widest'>
              {item[1]}
          </div>
      },                       
      {title: "LECTURER",
          render: (item: CourseOptimizedType) => <div className='italic font-semibold tracking-widest'>
              {item[13]} {item[14]}
          </div>
      },                       
      {title: "ACTION",
          render: (item: CourseOptimizedType) => <div onClick={() => dispatch(addChoosenCourse(item))} className='flex gap-2 italic font-semibold tracking-widest'>
              <MyButtonView setSelNum={ setSelectedNumber } nextTabNumber={"4"} />
          </div>
      },            
  ]

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
        <Box mt={2}>
            <Grid container spacing={3}>

                {storeSpecialty[0] ?
                    fetching ? <div style={{ flex: 1, margin: 60, fontSize: 25, alignContent: "center", alignItems: "center", textAlign: "center"}}>
                            Data Loading <LinearProgress style={{ marginTop: 30}}/>
                        </div>  
                        
                        : 
                        
                        <Grid item xs={12}>
                            <Stack direction="column">
                            <Box 
                                marginBottom={1}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Typography variant='h5'>COURSES FOR {storeSpecialty[1]} {storeSpecialty[2]} Level - {storeSpecialty[6]}</Typography>
                            </Box>
                            <Box>
                                <Table
                                    dataSource={coursesData}
                                    columns={COLUMNS_COURSES}  
                                />
                            </Box>
                            </Stack>
                        </Grid> 
                    
                    : 
                    
                    <Grid item xs={12}>
                        <Box 
                            marginBottom={1}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            paddingY={26}
                        >
                            <Typography justifyContent="center" display="flex" variant='h4'>No Specialty Selected !!!</Typography>
                        </Box>
                    </Grid>
                }

            </Grid>
        </Box>
    </PageContainer>
  )
}

export default Page3ByCourse