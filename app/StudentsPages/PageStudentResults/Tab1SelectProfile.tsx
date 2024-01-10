'use client';
import { useGetAllUserProfiles } from '@/Utils/customHooks';
import { SpecialtyProps, UserProfile, UserProfileOptimizedType } from '@/Utils/types';
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
  const [ userProfiles, setUserProfiles ] = useState<UserProfileOptimizedType[]>([])
  const [ myProfilesData, setMyProfilesData ] = useState<UserProfileOptimizedType[]>([])

//   useGetAllUserProfiles(setUserProfiles, setFetching);
  useEffect(() => {
    //   const fil = userProfiles.filter((item: UserProfile) => item.user.id == storeUser.id);
    //   setMyProfilesData(fil)
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
                          {myProfilesData.map((item: UserProfileOptimizedType) => (
                              <TableRow key={item[0]}>
                                  <TableCell>
                                      <Typography
                                          sx={{
                                              fontSize: "15px",
                                              fontWeight: "500",
                                          }}
                                      >
                                          {item[2]}
                                      </Typography>
                                  </TableCell>

                                  <TableCell>
                                      <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                          {item[3]}
                                      </Typography>
                                  </TableCell>
                                  <TableCell>
                                      <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                          {item[4]}
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