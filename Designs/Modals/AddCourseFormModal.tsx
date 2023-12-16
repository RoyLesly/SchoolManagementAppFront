'use client';
import { Button, Form, Input, Modal, Select, notification } from 'antd'
import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CourseCRUDUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { DataProps, MainCourseProps, SpecialtyProps, UserProfile } from '@/Utils/types';
import MyButtonSave from '@/Designs/MyButtonSave';
import AddCourseTransversalSelectFormModal from './AddCourseTransversalSelectFormModal';
import { FormatColorResetOutlined } from '@mui/icons-material';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';


const { Option } = Select

interface AddCourseUserFormProps {
  showModal: any
  setShowModal: any
  mainCourses: MainCourseProps[]
  profile: UserProfile[]
  specialty: SpecialtyProps[]
  reset: any
}

const AddCourseFormModal:FC<AddCourseUserFormProps> = ({ showModal, profile, specialty, setShowModal, mainCourses, reset }: any) => {

    const storeUserID = useSelector(selectAuthUser).id
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [mainCoursesData, setMainCoursesData] = useState<MainCourseProps[]>([]);
    const [specialtyData, setSpecialtyData] = useState<SpecialtyProps[]>([]);
    const [profileData, setProfileData] = useState<UserProfile[]>([]);
    const [courseData, setCourseData] = useState<any>();
    const [year, setYear] = useState(0)
    const [yearList, setYearList] = useState<any>();
    const [type, setType] = useState<string>("");
    const [showAddTransversalCourses, setShowAddTransversalCourses] = useState<boolean>(false);
    const [firstSelectedID, setFirstSelectedID] = useState<any>(0);
    const [specialtyList, setSpecialtyList] = useState<any>([]);


    useEffect(() => {
      setMainCoursesData(mainCourses)
    }, [mainCourses])
    useEffect(() => {
      setSpecialtyData(specialty)
    }, [specialty])
    useEffect(() => {
        const filA = profile?.filter((item: UserProfile) => item?.user?.role.includes("teacher"))
        setProfileData(filA)
      }, [profile])
    
    const onSubmit = async (values: DataProps) => {
        
        values["assigned"] = false
        if (values["assigned_to_id"]){
            values["assigned"] = true
        }
        if (values["specialty_id"]){
   
            setLoading(true)

            const response = await axiosRequest<any>({
                method: "post",
                url: CourseCRUDUrl,
                payload: {...values, created_by_id: storeUserID, updated_by_id: storeUserID},
                hasAuth: true,
            })
        
            console.log(response)
            if (response?.data.success) {
                notification.success({
                    message: "Operation Successful",
                    description: "Course Added Successfully"
                })
                reset()
            }
            if (response?.data.errors) {
                notification.error({
                    message: "Operation Failed",
                    description: "Course Procedure Failed"
                })
            }
        }
        if (values["specialty_list_id"]){
            values["specialty_list_id"].forEach(async (element: any) => {
                const response = await axiosRequest<any>({
                    method: "post",
                    url: CourseCRUDUrl,
                    payload: {...values, specialty_id: element, created_by_id: storeUserID, updated_by_id: storeUserID},
                    hasAuth: true,
                })

                if (response?.data.success) {
                    notification.success({
                        message: "Operation Successful",
                        description: "Course Added Successfully"
                    });
                    reset()
                }
                if (response?.data.error) {
                    notification.error({
                        message: "Operation Failed",
                        description: JSON.stringify(response.data.error)
                    })
                }
            });
            setLoading(true)
        }

        setLoading(false)

    }

    const thisYear = new Date().getFullYear()
    useEffect(() => {
        const list = []
        for (let index = 0; index < 2; index++) {
            list.push((thisYear + index) + "/" + (thisYear + index + 1))
        }
        setYearList(list)
        const fil = specialty.filter((item: SpecialtyProps) => item.academic_year.includes(year.toString()))
        setSpecialtyData(fil)
    }, [thisYear, year, specialty])

    return (
        <>
            <Modal
                title="Assign Course"
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={false}
            >
                <Form layout='vertical' onFinish={onSubmit} form={form}>

                    <Form.Item label="All Course" name="main_course_id"
                        rules={[{ required: true, message: "Please Input Course Name" }]}
                    >
                        <Select placeholder="All Courses">
                            {mainCoursesData.map((mc: MainCourseProps) => <Option key={mc.id} value={mc.id}>{mc?.course_name}</Option>)}
                        </Select>
                    </Form.Item>

                    <div className='flex gap-2'>
                        <Form.Item label="Select YEAR" name="year" className='w-36'
                            rules={[{ required: false, message: "Please Select Academic Year" }]}
                        >
                            <Select onChange={(e) => setYear(e)}>
                                {yearList?.map((item: any) => (<Option key={item} value={item}>{item}</Option>))}
                            </Select>
                        </Form.Item>

                        <Form.Item label="TYPE" name="course_type"
                            rules={[{ required: true, message: "Please Select Type" }]}
                        >
                            <Select placeholder="Course Type" onChange={(e) => { setType(e) }}>
                                <Option key="Fundamental" value="Fundamental">Fundamental</Option>
                                <Option key="Transversal" value="Transversal">Transversal</Option>
                                <Option key="Professional" value="Professional">Professional</Option>
                            </Select>
                        </Form.Item>
        
                        {year ? 
                            type !== "Transversal" ? <>
                                <Form.Item label="SPECIALTY" name="specialty_id" className='w-full'
                                    rules={[{ required: true, message: "Please Input Course Name" }]}
                                >
                                    <Select placeholder="Specialty" onChange={(e) => {setFirstSelectedID(e)}}>
                                        {specialtyData.map((item: SpecialtyProps) => <Option key={item.id} value={item.id}>{item?.main_specialty?.specialty_name}-L{item?.level?.level} - {item?.academic_year}</Option>)}
                                    </Select>
                                </Form.Item>
                            </> 
                                : 
                            <>
                                <Form.Item label="SPECIALTY LIST" name="specialty_list_id" className='w-full bg-red-300 rounded'>
                                    <Select 
                                        className='bg-red-300'
                                        placeholder="Select Specialties"
                                        mode="multiple"
                                        defaultValue={[]}
                                        style={{ width: '100%' }}
                                        // onChange={(e) => { console.log(e) }}
                                        options={specialtyData.map(function(elem: SpecialtyProps) {
                                            return {
                                                label: elem?.main_specialty?.specialty_name + "-" + elem?.level?.level  + " " + elem?.academic_year ,
                                                value: elem?.id,
                                            }}) 
                                        } 
                                    />
                                </Form.Item>
                            </>
                                : 
                            <></>}
                    </div>

                    <Form.Item label="Course Code" name="course_code"
                        rules={[{ required: true, message: "Please Input Course Code" }]}
                    >
                        <Input placeholder='Course Name' type='text' />
                    </Form.Item>

                    <Form.Item label="Course Credit" name="course_credit"
                        rules={[{ required: true, message: "Please Input Course Credit" }]}
                    >
                        <Input placeholder='Course Credit' type='text' />
                    </Form.Item>

                    <Form.Item label="SEMESTER" name="semester"
                        rules={[{ required: true, message: "Please Select SEMESTER" }]}
                    >
                        <Select placeholder="SEMESTER">
                            <Option key={1} value={1}>1</Option>
                            <Option key={2} value={2}>2</Option>
                            <Option key={3} value={3}>3</Option>
                            <Option key={4} value={4}>4</Option>
                            <Option key={5} value={5}>5</Option>
                            <Option key={6} value={6}>6</Option>
                            <Option key={7} value={7}>7</Option>
                            <Option key={8} value={8}>8</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="ASSIGN TO" name="assigned_to_id"
                        rules={[{ required: false, message: "Please Select Lecturer" }]}
                    >
                        <Select placeholder="Assign To">
                            <Option key={0} value="">----------</Option>
                            {/* {profileData?.map((item: UserProfile) => <Option key={item.id} value={item.id}>{item?.first_name} {item?.last_name}</Option>)} */}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <MyButtonSave loading={loading} />
                        {/* {type == "Transversal" && <MyButtonSave loading={loading} />} */}
                        {/* {type == "Transversal" && <Button onClick={() => { setShowAddTransversalCourses(true) }} className='w-full bg-blue-3500'>Select Specialties</Button>} */}
                    </Form.Item>
                </Form>
            </Modal>

            <AddCourseTransversalSelectFormModal 
                showModal={showAddTransversalCourses}
                setShowModal={setShowAddTransversalCourses}
                specialtyData={specialtyData}
                setShowMainModal={setShowModal}
                setSpecialtyList={setSpecialtyList}
                firstSelectedID={firstSelectedID}
            />
        </>
    )
}

export default AddCourseFormModal;