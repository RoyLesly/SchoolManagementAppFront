'use client';
import { useGetAllCourses } from '@/Utils/customHooks'
import { getAllCourses } from '@/Utils/functions'
import { CourseProps, MainCourseProps, UserType } from '@/Utils/types'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MyButtonView from '@/Designs/MyButtonView';
import MyButtonReload from '@/Designs/MyButtonReload';
import FetchingDataIndicator from '@/Designs/FetchingDataIndicator';
import PageContainer from '@/app/AdministrationPages/components/container/PageContainer';
import { Box, Grid, Stack, Typography, Input } from '@mui/material';
import { addChoosenCourse, choosenSpecialty} from '@/Redux/Reducers/sliceDomainSpecialityCourse';
import { Table } from 'antd';


interface Page3ByCourseProps {
  setSelectedNumber: any
}
const Page3ByCourse:FC<Page3ByCourseProps> = ({ setSelectedNumber }) => {
  const storeSpecialty = useSelector(choosenSpecialty)
  const dispatch = useDispatch()
  const [fetching, setFetching] = useState(true)
  const [ courses, setCourses] = useState<CourseProps[]>([])
  const [ coursesData, setCoursesData] = useState<CourseProps[]>([])
  const [ coursesDataList, setCoursesDataList] = useState<CourseProps[]>([])

  useGetAllCourses(setCourses, setFetching)

  const reset = () => {
      getAllCourses(setCourses, setFetching)
      setFetching(true)
  }

  useEffect(() => {
    const filterCourses = courses.filter((item: CourseProps) => item.specialty?.id == storeSpecialty.id)
    setCoursesData(filterCourses)
    setCoursesDataList(filterCourses)
  }, [storeSpecialty, courses])

  const COLUMNS_COURSES = [    
      {title: "COURSE NAME", dataIndex: "main_course", 
          render: (item: MainCourseProps) => <div className='italic font-semibold tracking-widest'>
              {item.course_name}
          </div>
      },                       
      {title: "LECTURER", dataIndex: "assigned_to", 
          render: (item: UserType) => <div className='italic font-semibold tracking-widest'>
              {item?.first_name} {item?.last_name}
          </div>
      },                       
      {title: "ACTION",
          render: (item: CourseProps) => <div onClick={() => dispatch(addChoosenCourse(item))} className='flex gap-2 italic font-semibold tracking-widest'>
              <MyButtonView setSelNum={ setSelectedNumber } nextTabNumber={"4"} />
          </div>
      },            
  ]

  const SearchResults = (val: string) => {
    if (val.length < 1) { setCoursesDataList(coursesData); return }
    const filterCourses = coursesData.filter((item: CourseProps) => item.main_course?.course_name.toLowerCase().includes(val?.toLowerCase()))
    setCoursesDataList(filterCourses);
  }

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
        <Box mt={2}>
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Stack direction="row" spacing={2}>
                        <Box>
                            <MyButtonReload fetching={fetching} reset={reset} />
                        </Box>
                        <Box>            
                            <div className={`bg-black rounded ${fetching ? "px-4" : ""}`}><FetchingDataIndicator fetching={fetching} /></div>
                        </Box>
                        <Box>
                            <Input onChange={(e) => {SearchResults(e.target.value)}} placeholder={`Search Courses ...`} className='text-gray-500' />
                        </Box>
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <Stack direction="column">
                    <Box 
                        marginBottom={1}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography variant='h5'>COURSES FOR {storeSpecialty?.main_specialty?.specialty_name} {storeSpecialty?.academic_year} Level - {storeSpecialty?.level?.level}</Typography>
                    </Box>
                    <Box>
                        <Table
                            dataSource={coursesDataList}
                            columns={COLUMNS_COURSES}  
                        />
                    </Box>
                    </Stack>
                </Grid>

            </Grid>
        </Box>
    </PageContainer>
  )
}

export default Page3ByCourse