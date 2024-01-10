'use client';
import { choosenCourse, choosenSpecialty } from '@/Redux/Reducers/sliceDomainSpecialityCourse';
import PageContainer from '@/app/AdministrationPages/components/container/PageContainer';
import { Box, Button, Grid, Input, LinearProgress, Stack, Typography } from '@mui/material';
import { ResultOptimizedType, ResultProps, UserProfile } from '@/Utils/types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import MyButtonView from '@/Designs/MyButtonView';
import EditResultsFormModal from '@/Designs/Modals/EditResultsFormModal';
import { getOptimizedQuery } from '@/Utils/pagination';
import { ResultFieldList } from '@/Utils/constants';
import { AppControlOptimizedQueryUrl } from '@/Utils/Config';

const CourseManagement = () => {
  const storeSpecialty = useSelector(choosenSpecialty);
  const storeCourse = useSelector(choosenCourse);
  const [fetching, setFetching] = useState(true)
  const [count, setCount] = useState<number>(0)
  const [results, setResults] = useState<ResultOptimizedType[]>()
  const [resultsData, setResultsData] = useState<ResultOptimizedType[]>()
  const [record, setRecord] = useState<ResultOptimizedType>()
  const [editResults, setEditResults] = useState<boolean>(false)

  useEffect(() => {
    if (count == 0) {
      if (!storeCourse[0]) { setCount(count + 1); return }
      getOptimizedQuery(setResults, setFetching, ()=>{}, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, { 
        model: "Result", 
        searchField: "course__id",
        value: storeCourse[0],
        fieldList: [...ResultFieldList]
      });
      if (results) { 
        setResultsData(results)
        setCount(count + 1)
      }
    }

  }, [count, storeSpecialty, storeCourse, results])  

  const reset = () => {
    setFetching(true)
    setCount(0)
  }

  const COLUMNS_RESULTS = [    
    {title: "STUDENT NAME", 
        render: (item: ResultOptimizedType) => <div className='italic font-semibold tracking-widest'>
            {item[2]} {item[3]} 
        </div>
    },                                                                   
    {title: "CA",
        render: (item: ResultOptimizedType) => <div className='italic font-semibold tracking-widest'>
            {item[4]}
        </div>
    },                       
    {title: "EXAM",
        render: (item: ResultOptimizedType) => <div className='italic font-semibold tracking-widest'>
            {item[5]}
        </div>
    },                       
    {title: "RESIT",
        render: (item: ResultOptimizedType) =>  <div className='italic font-semibold tracking-widest'>
            {item[6]}
        </div>
    },                                             
    {title: "ACTION", 
        render: (item: ResultOptimizedType) =>  <div className='italic font-semibold tracking-widest'>
            <Button onClick={() => { setRecord(item); setEditResults(true); }} 
              variant="contained" disableElevation color="primary"
            >                    
              Edit
            </Button>
        </div>
    },                                              
           
  ]

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
                {/* <MyButtonLoader fetching={fetching} loadingText='Loading' info={resultsDataList.length} onClick={reset} /> */}
              </Box>
              <Box>
                {/* <div className='cursor-pointer rounded bg-blue-100 w-full text-center hover:bg-blue-500 font-semibold italic'> */}
                  {/* <Input onChange={(e) => {SearchResults(e.target.value)}} placeholder={`Search Student Results ...`} className='text-gray-500' /></div> */}
              </Box>
            </Stack>
          </Grid>

          {storeCourse[0] ? 
            fetching ? 
              <div style={{ flex: 1, margin: 60, fontSize: 25, alignContent: "center", alignItems: "center", textAlign: "center"}}>
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
                    <Typography justifyContent="center" display="flex" variant='h4'>{storeCourse[2]} {storeCourse[3]}</Typography>
                  </Box>
                  <Box 
                      marginBottom={1}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                  >
                    <Typography color="teal" justifyContent="center" display="flex" variant='h5'>{storeCourse[1]}</Typography>
                  </Box>
                  <Box 
                      marginBottom={1}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                  >
                    <Typography color="teal" justifyContent="center" display="flex" variant='h6'>LEVEL - {storeCourse[4]}</Typography>
                  </Box>
                  <Box>
                    <Table
                      dataSource={resultsData}
                      columns={COLUMNS_RESULTS}  
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
                <Typography justifyContent="center" display="flex" variant='h4'>No Course Selected !!!</Typography>
              </Box>
            </Grid>
          }

        </Grid>
      </Box>

      <EditResultsFormModal 
        showModal={editResults}
        setShowModal={setEditResults}
        record={record && record}
        reset={reset}
        setRecord={setRecord}
      />

    </PageContainer>
  )
}

export default CourseManagement