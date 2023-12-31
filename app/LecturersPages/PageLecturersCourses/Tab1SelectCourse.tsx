'use client';
import { useGetAllCourses } from '@/Utils/customHooks';
import { CourseProps } from '@/Utils/types';
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
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import { addChoosenCourse, removeChoosenCourse } from '@/Redux/Reducers/sliceDomainSpecialityCourse';
import { getAllCourses } from '@/Utils/functions';


interface Tab1SelectProfileProps {
  setSelectedNumber: any
}

const Tab1SelectCourse:FC<Tab1SelectProfileProps> = ({ setSelectedNumber }) => {
  const storeUser = useSelector(selectAuthUser);
  const dispatch = useDispatch();    
  const [ fetching, setFetching ] = useState<boolean>(true)
  const [ loading, setLoading ] = useState<boolean>(true)
  const [ count, setCount ] = useState<number>(0)
  const [ allCourses, setAllCourses ] = useState<CourseProps[]>([])
  const [ myCourses, setMyCourses ] = useState<CourseProps[]>([])

  useEffect(() => {
    if (count == 0) {
        dispatch(removeChoosenCourse())
        getAllCourses(setMyCourses, setFetching, { searchField: "assigned_to__id", value: storeUser?.id})
        setCount(count + 1)
    }
    if (count == 1) {
        if (myCourses.length > 0) {
            setCount(count + 1)
            setLoading(false)
        }
    }
  }, [myCourses, storeUser, count, dispatch])
    

  return (
    <DashboardCard title="SELECT COURSE" loading={loading}>
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
                                      Course Name
                                  </Typography>
                              </TableCell>
                          
                              <TableCell>
                                  <Typography variant="subtitle2" fontWeight={600}>
                                      Specialty - Level
                                  </Typography>
                              </TableCell>

                              <TableCell align="center">
                                  <Typography variant="subtitle2" fontWeight={600}>
                                      Year
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
                          {myCourses.map((item: CourseProps) => (
                              <TableRow key={item.id}>

                                  <TableCell>
                                      <Typography
                                          sx={{
                                              fontSize: "15px",
                                              fontWeight: "500",
                                          }}
                                      >
                                          {item?.main_course?.course_name}
                                      </Typography>
                                  </TableCell>

                                  <TableCell>
                                      <Typography
                                          sx={{
                                              fontSize: "15px",
                                              fontWeight: "500",
                                          }}
                                      >
                                          {item.specialty?.main_specialty.specialty_name} - {item.specialty?.level.level}
                                      </Typography>
                                  </TableCell>

                                  <TableCell>
                                      <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                          {item.specialty?.academic_year}
                                      </Typography>
                                  </TableCell>

                                  <TableCell align='left'>
                                      <Stack justifyItems="center" direction="row" spacing={1} justifyContent="center">
                                          {/* <Button onClick={() => {setRecord(item); setEditUserProfileFormModal(true)}} variant="contained" disableElevation color="primary">
                                              Edit
                                          </Button> */}
                                          <Button 
                                              onClick={ () => { 
                                                  dispatch(addChoosenCourse(item));
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

export default Tab1SelectCourse