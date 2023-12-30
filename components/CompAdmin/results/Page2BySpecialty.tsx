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
import { Box, Grid, LinearProgress, Stack, Typography } from '@mui/material';


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

    useEffect(() => {
      setResultsData(results)
    }, [results])

    useEffect(() => {
      if (count == 0 ) {
        getAllResults(setResults, setFetching, {searchField: "student__specialty__main_specialty__domain__id", value: storeChoosenDomain.id})
        setCount(count + 1)
      }
      if (count == 1) {
        getAllSpecialties(setSpecialties, setFetching, {searchField: "main_specialty__domain__id", value: storeChoosenDomain.id})
        setCount(count + 1)
      }
      if (count == 2) {
        if (results.length > 0) {
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
            <Stack direction="row" spacing={3}>
              <Box>
                <Select placeholder="Select An Academic year" onChange={(val) => {FilterSpecialtyByYear(val)}} className='w-32'>
                  <Option key="x" value={thisYear + "/" + (thisYear + 1)}>This year</Option>
                    {resultYears.map((item: string) => (
                        <Option key={item} value={item}>{item}</Option>
                    ))}
                  <Option key="all" value="none">All</Option>
                </Select> 
              </Box>
              <Box>
                <div className='cursor-pointer rounded bg-blue-100 w-full text-center hover:bg-blue-500 font-semibold italic'><Input onChange={(e) => {SearchResults(e.target.value)}} placeholder={`Search Results By Specialty ...`} className='text-gray-500' /></div>
              </Box>
            </Stack>
          </Grid>

          <Grid 
            item xs={12}
            marginBottom={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant='h5'>SPECIALTIES FOR {storeChoosenDomain?.domain_name}</Typography>
          </Grid>

          {loading ? <div style={{ flex: 1, margin: 60, fontSize: 25, alignContent: "center", alignItems: "center", textAlign: "center"}}>
              Data Loading <LinearProgress style={{ marginTop: 30}}/>
            </div> 
            : 
          
            <>
              {(storeChoosenDomain.id > 0 && specialtyListData.length > 0) ? resultYears.map((item: string) => (
                  <Grid item xs={12} md={6} lg={4} key={item}>
                    <Stack>
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
                )) 
              :
                <div style={{ flex: 1, margin: 60, fontSize: 25, alignContent: "center", alignItems: "center", textAlign: "center"}}>
                  No Result For Domain <code><b>{storeChoosenDomain.domain_name}</b></code>
                </div>
              }
            </>
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
            </Grid>}

        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Page2BySpecialty