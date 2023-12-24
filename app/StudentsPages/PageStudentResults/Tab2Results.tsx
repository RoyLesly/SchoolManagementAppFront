'use client';
import { useGetAllResults } from '@/Utils/customHooks';
import { ResultProps } from '@/Utils/types';
import {
    Typography, Box, Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardCard from '@/components/CompAdmin/shared/DashboardCard';
import { selectChoosenUserProfile } from '@/Redux/Reducers/sliceChoosenUserAndProfile';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';


interface Tab2ResultsProps {
  // setSelectedNumber: any
}

const Tab2Results:FC<Tab2ResultsProps> = ({  }) => {
  const storeUser = useSelector(selectAuthUser);
  const storeChoosenUserProfile = useSelector(selectChoosenUserProfile);
  const [ fetching, setFetching ] = useState<boolean>(false)
  const [ allResults, setAllResults ] = useState<ResultProps[]>([])
  const [ allMyResults, setAllMyResults ] = useState<ResultProps[]>([])

  useGetAllResults(setAllResults, setFetching);

  useEffect(() => {
      const filA = allResults.filter((item: ResultProps) => item.student.id == storeChoosenUserProfile.id);
      const filB = filA.filter((item: ResultProps) => item.course?.specialty?.id == storeChoosenUserProfile?.specialty?.id);
      setAllMyResults(filB)
  }, [allResults, storeUser, storeChoosenUserProfile])  

  const calcTotalMarks = (ca: any, exam: any, resit: any ) => {
    let sum: number = 0
    if (resit != null) {
        sum = parseInt(ca) + parseInt(resit)
    } else {
        sum = parseInt(ca) + parseInt(exam)
    }
    if (isNaN(sum)){ return "N/A"}
    return sum
  }

  const checkValidated = (mark: any) => {
    if (mark > 49.9 && mark < 100.1) {
        return <Typography variant='h5' style={{ color: "green"}}>Validated</Typography>
    } 
    else if (mark < 50) {
        return <Typography variant='h5' style={{ color: "red"}}>Not Validated</Typography>
    } 
  }

  return (
    <DashboardCard title={`RESULTS FOR ${storeChoosenUserProfile?.specialty?.main_specialty.specialty_name} ${storeChoosenUserProfile?.specialty?.level.level} `}>
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
                                      COURSE NAME
                                  </Typography>
                              </TableCell>

                              <TableCell>
                                  <Typography variant="subtitle2" fontWeight={600}>
                                      CA
                                  </Typography>
                              </TableCell>

                              <TableCell>
                                  <Typography variant="subtitle2" fontWeight={600}>
                                      EXAM
                                  </Typography>
                              </TableCell>

                              <TableCell>
                                  <Typography variant="subtitle2" fontWeight={600}>
                                      RESIT
                                  </Typography>
                              </TableCell>

                              <TableCell>
                                  <Typography variant="subtitle2" fontWeight={600}>
                                      TOTAL
                                  </Typography>
                              </TableCell>

                              <TableCell>
                                  <Typography variant="subtitle2" fontWeight={600}>
                                      STATUS
                                  </Typography>
                              </TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {allMyResults.map((item: ResultProps) => (
                              <TableRow key={item.id}>
                                  
                                  <TableCell>
                                      <Typography
                                          sx={{
                                              fontSize: "15px",
                                              fontWeight: "500",
                                          }}
                                      >
                                          {item.course.main_course.course_name}
                                      </Typography>
                                  </TableCell>

                                  <TableCell>
                                      <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                          {item.ca}
                                      </Typography>
                                  </TableCell>
                                  <TableCell>
                                      <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                          {item.exam}
                                      </Typography>
                                  </TableCell>
                                  <TableCell>
                                      <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                          {item.resit}
                                      </Typography>
                                  </TableCell>
                                  <TableCell>
                                      <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {calcTotalMarks(item.ca, item.exam, item.resit)}
                                      </Typography>
                                  </TableCell>
                                  <TableCell>
                                      <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                          {checkValidated(calcTotalMarks(item.ca, item.exam, item.resit))}
                                      </Typography>
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

export default Tab2Results