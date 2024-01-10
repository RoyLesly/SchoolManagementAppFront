'use client';
import { SpecialtyOptimizedType } from '@/Utils/types';
import { Input, Select, Table } from 'antd'
import React, { useState, useEffect, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addChoosenSpecialty, choosenDomain, removeChoosenCourse, removeChoosenDomain, removeChoosenSpecialty } from '@/Redux/Reducers/sliceDomainSpecialityCourse';
import PageContainer from '@/app/AdministrationPages/components/container/PageContainer';
import { Box, Button, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import { SpecialtyFieldList, currentAcademicYear } from '@/Utils/constants';
import { getOptimizedQuery } from '@/Utils/pagination';
import { AppControlOptimizedQueryUrl } from '@/Utils/Config';
import MyButtonView from '@/Designs/MyButtonView';
import Page2BySpecialty1ThisYear from './Page2BySpecialty1ThisYear';
import SelectAcademicYearModal from './SelectAcademicYearModal';



interface Page2BySpecialtyProps {
    setSelectedNumber: any
}

const Page2BySpecialty:FC<Page2BySpecialtyProps> = ({ setSelectedNumber }) => {
    const dispatch = useDispatch()
    const storeChoosenDomain = useSelector(choosenDomain)
    const [count, setCount] = useState<number>(0)
    const [fetching, setFetching] = useState(true)
    const [selectedAcademicYear, setSelectedAcademicYear] = useState<string>("")
    const [specialties, setSpecialties] = useState<SpecialtyOptimizedType[]>()
    const [specialtyList, setSpecialtyList] = useState<any>([])
    const [showOldResult, setShowOldResult] = useState<boolean>(false)
    const [showOldResultModal, setShowOldResultModal] = useState<boolean>(false)

    useEffect(() => {
      if (count == 0 ) {  
        if (!storeChoosenDomain[0]) { setCount(count + 1); return }
        getOptimizedQuery(setSpecialties, setFetching, ()=>{}, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, { 
          model: "Specialty", 
          searchField: ["main_specialty__domain__id", "academic_year"], 
          value: [storeChoosenDomain[0], currentAcademicYear()], 
          fieldList: [...SpecialtyFieldList]
        }); 
        setCount(count + 1);
      }
      if (count == 1) {
        if (specialties) {
          setSpecialtyList(specialties)
          setFetching(false);
          setCount(count + 1);
        }
      }
      if (count == 3) {
        setSpecialtyList([]);
        setFetching(true);
        getOptimizedQuery(setSpecialties, ()=>{}, ()=>{}, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, { 
          model: "Specialty", 
          searchField: ["main_specialty__domain__id", "academic_year"], 
          value: [storeChoosenDomain[0], selectedAcademicYear], 
          fieldList: [...SpecialtyFieldList]
        }); 
        if (specialties && (specialties[0][2] == selectedAcademicYear)) {
          setCount(1);
        }
      }
    }, [count, dispatch, storeChoosenDomain, selectedAcademicYear, specialties, specialtyList]) 
  
    const COLUMNS_SPECIALTIES = [    
        {title: "SPECIALTY",
            render: (item: SpecialtyOptimizedType) => <div className='italic font-semibold tracking-widest'>
                {item[1]}
            </div>
        },            
        {title: "LEVEL",
            render: (item: SpecialtyOptimizedType) => <div className='italic font-semibold tracking-widest'>
                LEVEL - {item[6]}
            </div>
        },            
        {title: "ACTION",
            render: (item: SpecialtyOptimizedType) => <div onClick={() => dispatch(addChoosenSpecialty(item))} className='flex gap-2 italic font-semibold tracking-widest'>
                <MyButtonView setSelNum={ setSelectedNumber } nextTabNumber={"3"} />
            </div>
        },            
    ]

    // console.log("FFFFF")
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={2}>
        <Grid container spacing={3}>

          {storeChoosenDomain[0] && <Grid item xs={12}>
              <Stack direction="row" spacing={1}>
                <Box>
                  <Button 
                    onClick={ () => { setShowOldResultModal(!showOldResultModal) }} 
                    sx={{ width: "100%", marginX: 2, paddingY: 1.8 }}
                    variant="contained" disableElevation color="primary"
                  >
                    {showOldResult ? "This Year" : "Select Academic Year"}
                  </Button>            
                </Box>
              </Stack>
            </Grid>
          }

          {storeChoosenDomain[0] ?
            fetching ? <div style={{ flex: 1, alignItems: "center", textAlign: "center", justifyContent: "center", fontSize: "30", paddingTop: 50, paddingBottom: 70, paddingLeft: 60, paddingRight: 25 }}>
                Data Loading <LinearProgress style={{ marginTop: 30, padding: 5 }}/>
              </div> 
      
              : 

              <Grid item xs={12} marginX={2}>
                <Page2BySpecialty1ThisYear
                  COLUMNS_SPECIALTIES={COLUMNS_SPECIALTIES}
                  specialtyList={specialtyList}
                  setSpecialties={setSpecialties}
                  storeChoosenDomain={storeChoosenDomain}
                /> 
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
                <Typography justifyContent="center" display="flex" variant='h4'>No Domain Selected !!!</Typography>
              </Box>
            </Grid>

          }

        </Grid>
      </Box>
      <SelectAcademicYearModal
        showModal={showOldResultModal}
        setShowModal={setShowOldResultModal}
        setSelectedAcademicYear={setSelectedAcademicYear}
        setCount={setCount}
        specialties={specialties}
        setSpecialtyList={setSpecialtyList}
      />
    </PageContainer>
  )
}

export default Page2BySpecialty