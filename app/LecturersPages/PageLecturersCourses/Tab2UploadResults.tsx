'use client';
import { useGetAllResults } from '@/Utils/customHooks';
import { ResultProps} from '@/Utils/types';
import {
    Typography, Box, Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Stack,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardCard from '@/components/CompAdmin/shared/DashboardCard';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import { choosenCourse } from '@/Redux/Reducers/sliceDomainSpecialityCourse';
import { getAllResults } from '@/Utils/functions';
import EditResultsFormModal from '@/Designs/Modals/EditResultsFormModal';


interface Tab2UploadResultsProps {
  // setSelectedNumber: any
}

const Tab2UploadResults:FC<Tab2UploadResultsProps> = ({  }) => {
  const storeUser = useSelector(selectAuthUser);
  const storeChoosenCourse = useSelector(choosenCourse);
  const router = useRouter();
  const [ fetching, setFetching ] = useState<boolean>(false)
  const [ allResults, setAllResults ] = useState<ResultProps[]>([])
  const [ allMyResults, setAllMyResults ] = useState<ResultProps[]>([])
  const [record, setRecord] = useState<ResultProps | null>(null)
  const [editResults, setEditResults] = useState<boolean>(false)

  useGetAllResults(setAllResults, setFetching);

  const reset = () => {
    getAllResults(setAllResults, setFetching)
  }

  useEffect(() => {
      const filA = allResults.filter((item: ResultProps) => item.course.id == storeChoosenCourse.id);
      setAllMyResults(filA)
  }, [allResults, storeUser, storeChoosenCourse])
  

  return (
    <DashboardCard title={`RESULTS FOR - ${storeChoosenCourse?.main_course?.course_name}`}>
      <Box sx={{ overflow: 'auto', width: { xs: '380px', sm: 'auto' },}}>
          <Grid container spacing={0}>
              <Grid item xs={12}>
                <Typography variant='h5' mb="2">
                    {storeChoosenCourse?.specialty?.academic_year}  /  Level {storeChoosenCourse?.specialty?.level.level}
                </Typography>
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
                                      STUDENT NAME
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
                                      STATUS
                                  </Typography>
                              </TableCell>

                              <TableCell>
                                  <Typography variant="subtitle2" fontWeight={600}>
                                      ACTION
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
                                          {item.student.user.first_name} {item.student.user.last_name}
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
                                          {item.validated}
                                      </Typography>
                                  </TableCell>
                                  <TableCell>
                                      <Button onClick={() => { setRecord(item); setEditResults(true) }}>Edit</Button>
                                  </TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </Grid>
          </Grid>

        <EditResultsFormModal
            showModal={editResults}
            setShowModal={setEditResults}
            record={record}
            reset={reset}
        />

      </Box>            
  </DashboardCard>
  )
}

export default Tab2UploadResults