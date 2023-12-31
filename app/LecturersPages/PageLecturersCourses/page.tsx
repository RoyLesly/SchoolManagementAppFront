// ** React Imports
'use client';
import { FC, SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import Tab1SelectCourse from './Tab1SelectCourse';
import Tab2UploadResults from './Tab2UploadResults';

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

const AccountSettings:FC<AccountSettingsProps> = ({ }) => {

  const [value, setValue] = useState<string>('course')

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
            value='course'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                
                <AccountOutline />
                <TabName>Courses</TabName>
              </Box>
            }
          />
          <Tab
            value='results'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Results</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 1, mt: 4 }} value='course'>
          <Tab1SelectCourse setSelectedNumber={setValue}  />
        </TabPanel>
        <TabPanel sx={{ p: 1, mt: 4 }} value='results'>
          <Tab2UploadResults />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default AccountSettings