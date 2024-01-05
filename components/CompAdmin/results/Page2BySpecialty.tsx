'use client';
import { useGetAllResults, useGetAllSpecialties } from '@/Utils/customHooks';
import { LevelProps, MainSpecialtyProps, ResultProps, SpecialtyProps } from '@/Utils/types';
import { Input, Select, Table } from 'antd'
import React, { useState, useEffect, FC } from 'react'
import { getAllResults, getAllSpecialties } from '@/Utils/functions';
import FetchingDataIndicator from '@/Designs/FetchingDataIndicator';
import MyButtonView from '@/Designs/MyButtonView';
import { useDispatch, useSelector } from 'react-redux';
import { addChoosenSpecialty, choosenDomain } from '@/Redux/Reducers/sliceDomainSpecialityCourse';
import PageContainer from '@/app/AdministrationPages/components/container/PageContainer';
import { Box, Button, Grid, LinearProgress, Stack, TextField, Typography } from '@mui/material';
import Page2BySpecialty1ThisYear from './Page2BySpecialty1ThisYear';
import Page2BySpecialty2OldResults from './Page2BySpecialty2OldResults';
import { nowYear } from '@/Utils/constants';
import ResultParameterSelectModal from './ResultParameterSelectModal';


const { Option } = Select

interface Page2BySpecialtyProps {
    setSelectedNumber: any
}

const Page2BySpecialty:FC<Page2BySpecialtyProps> = ({ setSelectedNumber }) => {
    const dispatch = useDispatch()
    const storeChoosenDomain = useSelector(choosenDomain)
    const [count, setCount] = useState<number>(0)
    const [fetching, setFetching] = useState(true)
    const [loading, setLoading] = useState(true)
    const [results, setResults] = useState<ResultProps[]>([])
    const [resultsData, setResultsData] = useState<ResultProps[]>([])
    const [specialties, setSpecialties] = useState<SpecialtyProps[]>([])
    const [specialtyList, setSpecialtyList] = useState<any>([])
    const [specialtyListData, setSpecialtyListData] = useState<any>([])
    const [showOldResult, setShowOldResult] = useState<boolean>(false)
    const [showOldResultModal, setShowOldResultModal] = useState<boolean>(false)


    useEffect(() => {
      if (count == 0 ) {
        getAllResults(setResults, setFetching, {searchField: ["student__specialty__main_specialty__domain__id", "student__specialty__academic_year" ], value: [storeChoosenDomain.id, "2023/2024" ]})
        setCount(count + 1)
      }
      if (count == 1) {
        getAllSpecialties(setSpecialties, setFetching, {searchField: "main_specialty__domain__id", value: storeChoosenDomain.id})
        setCount(count + 1)
      }
      if (count == 2) {
        if (results.length > 0) {
          setResultsData(results)
          const filterSpecialty = results.map((item: ResultProps) => item.course?.specialty);
          const specialty = specialties.filter((itemA: SpecialtyProps) => filterSpecialty.some(itemB => itemA.id === itemB.id));
          setSpecialtyList(specialty);
          setCount(count + 1)
        }
      }
      if (count == 3) {
        const filterSpec = specialtyList.filter((item: SpecialtyProps) => item.main_specialty?.domain.id == storeChoosenDomain.id)
        setSpecialtyListData(filterSpec)
        setCount(count + 1)
      }
      if (count == 4) {
        setLoading(false)
      }
    }, [count, storeChoosenDomain, results, specialties, specialtyList])    
  
    const COLUMNS_SPECIALTIES = [    
        {title: "SPECIALTY", dataIndex: "main_specialty", 
            render: (item: MainSpecialtyProps) => <div className='italic font-semibold tracking-widest'>
                {item?.specialty_name}
            </div>
        },            
        {title: "LEVEL", dataIndex: "level", 
            render: (item: LevelProps) => <div className='italic font-semibold tracking-widest'>
                LEVEL - {item?.level}
            </div>
        },            
        {title: "ACTION",
            render: (item: SpecialtyProps) => <div onClick={() => dispatch(addChoosenSpecialty(item))} className='flex gap-2 italic font-semibold tracking-widest'>
                <MyButtonView setSelNum={ setSelectedNumber } nextTabNumber={"3"} />
            </div>
        },            
    ]

    const thisYear = new Date().getFullYear()
    const filterResults = results.map((item: ResultProps) => item?.course?.specialty?.academic_year)
    const resultYears = filterResults.filter((item, index) => filterResults.indexOf(item) === index).reverse()

    const FilterSpecialtyByYear = (year: any) => {
        if (year == "none") {setResultsData(results); return}
        const fil = results?.filter((item: ResultProps) => item?.course?.specialty?.academic_year.includes(year))
        setResultsData(fil)
    }

    const reset = () => {

    }

    const SearchResults = (val: string) => {
        if (val.length < 1) { setSpecialtyListData(specialtyList); return }
        const filterSpecialtyList = specialtyList.filter((item: SpecialtyProps) => item.main_specialty?.specialty_name.toLowerCase().includes(val?.toLowerCase()))
        setSpecialtyListData(filterSpecialtyList);
    }    

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={2}>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Stack direction="row" spacing={1}>
              <Box>
                <Button 
                  onClick={ () => { setShowOldResultModal(!showOldResultModal) }} 
                  sx={{ width: 120, marginX: 1, paddingY: 1.8 }}
                  variant="contained" disableElevation color="primary"
                >
                  {showOldResult ? "This Year" : "Old Result"}
                </Button>            
              </Box>
              <Box
                sx={{ width: "100%"}}
              >
                <TextField label="Search Specialties .." onChange={(e) => {SearchResults(e.target.value)}} placeholder={`Search Results By Specialty ...`} sx={{width: "100%"}} />
              </Box>
            </Stack>
          </Grid>

          {loading ? <div style={{ flex: 1, alignItems: "center", textAlign: "center", justifyContent: "center", fontSize: "30", paddingTop: 50, paddingBottom: 70, paddingLeft: 60, paddingRight: 25 }}>
              Data Loading <LinearProgress style={{ marginTop: 30, padding: 5 }}/>
          </div> 
  
          : 
  
          <div style={{ flex: 1, alignItems: "center", textAlign: "center", justifyContent: "center", fontSize: "30", paddingTop: 50, paddingBottom: 70, paddingLeft: 60, paddingRight: 25 }}>
            {!showOldResult ? <Page2BySpecialty1ThisYear
                resultsData={resultsData}
                COLUMNS_SPECIALTIES={COLUMNS_SPECIALTIES}
                specialtyListData={specialtyListData}
                storeChoosenDomain={storeChoosenDomain}
              /> : <Page2BySpecialty2OldResults />
            }

            {storeChoosenDomain.id < 1 && 
              <Grid 
                pt={25}
                pb={25}
                item xs={12}
                marginBottom={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant='h6'>NO DOMAIN SELECTED</Typography>
              </Grid>
            }
            </div>
          }

        </Grid>
      </Box>
      <ResultParameterSelectModal
        showModal={showOldResultModal}
        setShowModal={setShowOldResultModal}
        showOldResult={showOldResult}
        setShowOldResult={setShowOldResult}
      />
    </PageContainer>
  )
}

export default Page2BySpecialty