'use client';
import React, { useState } from 'react';
import { Tab } from '@mui/material';
import { School } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import PageContainer from '@/app/AdministrationPages/components/container/PageContainer';
import { IconBook, IconBrandEmber } from '@tabler/icons-react';
import Page4Results from '@/components/CompAdmin/results/Page4Results';
import Page2BySpecialty from '@/components/CompAdmin/results/Page2BySpecialty';
import Page3ByCourse from '@/components/CompAdmin/results/Page3ByCourse';
import Page1ByDomain from '@/components/CompAdmin/results/Page1ByDomain';
import Page5Generate from '@/components/CompAdmin/results/Page5Generate';
import { removeChoosenCourse, removeChoosenDomain, removeChoosenSpecialty } from '@/Redux/Reducers/sliceDomainSpecialityCourse';
import { useDispatch } from 'react-redux';



const PageResults = () => {
  const dispatch = useDispatch()
  const [ value, setValue ] = useState<string>("1");

  return (<TabContext value={value}>

      <TabList 
      >
        <Tab icon={<School />} onClick={() => {
          setValue("1"); 
          dispatch(removeChoosenSpecialty());
          dispatch(removeChoosenCourse()) 
        } } value={"1"} label="By Domain" />
        <Tab icon={<IconBook />} onClick={() => {
          setValue("2"); 
          dispatch(removeChoosenDomain());
          dispatch(removeChoosenCourse()) 
        } } value={"2"} label="By Specialty" />
        <Tab icon={<IconBrandEmber />} onClick={() => {
          setValue("3"); 
          dispatch(removeChoosenDomain());
          dispatch(removeChoosenSpecialty());
        } } value={"3"} label="By Course" />
        <Tab icon={<IconBrandEmber />} onClick={() => {
          setValue("4"); 
          dispatch(removeChoosenDomain());
          dispatch(removeChoosenSpecialty());
        } } value={"4"} label="Results" />
        <Tab icon={<IconBrandEmber />} onClick={() => {setValue("5")} } value={"5"} label="Generate" />
      </TabList>

      
      <TabPanel sx={{ m: 0, p: 0}} value="1">
        <PageContainer title="Dashboard" description="this is Domain"><Page1ByDomain setSelectedNumber={setValue} /></PageContainer>
      </TabPanel>
      <TabPanel sx={{ m: 0, p: 0}} value="2">
        <PageContainer title="Dashboard" description="this is Specialties"><Page2BySpecialty setSelectedNumber={setValue} /></PageContainer>
      </TabPanel>
      <TabPanel sx={{ m: 0, p: 0}} value="3">
        <PageContainer title="Specialty" description="this is Courses"><Page3ByCourse setSelectedNumber={setValue} /></PageContainer>
      </TabPanel>
      <TabPanel sx={{ m: 0, p: 0}} value="4">
        <PageContainer title="Course" description="this is Results"><Page4Results /></PageContainer>
      </TabPanel>
      <TabPanel sx={{ m: 0, p: 0}} value="5">
        <PageContainer title="Course" description="this is Generate"><Page5Generate /></PageContainer>
      </TabPanel>
    </TabContext>
  )
}

export default PageResults