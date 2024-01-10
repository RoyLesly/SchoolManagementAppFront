'use client';
import { FC, SyntheticEvent, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'
import { useSelector } from 'react-redux';
import { selectChoosenUser, selectChoosenUserProfile } from '@/Redux/Reducers/sliceChoosenUserAndProfile';
import Tab1Account from '@/components/CompAccountSettings/Tab1Account';
import Tab2Specialties from '@/components/CompAccountSettings/Tab2Specialties';
import Tab2Courses from '@/components/CompAccountSettings/Tab2Courses';
import Tab3CourseManagement from '@/components/CompAccountSettings/Tab3CourseManagement';
import Tab3Security from '@/components/CompAccountSettings/Tab3Security';
import Tab4Info from '@/components/CompAccountSettings/Tab4Info';

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

interface AccountSettingsProps {
}

const Page:FC<AccountSettingsProps> = ({  }) => {
  const storeAccountRole = useSelector(selectChoosenUserProfile)[12]

  const [value, setValue] = useState<string>('account')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }


  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                
                <AccountOutline />
                <TabName>Account</TabName>
              </Box>
            }
          />
          {storeAccountRole == "student" ? <Tab
            value='specialties'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Specialties</TabName>
              </Box>
            }
          /> 
          :
          <Tab
            value='courses'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Courses</TabName>
              </Box>
            }
          />}
          {storeAccountRole == "student" ? <></>
          :
          <Tab
            value='coursemanagement'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Course Management</TabName>
              </Box>
            }
          />}
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Security</TabName>
              </Box>
            }
          />
          <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>Info</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <Tab1Account />
        </TabPanel>
        { storeAccountRole == "student" ? <TabPanel sx={{ p: 0 }} value='specialties'>
          <Tab2Specialties />
        </TabPanel> : <TabPanel sx={{ p: 0 }} value='courses'>
          <Tab2Courses setValue={setValue} />
        </TabPanel>}
        { storeAccountRole == "student" ? <></> : <TabPanel sx={{ p: 0 }} value='coursemanagement'>
          <Tab3CourseManagement />
        </TabPanel>}
        <TabPanel sx={{ p: 0 }} value='security'>
          <Tab3Security />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='info'>
          <Tab4Info />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default Page