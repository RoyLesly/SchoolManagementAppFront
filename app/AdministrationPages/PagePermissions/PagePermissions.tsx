'use client';
import React, { useState } from 'react';
import { Tab } from '@mui/material';
import Domains from '@/components/CompAdmin/settings/Domains';
import { Key, Lock, School, TextFields } from '@mui/icons-material';
import { IconWriting } from '@tabler/icons-react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import PageContainer from '@/app/AdministrationPages/components/container/PageContainer';
import Levels from '@/components/CompAdmin/settings/Levels';
import Groups from '@/components/CompAdmin/permissions/Groups';
import Permissions from '@/components/CompAdmin/permissions/Permissions';
import GroupsToUser from '@/components/CompAdmin/permissions/GroupsToUser';


const PagePermissions = () => {
  const [ value, setValue ] = useState<string>("1")

  const handleChange = (val: any) => {
    console.log(val.target.value)
  }
  return (<TabContext value={value}>

      <TabList 
      >
        <Tab icon={<Key />} onClick={() => setValue("1")} value={"1"} label="Groups" />
        <Tab icon={<Lock />} onClick={() => setValue("2")} value={"2"} label="G to Users" />
        <Tab icon={<Lock />} onClick={() => setValue("3")} value={"3"} label="P to Grps" />
        <Tab icon={<Key />} onClick={() => setValue("4")} value={"4"} label="Permissions" />
      </TabList>

      
      <TabPanel sx={{ m: 0, p: 0}} value="1">
        <PageContainer title="Users" description="this is Permission"><Groups /></PageContainer>
      </TabPanel>
      <TabPanel sx={{ m: 0, p: 0}} value="2">
        <PageContainer title="Assign Groups" description="this is Groups to User"><GroupsToUser /></PageContainer>
      </TabPanel>
      <TabPanel sx={{ m: 0, p: 0}} value="3">
        <PageContainer title="Assign Permissions" description="this is Perms to Group"><Domains /></PageContainer>
      </TabPanel>
      <TabPanel sx={{ m: 0, p: 0}} value="4">
        <PageContainer title="Permissions" description="this is Permissions"><Permissions /></PageContainer>
      </TabPanel>
    </TabContext>
  )
}

export default PagePermissions