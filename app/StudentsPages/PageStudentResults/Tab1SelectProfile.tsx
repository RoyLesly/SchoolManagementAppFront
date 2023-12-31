'use client';
import { useGetAllUserProfiles } from '@/Utils/customHooks';
import { SpecialtyProps, UserProfile } from '@/Utils/types';
import {
    Typography, Box, Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Stack,
    Fab,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardCard from '@/components/CompAdmin/shared/DashboardCard';
import { addChoosenUserProfile } from '@/Redux/Reducers/sliceChoosenUserAndProfile';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';


interface Tab1SelectProfileProps {
  setSelectedNumber: any
}

const Tab1SelectProfile:FC<Tab1SelectProfileProps> = ({ setSelectedNumber }) => {
  const storeUser = useSelector(selectAuthUser);
  const dispatch = useDispatch();    
  const [ fetching, setFetching ] = useState<boolean>(false)
  const [ userProfiles, setUserProfiles ] = useState<UserProfile[]>([])
  const [ myProfilesData, setMyProfilesData ] = useState<UserProfile[]>([])

  useGetAllUserProfiles(setUserProfiles, setFetching);
  useEffect(() => {
      const fil = userProfiles.filter((item: UserProfile) => item.user.id == storeUser.id);
      setMyProfilesData(fil)
  }, [userProfiles, storeUser])
  

  return (
    <DashboardCard title="SELECT ACADEMIC YEAR / PROFILE" loading={false}>
      <Box sx={{ overflow: 'auto', width: { xs: '380px', sm: 'auto' },}}>
          <Grid container spacing={0}>
              <Grid item xs={12}>

              </Grid>
              <Grid item xs={12}>
                  <Table
                      aria-label="simple table"
                      sx={{
                          whiteSpace: "nowrap",
                          mt: 0
                      }}
                  >
                      <TableHead>
                          <TableRow>
                          
                              <TableCell>
                                  <Typography variant="subtitle2" fontWeight={600}>
                                      Specialty
                                  </Typography>
                              </TableCell>

                              <TableCell>
                                  <Typography variant="subtitle2" fontWeight={600}>
                                      Year
                                  </Typography>
                              </TableCell>

                              <TableCell>
                                  <Typography variant="subtitle2" fontWeight={600}>
                                      Level
                                  </Typography>
                              </TableCell>

                              <TableCell align="center">
                                  <Typography variant="subtitle2" fontWeight={600}>
                                      Action
                                  </Typography>
                              </TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {myProfilesData.map((item: UserProfile) => (
                              <TableRow key={item.id}>
                                  <TableCell>
                                      <Typography
                                          sx={{
                                              fontSize: "15px",
                                              fontWeight: "500",
                                          }}
                                      >
                                          {item.specialty?.main_specialty.specialty_name}
                                      </Typography>
                                  </TableCell>

                                  <TableCell>
                                      <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                          {item.specialty?.academic_year}
                                      </Typography>
                                  </TableCell>
                                  <TableCell>
                                      <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                          {item.specialty?.level.level}
                                      </Typography>
                                  </TableCell>
                                  <TableCell align='left'>
                                      <Stack justifyItems="center" direction="row" spacing={1} justifyContent="center">
                                          {/* <Button onClick={() => {setRecord(item); setEditUserProfileFormModal(true)}} variant="contained" disableElevation color="primary">
                                              Edit
                                          </Button> */}
                                          <Button 
                                              onClick={ () => { 
                                                  dispatch(addChoosenUserProfile(item));
                                                  setSelectedNumber("results")
                                                }} 
                                              variant="contained" disableElevation color="primary">
                                              View
                                          </Button>
                                      </Stack>
                                      
                                  </TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </Grid>
          </Grid>
      </Box>            
  </DashboardCard>
  )
}

export default Tab1SelectProfile