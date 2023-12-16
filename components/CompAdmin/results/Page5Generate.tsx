'use client';
import { choosenCourse, choosenSpecialty } from '@/Redux/Reducers/sliceDomainSpecialityCourse';
import { useGetAllResults, useGetAllUsers } from '@/Utils/customHooks';
import PageContainer from '@/app/AdministrationPages/components/container/PageContainer';
import { Box, Button, Grid, Input, Stack, Typography } from '@mui/material';
import { CourseProps, ResultProps, UserProfile, UserType } from '@/Utils/types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Table } from 'antd';
import FetchingDataIndicator from '@/Designs/FetchingDataIndicator';
import MyButtonView from '@/Designs/MyButtonView';
import EditResultsFormModal from '@/Designs/Modals/EditResultsFormModal';
import { getAllResults } from '@/Utils/functions';
import PrintTranscriptModal from '@/Designs/Modals/PrintTranscriptModal';
import { addPrintResults } from '@/Redux/Reducers/sliceResults';

const Page5Generate = () => {
  const dispatch = useDispatch()
  const [fetching, setFetching] = useState(false)
  const [showPrint, setShowPrint] = useState(false)
  const [users, setUsers] = useState<UserType[]>([])

  const [results, setResults] = useState<ResultProps[]>([])
  const [resultsForSelectedStudent, setResultsForSelectedStudent] = useState<ResultProps[]>([])
  const [resultsForSelectedYearStudent, setResultsForSelectedYearStudent] = useState<ResultProps[]>([])
  const [selectedStudentAcademicYear, setSelectedStudentAcademicYear] = useState<string[]>([])
  const [selectedStudentLevels, setSelectedStudentLevels] = useState<number[]>([])
  const [selectedAcademicYearToPrint, setSelectedAcademicYearToPrint] = useState<string[]>([])

  const [resultsDataList, setResultsDataList] = useState<ResultProps[]>([])
  const [record, setRecord] = useState<ResultProps | null>(null)
  const [editResults, setEditResults] = useState<boolean>(false)

  useGetAllResults(setResults, setFetching)
  useGetAllUsers(setUsers, setFetching, { searchField: "role", value: "student"})

  const reset = () => {
    getAllResults(setResults, setFetching)
  }

  useEffect(() => {
    const getAcadyear = resultsForSelectedStudent.map((item: ResultProps) => item.course.specialty.academic_year);
    const getLevels = resultsForSelectedStudent.map((item: ResultProps) => item.course.specialty.level.level);
    setSelectedStudentAcademicYear([ ...new Set(getAcadyear)])
    setSelectedStudentLevels([ ...new Set(getLevels)])
  }, [resultsForSelectedStudent])

  const COLUMNS_RESULTS = [    
    {title: "COURSE CODE", dataIndex: "course", 
        render: (item: CourseProps) => <div className='italic font-semibold tracking-widest'>
            {item?.course_code}
        </div>
    },                                                                   
    {title: "COURSE NAME", dataIndex: "course", 
        render: (item: CourseProps) => <div className='italic font-semibold tracking-widest'>
            {item?.main_course.course_name}
        </div>
    },                                                                   
    {title: "SEMESTER", dataIndex: "course", 
        render: (item: CourseProps) => <div className='italic font-semibold tracking-widest'>
            {item?.semester}
        </div>
    },                                                                   
    {title: "CA", dataIndex: "ca", 
        render: (item: string) => <div className='italic font-semibold tracking-widest'>
            {item}
        </div>
    },                       
    {title: "EXAM", dataIndex: "exam", 
        render: (item: string) => <div className='italic font-semibold tracking-widest'>
            {item}
        </div>
    },                       
    {title: "RESIT", dataIndex: "resit", 
        render: (item: string) =>  <div className='italic font-semibold tracking-widest'>
            {item}
        </div>
    },                       
    {title: "ACTION", 
        render: (item: ResultProps) =>  <div className='italic font-semibold tracking-widest'>
            <MyButtonView setSelNum={ () => {} } nextTabNumber={"4"} />
            <Button onClick={() => { setRecord(item); setEditResults(true); }}>Edit</Button>
        </div>
    },                       
           
  ]

  const OnSelectStudent = (val: any) => {
    const filterResultByStudentId = results.filter((item: ResultProps) => item?.student?.user?.id == val)
    setResultsForSelectedStudent(filterResultByStudentId)
  }

  const OnSelectAcademicYear = (val: any) => {
    console.log(val)
    if (Array.isArray(val)) {
      setResultsForSelectedYearStudent(resultsForSelectedStudent)
    } else {
      const filterResultByYear = resultsForSelectedStudent.filter((item: ResultProps) => item?.course.specialty.academic_year == val)
      setResultsForSelectedYearStudent(filterResultByYear)
    }
    setSelectedAcademicYearToPrint(val)
  }
  console.log(selectedStudentAcademicYear)

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={3}>
              <Box>            
                <div className={`bg-black rounded ${fetching ? "px-4" : ""}`}><FetchingDataIndicator fetching={fetching} /></div>
              </Box>
              <Box>
                <div className='cursor-pointer rounded bg-blue-100 w-full text-center hover:bg-blue-500 font-semibold italic'>
                  <Select
                    style={{ width: 220 }}
                    placeholder="Student Name or Matricle"
                    showSearch
                    onSelect={OnSelectStudent}
                    filterOption={(input, option) => option ? option.children ? option.children.join("").toLowerCase().includes(input.toLowerCase()) : false : false}
                  >
                    {users.map((u: UserType) => <Select.Option Key={u.id} value={u.id}>{u.first_name} {u.last_name} {u.matricle}</Select.Option>)}
                  </Select>
                </div>
              </Box>
              {selectedStudentAcademicYear.length > 0 ?
                <Box>
                  <Select
                    style={{ width: 200 }}
                    placeholder="Select Academic Year"
                    onSelect={OnSelectAcademicYear}
                  >
                    <>
                      {selectedStudentAcademicYear.map((item: string, index: number) => 
                        <Select.Option Key={index} value={item}>{item} Level-{selectedStudentLevels[index]}</Select.Option>)
                      }
                      <Select.Option Key={selectedStudentAcademicYear} value={selectedStudentAcademicYear}>All Levels</Select.Option>
                    </>
                  </Select>
                </Box> : <></>}
            </Stack>
          </Grid>

          <Grid 
            key="x"
            item xs={12}
            marginBottom={1}
            justifyContent="center"
            alignItems="center"
          >
            {resultsForSelectedYearStudent.length > 0 ? <>
              <Typography justifyContent="center" display="flex" variant='h4'>{resultsForSelectedYearStudent[0].student.user?.first_name} {resultsForSelectedYearStudent[0].student.user?.last_name}</Typography>
              <Typography justifyContent="center" display="flex" variant='h5'>{resultsForSelectedYearStudent[0].course.specialty.main_specialty.specialty_name}</Typography>
              <Typography justifyContent="center" display="flex" variant='h6'>LEVEL-{resultsForSelectedYearStudent[0].course.specialty.level.level} Results</Typography>
              <Box justifyContent="center">
                <Button 
                  className='mx-auto'
                  onClick={() => { dispatch(addPrintResults(resultsForSelectedYearStudent)); setShowPrint(true); }}
                >
                  Preview Results
                </Button>
              </Box>
            </> 
              : 
              <></>
            }
          </Grid>


          <Grid item xs={12}>
            <Stack>
              <Box>
                {resultsForSelectedYearStudent.length > 0 ? <Table
                    dataSource={resultsForSelectedYearStudent}
                    columns={COLUMNS_RESULTS}  
                  /> 
                  : 
                  <></>
                }
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <EditResultsFormModal 
        showModal={editResults}
        setShowModal={setEditResults}
        record={record}
        reset={reset}
      />

      <PrintTranscriptModal
        open={showPrint}
        setOpen={setShowPrint}
        selectedAcademicYearToPrint={selectedAcademicYearToPrint}
        dataToPrint={resultsForSelectedYearStudent}
      />

    </PageContainer>
  )
}

export default Page5Generate