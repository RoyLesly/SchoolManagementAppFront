'use client';
import { choosenCourse, choosenSpecialty } from '@/Redux/Reducers/sliceDomainSpecialityCourse';
import PageContainer from '@/app/AdministrationPages/components/container/PageContainer';
import { Box, Button, Grid, Input, LinearProgress, Stack, Typography } from '@mui/material';
import { ResultProps, UserProfile } from '@/Utils/types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import MyButtonView from '@/Designs/MyButtonView';
import EditResultsFormModal from '@/Designs/Modals/EditResultsFormModal';
import { getAllResults } from '@/Utils/functions';
import MyButtonLoader from '@/Designs/MyButtonLoader';

const Page4Results = () => {
  const storeSpecialty = useSelector(choosenSpecialty);
  const storeCourse = useSelector(choosenCourse);
  const [fetching, setFetching] = useState(true)
  const [count, setCount] = useState<number>(0)
  const [results, setResults] = useState<ResultProps[]>([])
  const [resultsData, setResultsData] = useState<ResultProps[]>([])
  const [resultsDataList, setResultsDataList] = useState<ResultProps[]>([])
  const [record, setRecord] = useState<ResultProps | null>(null)
  const [editResults, setEditResults] = useState<boolean>(false)

  useEffect(() => {
    if (count == 0) {
      getAllResults(setResults, setFetching, { searchField: "course__main_course__course_name", value: storeCourse?.main_course?.course_name});
      setCount(count + 1);
    }
    if (count == 1) {
      if (results.length > 0) {
        const filterResults = results.filter((item: ResultProps) => item.course.id == storeCourse.id);
        setResultsData(filterResults);
        setResultsDataList(filterResults);
        setCount(count + 1)
      }
    }
  }, [count, storeCourse, results])  

  const reset = () => {
    setFetching(true)
    getAllResults(setResults, setFetching, { searchField: "course__main_course__course_name", value: storeCourse?.main_course?.course_name});
    setCount(1)
  }


  const COLUMNS_RESULTS = [    
    {title: "STUDENT NAME", dataIndex: "student", 
        render: (item: UserProfile) => <div className='italic font-semibold tracking-widest'>
            {item?.user.first_name} {item?.user.last_name} <MyButtonView setSelNum={ () => {} } nextTabNumber={"4"} />
        </div>
    },                                                                   
    {title: "CA", dataIndex: "ca", 
        render: (item: string) => <div className='italic font-semibold tracking-widest'>
            {item}
        </div>
    },                       
    {title: "EXAM", dataIndex: "exam", 
        render: (item: string) => <div className='italic font-semibold tracking-widest'>
            {item}
        </div>
    },                       
    {title: "RESIT", dataIndex: "resit", 
        render: (item: string) =>  <div className='italic font-semibold tracking-widest'>
            {item}
        </div>
    },                      
           
  ]

  const SearchResults = (val: string) => {
    if (val.length < 1) { setResultsDataList(resultsData); return }
    const filterResults = resultsData.filter((item: ResultProps) => item?.student.user.first_name.toLowerCase().includes(val?.toLowerCase()))
    setResultsDataList(filterResults);
  }


  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={2}>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Stack direction="row" spacing={3}>
              <Box>
                <Typography></Typography>
              </Box>
              <Box>            
                <MyButtonLoader fetching={fetching} loadingText='Loading' info={resultsDataList.length} onClick={reset} />
              </Box>
              <Box>
                <div className='cursor-pointer rounded bg-blue-100 w-full text-center hover:bg-blue-500 font-semibold italic'>
                  <Input onChange={(e) => {SearchResults(e.target.value)}} placeholder={`Search Student Results ...`} className='text-gray-500' /></div>
              </Box>
            </Stack>
          </Grid>

          {fetching ? <div style={{ flex: 1, margin: 60, fontSize: 25, alignContent: "center", alignItems: "center", textAlign: "center"}}>
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
                  <Typography justifyContent="center" display="flex" variant='h4'>{storeSpecialty?.main_specialty?.specialty_name} {storeCourse?.specialty?.academic_year}</Typography>
                </Box>
                <Box 
                    marginBottom={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                  <Typography justifyContent="center" display="flex" variant='h5'>{storeCourse?.main_course?.course_name}</Typography>
                </Box>
                <Box 
                    marginBottom={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                  <Typography justifyContent="center" display="flex" variant='h6'>LEVEL - {storeCourse?.specialty?.level?.level}</Typography>
                </Box>
                <Box>
                <Table
                  dataSource={resultsDataList}
                  columns={COLUMNS_RESULTS}  
                />
                </Box>
                </Stack>
            </Grid>
          }

          {storeCourse.id < 1 && <Box m={10}>No Domain Selected</Box>}

        </Grid>
      </Box>

      <EditResultsFormModal 
        showModal={editResults}
        setShowModal={setEditResults}
        record={record}
        reset={reset}
      />

    </PageContainer>
  )
}

export default Page4Results