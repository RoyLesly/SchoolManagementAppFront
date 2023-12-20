// ** React Imports
import { useState, ElementType, useEffect, FC } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import { useDispatch, useSelector } from 'react-redux'
import { selectChoosenUserProfile } from '@/Redux/Reducers/sliceChoosenUserAndProfile'
import { CourseProps } from '@/Utils/types'
import { useGetAllCourses } from '@/Utils/customHooks'
import { useRouter } from 'next/navigation'
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, styled } from '@mui/material'
import { addChoosenCourse } from '@/Redux/Reducers/sliceDomainSpecialityCourse'


interface TabCourseManagementProps {
    setValue: any
}

const Tab2Courses:FC<TabCourseManagementProps> = ({ setValue }) => {

  const router = useRouter()
  const dispatch = useDispatch()
  const storeChoosenUserProfile = useSelector(selectChoosenUserProfile);
  const [ fetching, setFetching ] = useState<boolean>(false)
  const [ courses, setCourses ] = useState<CourseProps[]>([])
  const [ coursesData1, setCoursesData1 ] = useState<CourseProps[]>([])
  const [ coursesData2, setCoursesData2 ] = useState<CourseProps[]>([])

  useGetAllCourses(setCourses, ()=>{}, { searchField: "assigned", value: "True" })
//   useGetAllCourses(setCourses, ()=>{})
  console.log(courses)

  useEffect(() => {
    const fil = courses.filter((item: CourseProps) => item.assigned_to?.id == storeChoosenUserProfile?.user.id)
    setCoursesData1(fil)
    setCoursesData2(fil)
  }, [courses, storeChoosenUserProfile])


  return (
    <CardContent>
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
                            SPECIALTY
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
                {coursesData2.map((item: CourseProps) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: "500",
                                }}
                            >
                                {item.main_course.course_name}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: "500",
                                }}
                            >
                                {item.specialty?.main_specialty?.specialty_name} {item.specialty?.academic_year}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: "500",
                                }}
                            >
                                {item.specialty?.level?.level}
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
    </CardContent>
  )
}

export default Tab2Courses
