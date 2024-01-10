// ** React Imports
import { useState, ElementType, useEffect, FC } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import { useDispatch, useSelector } from 'react-redux'
import { selectChoosenUserProfile } from '@/Redux/Reducers/sliceChoosenUserAndProfile'
import { CourseOptimizedType, CourseProps } from '@/Utils/types'
import { useRouter } from 'next/navigation'
import { Box, CircularProgress, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography, styled } from '@mui/material'
import { addChoosenCourse, removeChoosenCourse } from '@/Redux/Reducers/sliceDomainSpecialityCourse'
import { AppControlOptimizedQueryUrl } from '@/Utils/Config'
import { getOptimizedQuery } from '@/Utils/pagination'
import { CourseFieldList } from '@/Utils/constants'
interface TabCourseManagementProps {
    setValue: any
}

const Tab2Courses:FC<TabCourseManagementProps> = ({ setValue }) => {

  const router = useRouter()
  const dispatch = useDispatch()
  const storeChoosenUserProfile = useSelector(selectChoosenUserProfile);
  const [ fetching, setFetching ] = useState<boolean>(true)
  const [ count, setCount ] = useState<number>(0)
  const [ myCourses, setMyCourses ] = useState<CourseOptimizedType[]>()
  const [ myCoursesData, setMyCoursesData ] = useState<CourseOptimizedType[]>()

  useEffect(() => {
    if (count == 0) {
        dispatch(removeChoosenCourse())
        getOptimizedQuery(setMyCourses, setFetching, ()=>{}, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, { 
            model: "Course", 
            searchField: "assigned_to__id",
            value: storeChoosenUserProfile[15],
            fieldList: [...CourseFieldList]
          });
          if (myCourses) { 
            setMyCoursesData(myCourses)
            setCount(count + 1)
          }
    }
    if (count == 1) {
        console.log("Use Effect Completed ...")
    }

  }, [myCourses, dispatch, count, storeChoosenUserProfile])

  return (
    <CardContent>
        {fetching ? 

            <div className="flex mx-auto px-10 sm:px-40" style={{ margin: 40, fontSize: 14 }}>
                <Typography style={{ marginTop: 20 }} variant="h2">Courses Loading ... </Typography>
                <div style={{ marginTop: 20 }}>
                    <LinearProgress
                        color="info"
                        // fourColor
                        variant="indeterminate"
                    />
                </div>
            </div> 
            
            :

            myCoursesData && myCoursesData?.length > 0 ? 
            
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
                                    SPECIALTY / ACADEMIC YEAR
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    LEVEL
                                </Typography>
                            </TableCell>

                            <TableCell align="center">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    ACTION
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myCoursesData?.map((item: CourseOptimizedType) => (
                            <TableRow key={item[0]}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {item[1]}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        <code><b>{item[2]}</b></code> - {item[3]}
                                    </Typography>
                                </TableCell>
                
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {item[4]}
                                    </Typography>
                                </TableCell>

                                <TableCell align='center'>
                                    <Button 
                                        onClick={ () => { 
                                            dispatch(addChoosenCourse(item)); 
                                            setValue("coursemanagement")
                                        }} 
                                        variant="contained" disableElevation color="primary">
                                        Manage
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
            
            : 
            
            <div className="flex mx-auto px-10 sm:px-40" style={{ margin: 40, fontSize: 14 }}>
                <Typography style={{ marginTop: 20 }} variant="h2">No Courses For {storeChoosenUserProfile[3]} {storeChoosenUserProfile[4]} !!!</Typography>
            </div> 

        }
      
    </CardContent>
  )
}

export default Tab2Courses
