'use client';
import React, { useState } from 'react';
import { Tab } from '@mui/material';
import Domains from '@/components/CompAdmin/settings/Domains';
import { School, TextFields } from '@mui/icons-material';
import { IconWriting } from '@tabler/icons-react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Specialties from '@/components/CompAdmin/settings/Specialties';
import PageContainer from '@/app/AdministrationPages/components/container/PageContainer';
import Courses from '@/components/CompAdmin/settings/Courses';
import Levels from '@/components/CompAdmin/settings/Levels';


const PageSettings = () => {
  const [ value, setValue ] = useState<string>("1")

  const handleChange = (val: any) => {
    console.log(val.target.value)
  }
  return (<TabContext value={value}>

      <TabList 
      >
        <Tab icon={<School />} onClick={() => setValue("1")} value={"1"} label="Domain" />
        <Tab icon={<IconWriting />} onClick={() => setValue("2")} value={"2"} label="Specialty" />
        <Tab icon={<TextFields />} onClick={() => setValue("3")} value={"3"} label="Courses" />
        <Tab icon={<TextFields />} onClick={() => setValue("4")} value={"4"} label="Level" />
      </TabList>

      
      <TabPanel sx={{ m: 0, p: 0}} value="1">
        <PageContainer title="Dashboard" description="this is Dashboard"><Domains /></PageContainer>
      </TabPanel>
      <TabPanel sx={{ m: 0, p: 0}} value="2">
        <PageContainer title="Specialty" description="this is Specialties"><Specialties /></PageContainer>
      </TabPanel>
      <TabPanel sx={{ m: 0, p: 0}} value="3">
        <PageContainer title="Course" description="this is Courses"><Courses /></PageContainer>
      </TabPanel>
      <TabPanel sx={{ m: 0, p: 0}} value="4">
        <PageContainer title="Level" description="this is Levels"><Levels /></PageContainer>
      </TabPanel>
    </TabContext>
  )
}

export default PageSettings