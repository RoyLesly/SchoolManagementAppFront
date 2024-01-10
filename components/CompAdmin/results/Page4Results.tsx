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
import { getAllResults } from '@/Utils/functions';
import MyButtonLoader from '@/Designs/MyButtonLoader';
import { AppControlOptimizedQueryUrl } from '@/Utils/Config';
import { ResultFieldList } from '@/Utils/constants';
import { getOptimizedQuery } from '@/Utils/pagination';

const Page4Results = () => {
  const storeSpecialty = useSelector(choosenSpecialty);
  const storeCourse = useSelector(choosenCourse);
  const [fetching, setFetching] = useState(true)
  const [count, setCount] = useState<number>(0)
  const [results, setResults] = useState<ResultOptimizedType[]>()
  const [resultsData, setResultsData] = useState<ResultOptimizedType[]>()
  const [editResults, setEditResults] = useState<boolean>(false)

  useEffect(() => {
    if (count == 0) {
      getOptimizedQuery(setResults, setFetching, ()=>{}, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, { 
        model: "Result", 
        searchField: "course__id", 
        value: storeCourse && storeCourse[0], 
        fieldList: [...ResultFieldList]
    });    
    if (results) { 
      setResultsData(results)
        setCount(count + 1)
    }
    }
    if (count == 1) {

    }
  }, [count, storeCourse, results])  

  const reset = () => {
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
    {title: "VALIDATED",
        render: (item: ResultOptimizedType) =>  <div className='italic font-semibold tracking-widest'>
            {item[7] ? <Typography color="green">Validated</Typography> : <Typography color="red">Not Validated</Typography>}
        </div>
    },                      
    {title: "DATE",
        render: (item: ResultOptimizedType) =>  <div className='italic font-semibold tracking-widest'>
            {item[14]}
        </div>
    },                      
           
  ]

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
        <Grid container spacing={3}>

          {storeCourse[0] ?
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
                    <Typography justifyContent="center" display="flex" variant='h3'>{storeSpecialty[1]} {storeSpecialty[2]}</Typography>
                  </Box>
                  <Box 
                      marginBottom={1}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                  >
                    <Typography color="teal" justifyContent="center" display="flex" variant='h4'>LEVEL - {storeCourse[4]}</Typography>
                  </Box>
                  <Box 
                      marginBottom={1}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                  >
                    <Typography color="teal" justifyContent="center" display="flex" variant='h5'>{storeCourse[1]}</Typography>
                  </Box>
                  <Box>
                  <Table
                    dataSource={resultsData}
                    columns={COLUMNS_RESULTS} 
                    pagination={false} 
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

    </PageContainer>
  )
}

export default Page4Results