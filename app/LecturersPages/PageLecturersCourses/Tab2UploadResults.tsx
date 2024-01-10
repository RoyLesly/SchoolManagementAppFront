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
  const [ fetching, setFetching ] = useState<boolean>(true)
  const [ loading, setLoading ] = useState<boolean>(true)
  const [ count, setCount ] = useState<number>(0)
  const [ allResults, setAllResults ] = useState<ResultProps[]>([])
  const [ allMyResults, setAllMyResults ] = useState<ResultProps[]>([])
  const [record, setRecord] = useState<ResultProps | null>(null)
  const [editResults, setEditResults] = useState<boolean>(false)

  const reset = () => {
    getAllResults(setAllResults, setFetching)
  }

  console.log(choosenCourse)

  useEffect(() => {
    if (count == 0) {
        // if (storeChoosenCourse[0] >= 0) {
        //     getAllResults(setAllMyResults, setFetching, { searchField: "course__id", value: storeChoosenCourse?.id});
        // }
        setCount(count + 1);
    }
    if (count == 1) {
        setCount(count + 1);
        setLoading(false)
    }
  }, [allResults, count, storeUser, storeChoosenCourse])
  

  return (
    <></>
    // <DashboardCard title={`RESULTS FOR - ${storeChoosenCourse && storeChoosenCourse[1]}`} loading={loading}>
    // <DashboardCard title={`RESULTS FOR - `} loading={loading}>
    //   {/* <Box sx={{ overflow: 'auto', width: { xs: '380px', sm: 'auto' },}}>
    //       <Grid container spacing={0}>
    //           {storeChoosenCourse[0] > 0 && <Grid item xs={12}>
    //             <Typography variant='h5' mb="2">
    //                 {storeChoosenCourse?[2]} / {storeChoosenCourse[3]} /  Level {storeChoosenCourse[4]}
    //             </Typography>
    //           </Grid>}
    //           <Grid item xs={12}>
    //               <Table
    //                   aria-label="simple table"
    //                   sx={{
    //                       whiteSpace: "nowrap",
    //                       mt: 0
    //                   }}
    //               >
    //                   <TableHead>
    //                       <TableRow>
                        
    //                           <TableCell>
    //                               <Typography variant="subtitle2" fontWeight={600}>
    //                                   STUDENT NAME
    //                               </Typography>
    //                           </TableCell>

    //                           <TableCell>
    //                               <Typography variant="subtitle2" fontWeight={600}>
    //                                   CA
    //                               </Typography>
    //                           </TableCell>

    //                           <TableCell>
    //                               <Typography variant="subtitle2" fontWeight={600}>
    //                                   EXAM
    //                               </Typography>
    //                           </TableCell>

    //                           <TableCell>
    //                               <Typography variant="subtitle2" fontWeight={600}>
    //                                   RESIT
    //                               </Typography>
    //                           </TableCell>

    //                           <TableCell>
    //                               <Typography variant="subtitle2" fontWeight={600}>
    //                                   STATUS
    //                               </Typography>
    //                           </TableCell>

    //                           <TableCell>
    //                               <Typography variant="subtitle2" fontWeight={600}>
    //                                   ACTION
    //                               </Typography>
    //                           </TableCell>
    //                       </TableRow>
    //                   </TableHead>
    //                   <TableBody>
    //                       {allMyResults.map((item: ResultProps) => (
    //                           <TableRow key={item.id}>
                                  
    //                               <TableCell>
    //                                   <Typography
    //                                       sx={{
    //                                           fontSize: "15px",
    //                                           fontWeight: "500",
    //                                       }}
    //                                   >
    //                                       {item.student.user.first_name} {item.student.user.last_name}
    //                                   </Typography>
    //                               </TableCell>

    //                               <TableCell>
    //                                   <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                       {item.ca}
    //                                   </Typography>
    //                               </TableCell>
    //                               <TableCell>
    //                                   <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                       {item.exam}
    //                                   </Typography>
    //                               </TableCell>
    //                               <TableCell>
    //                                   <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                       {item.resit}
    //                                   </Typography>
    //                               </TableCell>
    //                               <TableCell>
    //                                   <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
    //                                       {item.validated}
    //                                   </Typography>
    //                               </TableCell>
    //                               <TableCell>
    //                                   <Button onClick={() => { setRecord(item); setEditResults(true) }}>Edit</Button>
    //                               </TableCell>
    //                           </TableRow>
    //                       ))}
    //                   </TableBody>
    //               </Table>
    //           </Grid>
              
    //         {allMyResults.length < 1 && <div style={{ flex: 1, alignItems: "center", textAlign: "center", justifyContent: "center", fontSize: "30", paddingTop: 50, paddingBottom: 70, paddingLeft: 60, paddingRight: 25 }}>
    //             No Student Found ...
    //         </div>}  
    //       </Grid>

    //     <EditResultsFormModal
    //         showModal={editResults}
    //         setShowModal={setEditResults}
    //         record={record}
    //         reset={reset}
    //     />

    //   </Box>             */}
    //   {/* </DashboardCard> */}
  )
}

export default Tab2UploadResults