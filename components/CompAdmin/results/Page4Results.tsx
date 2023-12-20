'use client';
import { choosenCourse, choosenSpecialty } from '@/Redux/Reducers/sliceDomainSpecialityCourse';
import { useGetAllResults } from '@/Utils/customHooks';
import PageContainer from '@/app/AdministrationPages/components/container/PageContainer';
import { Box, Button, Grid, Input, Stack, Typography } from '@mui/material';
import { ResultProps, UserProfile, UserType } from '@/Utils/types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import FetchingDataIndicator from '@/Designs/FetchingDataIndicator';
import MyButtonView from '@/Designs/MyButtonView';
import EditResultsFormModal from '@/Designs/Modals/EditResultsFormModal';
import { getAllResults } from '@/Utils/functions';

const Page4Results = () => {
  const storeSpecialty = useSelector(choosenSpecialty);
  const storeCourse = useSelector(choosenCourse);
  const [fetching, setFetching] = useState(true)
  const [results, setResults] = useState<ResultProps[]>([])
  const [resultsData, setResultsData] = useState<ResultProps[]>([])
  const [resultsDataList, setResultsDataList] = useState<ResultProps[]>([])
  const [record, setRecord] = useState<ResultProps | null>(null)
  const [editResults, setEditResults] = useState<boolean>(false)

  // useGetAllResults(setResults, setFetching)
  useGetAllResults(setResults, setFetching, { searchField: "course", value: storeCourse.id})
  console.log(results)

  const reset = () => {
    getAllResults(setResults, setFetching)
  }

  useEffect(() => {
    const filterResults = results.filter((item: ResultProps) => item.course.id == storeCourse.id);
    setResultsData(filterResults)
    setResultsDataList(filterResults)
  }, [results, storeCourse])

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
    {title: "ACTION", 
        render: (item: ResultProps) =>  <div className='italic font-semibold tracking-widest'>
            <Button onClick={() => { setRecord(item); setEditResults(true); }}>Edit</Button>
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
                <div className={`bg-black rounded ${fetching ? "px-4" : ""}`}><FetchingDataIndicator fetching={fetching} /></div>
              </Box>
              <Box>
                <div className='cursor-pointer rounded bg-blue-100 w-full text-center hover:bg-blue-500 font-semibold italic'>
                  <Input onChange={(e) => {SearchResults(e.target.value)}} placeholder={`Search Student Results ...`} className='text-gray-500' /></div>
              </Box>
            </Stack>
          </Grid>

          <Grid 
            item xs={12}
            marginBottom={1}
            justifyContent="center"
            alignItems="center"
          >
            <Typography justifyContent="center" display="flex" variant='h4'>{storeSpecialty?.main_specialty?.specialty_name} {storeCourse?.specialty?.academic_year}</Typography>
            <Typography justifyContent="center" display="flex" variant='h5'>{storeCourse?.main_course?.course_name}</Typography>
            <Typography justifyContent="center" display="flex" variant='h6'>LEVEL - {storeCourse?.specialty?.level?.level}</Typography>
          </Grid>


          <Grid item xs={12}>
            <Stack>
              <Box>
                <Table
                  dataSource={resultsDataList}
                  columns={COLUMNS_RESULTS}  
                />
              </Box>
            </Stack>
          </Grid>

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