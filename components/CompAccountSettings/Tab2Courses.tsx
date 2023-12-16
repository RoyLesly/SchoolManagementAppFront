// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import AlertTitle from '@mui/material/AlertTitle'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import MyFormInputText from '@/Designs/MyFormInputText'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { selectChoosenUser } from '@/Redux/Reducers/sliceChoosenUserAndProfile'
import { CourseProps, LevelProps, SpecialtyProps, UserProfile } from '@/Utils/types'
import { axiosRequest } from '@/Utils/functions'
import { selectAuthUser } from '@/Redux/Reducers/sliceUser'
import { useGetAllCourses, useGetAllLevels, useGetAllSpecialties } from '@/Utils/customHooks'
import { notification } from 'antd'
import { useRouter } from 'next/navigation'
import MyButtonLoader from '@/Designs/MyButtonLoader'
import { IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography, styled } from '@mui/material'
import { ArrowCircleRight } from '@mui/icons-material'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))


const Tab2Courses = () => {

  const router = useRouter()
  const dispatch = useDispatch()
  const storeChoosenUser = useSelector(selectChoosenUser);
  const storeUser = useSelector(selectAuthUser)
  const [ levels, setLevels ] = useState<LevelProps[]>([])
  const [ specialties, setSpecialties ] = useState<SpecialtyProps[]>([])
  const [ specialtiesData1, setSpecialtiesData1 ] = useState<SpecialtyProps[]>([])
  const [ specialtiesData2, setSpecialtiesData2 ] = useState<SpecialtyProps[]>([])
  const [ fetching, setFetching ] = useState<boolean>(false)
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ sex, setSex ] = useState<any>("")
  const [ courses, setCourses ] = useState<CourseProps[]>([])
  const [ coursesData1, setCoursesData1 ] = useState<CourseProps[]>([])
  const [ coursesData2, setCoursesData2 ] = useState<CourseProps[]>([])

  useGetAllCourses(setCourses, setFetching)


  useEffect(() => {
    const fil = courses.filter((item: CourseProps) => item.assigned_to?.id == storeChoosenUser?.id)
    setCoursesData1(fil)
    setCoursesData2(fil)
  }, [courses, storeChoosenUser])

  const FilterByYear = (val: any) => {
    const fil = specialties.filter((item: SpecialtyProps) => item.academic_year == val)
    setSpecialtiesData1(fil)
  }
  const FilterByLevel = (val: any) => {
    const fil = specialtiesData1.filter((item: SpecialtyProps) => item.level.id == val)
    setSpecialtiesData2(fil)
  }

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
                                {item.specialty?.main_specialty?.specialty_name}
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

                        <TableCell align='left'>
                            <Stack justifyItems="center" direction="row" spacing={1} justifyContent="center">
                                <Button 
                                  // onClick={() => {setRecord(item); setEditUserProfileFormModal(true)}} 
                                  variant="contained" disableElevation color="primary"
                                >
                                    Edit
                                </Button>
                                <Button 
                                    onClick={ () => { 
                                        // dispatch(addChoosedUserProfile(item)); 
                                        // dispatch(addAccountRole(item.user.role)); 
                                        // router.push("/AdministrationPages/AccountSettings") 
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
    </CardContent>
  )
}

export default Tab2Courses
