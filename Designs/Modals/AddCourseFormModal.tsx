'use client';
import { Form, Input, Modal, Select, notification } from 'antd'
import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppControlOptimizedQueryUrl, CourseCRUDUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { DataProps, DomainOptimizedType, DropdownUserTeacherType, LevelOptimizedType, MainCourseOptimizedType, SpecialtyOptimizedType } from '@/Utils/types';
import MyButtonSave from '@/Designs/MyButtonSave';
import AddCourseTransversalSelectFormModal from './AddCourseTransversalSelectFormModal';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import { listOfAcademicYears } from '@/Utils/constants';
import { getOptimizedQuery } from '@/Utils/pagination';


const { Option } = Select

interface AddCourseUserFormProps {
    showModal: any
    setShowModal: any
    mainCourses: MainCourseOptimizedType[]
    userTeachers: DropdownUserTeacherType[]
    specialty: SpecialtyOptimizedType[]
    reset: any
}

const AddCourseFormModal:FC<AddCourseUserFormProps> = ({ showModal, userTeachers, specialty, setShowModal, mainCourses, reset }: any) => {

    const storeUserID = useSelector(selectAuthUser).id
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState<number>(0);
    const [specialtyData, setSpecialtyData] = useState<SpecialtyOptimizedType[]>([]);
    const [levels, setLevels] = useState<LevelOptimizedType[]>();
    const [domains, setDomains] = useState<DomainOptimizedType[]>([]);
    const [selectedCourseID, setSelectedCourseID] = useState<number>(0)
    const [selectedDomainID, setSelectedDomainID] = useState<number>(0)
    const [selectedYear, setSelectedYear] = useState(0)
    const [selectedType, setSelectedType] = useState<string>("");
    const [selectedLevel, setSelectedLevel] = useState<number>(0);
    const [showAddTransversalCourses, setShowAddTransversalCourses] = useState<boolean>(false);
    const [firstSelectedID, setFirstSelectedID] = useState<any>(0);
    const [specialtyList, setSpecialtyList] = useState<any>([]);
    
    const onSubmit = async (values: DataProps) => {
        
        values["assigned"] = false
        if (values["assigned_to_id"]){
            values["assigned"] = true
        }
        if (values["specialty_id"]){
   
            setLoading(true);

            const response = await axiosRequest<any>({
                method: "post",
                url: CourseCRUDUrl,
                payload: {...values, created_by_id: storeUserID, updated_by_id: storeUserID},
                hasAuth: true,
            })
        
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

    useEffect(() => {
        if (count == 0) {
            getOptimizedQuery(setDomains, ()=>{}, ()=>{}, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, { model: "Domain", fieldList: ["id", "domain_name"]}) 
            getOptimizedQuery(setLevels, ()=>{}, ()=>{}, ()=>{}, ()=>{}, AppControlOptimizedQueryUrl, { model: "Level", fieldList: ["id", "level"]}) 
            setCount(count + 1); 
        }
        if ( selectedCourseID > 0 && selectedDomainID > 0 && selectedYear != 0 && selectedLevel != 0 && specialty.length > 0 ) {
                const filA = specialty.filter((item: SpecialtyOptimizedType) => item[4] == selectedDomainID);
                const filB = filA.filter((item: SpecialtyOptimizedType) => item[2].includes(selectedYear.toString()))
                const filC = filB.filter((item: SpecialtyOptimizedType) => item[3] == selectedLevel)
                setSpecialtyData(filC)
        }
    }, [count, selectedCourseID, selectedDomainID, selectedYear, selectedLevel, specialty])

    return (
        <>
            <Modal
                title="Assign Course"
                open={showModal}
                onCancel={() => {
                    setShowModal(false); 
                    form.resetFields(); 
                    setSelectedCourseID(0); setSelectedDomainID(0); setSelectedYear(0); setSelectedType(""); setCount(0)
                }}
                footer={false}
            >
                <Form layout='vertical' onFinish={onSubmit} form={form}>

                    <Form.Item label="All Course" name="main_course_id"
                        rules={[{ required: true, message: "Please Input Course Name" }]}
                    >
                        {mainCourses.length > 0 ? <Select placeholder="All Courses" onChange={(e) => setSelectedCourseID(e)}>
                            {mainCourses.map((mc: MainCourseOptimizedType) => <Option key={mc[0]} value={mc[0]}>{mc[1]}</Option>)}
                        </Select> : <div>No Main Courses</div>}
                    </Form.Item>

                    <div className='flex gap-2'>
                        {domains.length > 0 && selectedCourseID > 0 ? <Form.Item label="Select Domain" name="domain_id"
                                rules={[{ required: true, message: "Select Domain" }]}
                            >
                                <Select placeholder="Select Domain" onChange={(e) => setSelectedDomainID(e)}>
                                {domains.map((mc: DomainOptimizedType) => <Option key={mc[0]} value={mc[0]}>{mc[1]}</Option>)}
                            </Select>
                        </Form.Item> : <></>}

                        {selectedDomainID > 0 ? <Form.Item label="Academic YEAR" name="year" className='w-36'
                            rules={[{ required: false, message: "Please Select Academic Year" }]}
                        >
                            <Select onChange={(e) => setSelectedYear(e)}>
                                {listOfAcademicYears?.map((item: any) => (<Option key={item} value={item}>{item}</Option>))}
                            </Select>
                        </Form.Item> : <></>}
                    
                    
                        {selectedYear != 0 ?<Form.Item label="Level" name="level_id"
                            rules={[{ required: true, message: "Please Select Level" }]}
                        >
                            <Select placeholder="Course Type" onChange={(e) => { setSelectedLevel(e); console.log(e) }}>
                                {levels?.map((item: LevelOptimizedType) => <Option key={item[0]} value={item[0]}>{item[1]}</Option>)}
                            </Select>
                        </Form.Item> : <></>}

                        {selectedLevel != 0 ?<Form.Item label="course TYPE" name="course_type"
                            rules={[{ required: true, message: "Please Select Type" }]}
                        >
                            <Select placeholder="Course Type" onChange={(e) => { setSelectedType(e) }}>
                                <Option key="Fundamental" value="Fundamental">Fundamental</Option>
                                <Option key="Transversal" value="Transversal">Transversal</Option>
                                <Option key="Professional" value="Professional">Professional</Option>
                            </Select>
                        </Form.Item> : <></>}
        
                        {selectedType != "" ? 
                            selectedType !== "Transversal" ? <>
                                <Form.Item label="SPECIALTY" name="specialty_id" className='w-full'
                                    rules={[{ required: true, message: "Please Input Course Name" }]}
                                >
                                    <Select placeholder="Specialty" onChange={(e) => {setFirstSelectedID(e)}}>
                                        {specialtyData.map((item: SpecialtyOptimizedType) => <Option key={item[0]} value={item[0]}>{item[1]}-L{item[2]} - {item[6]}</Option>)}
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
                                        options={specialtyData.map(function(elem: SpecialtyOptimizedType) {
                                            return {
                                                label: elem[1] + "-" + elem[2]  + " " + elem[6],
                                                value: elem[0],
                                            }}) 
                                        } 
                                    />
                                </Form.Item>
                            </>
                                : 
                            <></>}
                    </div>
                    {selectedType != "" ? <>
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
                                <Option key={1} value={"I"}>1</Option>
                                <Option key={2} value={"II"}>2</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="ASSIGN TO" name="assigned_to_id"
                            rules={[{ required: true, message: "Please Select Lecturer" }]}
                        >
                            <Select placeholder="Assign To">
                                <Option key={0} value="">----------</Option>
                                {userTeachers?.map((item: DropdownUserTeacherType) => <Option key={item[0]} value={item[0]}>{item[1]} {item[2]}</Option>)}
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <MyButtonSave loading={loading} />
                        </Form.Item></> 
                        : 
                        <></>
        }
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