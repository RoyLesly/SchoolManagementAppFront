import { Button, Form, Input, Modal, Select, notification } from 'antd';
import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CourseCRUDUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { CourseOptimizedType, DataProps, DropdownUserTeacherType, MainCourseOptimizedType, MainSpecialtyOptimizedType, SpecialtyOptimizedType, UserType } from '@/Utils/types';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import MyButtonUpdate from '@/Designs/MyButtonUpdate';
import { listOfAcademicYears } from '@/Utils/constants';


const { Option } = Select

interface EditCourseFormProps {
  showModal: any
  setShowModal: any
  mainCoursesData: MainCourseOptimizedType[] | []
  userTeachers: DropdownUserTeacherType[]
  specialty: SpecialtyOptimizedType[]
  record: CourseOptimizedType | undefined
  reset: any
  record_name: any
}

const EditCourseFormModal:FC<EditCourseFormProps> = ({ showModal, mainCoursesData, userTeachers, specialty, setShowModal, reset, record, record_name }: any) => {

    const storeUserID = useSelector(selectAuthUser).id
    const [form] = Form.useForm();
    const [count, setCount] = useState<number>(0)
    const [loading, setLoading] = useState(false)
    const [specialtyData, setSpecialtyData] = useState<SpecialtyOptimizedType[]>([]);
    const [year, setYear] = useState<any>(0)
    const [assignedTo, setAssignedTo] = useState<string | null>(null)

    useEffect(() => {
        if (count == 0 && record != null && userTeachers.length > 0) {
            const filB = userTeachers.filter((item: UserType) => item?.id == record?.assigned_to?.id)
            if (filB.length > 0) {
                setAssignedTo((filB[0].first_name + " " + filB[0].last_name))
            }
            setCount(count + 1)
        }

    }, [count, record, userTeachers])

    
    const onSubmit = async (values: DataProps) => {
        setLoading(true)
        if (values["main_course_id"] == "" || values["main_course_id"] == undefined || values["main_course_id"] == null){
            values["main_course_id"] = record[14]
        }
        if (values["course_name"] == "" || values["course_name"] == undefined || values["course_name"] == null){
            values["course_name"] = record[1]
        }
        if (values["course_code"] == "" || values["course_code"] == undefined || values["course_code"] == null){
            values["course_code"] = record[4]
        }
        if (values["course_credit"] == "" || values["course_credit"] == undefined || values["course_credit"] == null){
            values["course_credit"] = record[5]
        }
        if (values["assigned_to_id"] == "" || values["assigned_to_id"] == undefined || values["assigned_to_id"] == null){
            values["assigned_to_id"] = assignedTo ? record[10]: undefined
        }
        if (values["specialty_id"] == "" || values["specialty_id"] == undefined || values["specialty_id"] == null){
            values["specialty_id"] = record[13]
        }
        if (values["assigned_to_id"] > 0){ values["assigned"] = true}
        
        const payload = {...values, course_name: values["course_name"].toUpperCase(), updated_by_id: storeUserID}

        const response = await axiosRequest<any>({
            method: "put",
            url: CourseCRUDUrl + "/" + record[0],
            payload: payload,
            hasAuth: true,
        })

        setLoading(false)
        if (response?.data.success) {
            notification.success({
                message: "Operation Successful",
                description: "Course Updated Successfully"
            })
            reset();
            setShowModal(false)
            form.resetFields()
        }
        else if (response?.data.errors) {
            notification.error({
                message: "Operation Failed",
                description: JSON.stringify(response.data.errors)
            })
        }
        else if (response?.data.error) {
            notification.error({
                message: "Operation Failed",
                description: JSON.stringify(response.data.error)
            })
        }
    }

    const FilterSpecialtyByYear = (year: any) => {
        console.log(year)
        const fil = specialty?.filter((item: SpecialtyOptimizedType) => item[2].includes(year))
        setSpecialtyData(fil)
    }

    return (
        <Modal
            title={`EDIT - ${record_name}`}
            open={showModal}
            onCancel={() => {setShowModal(false); form.resetFields()} }
            footer={false}
            destroyOnClose={true}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form}>              

                <Form.Item label="Course Name" name="main_course_id"
                    rules={[{ required: false, message: "Please Input Course Name" }]}
                >
                    <Select defaultValue={`${record && record[1]}`}>
                        {mainCoursesData.map((mc: MainSpecialtyOptimizedType) => <Option key={mc[0]} value={mc[0]}>{mc[1]}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item label="SELECT ACADEMIC YEAR" name="n"
                    rules={[{ required: false, message: "Please Select Academic Year" }]}
                >
                    <Select defaultValue={`${record && record[9]}`} onChange={(e) => {setYear(e); FilterSpecialtyByYear(year)}}>
                        <Option key="" value="">----------</Option>
                        {listOfAcademicYears.map((item: any) => (<Option key={item} value={item}>{item}</Option>))}
                    </Select>
                </Form.Item>

                <Form.Item label="SPECIALTY" name="specialty_id"
                    rules={[{ required: false, message: "Please Input Course Name" }]}
                >
                    <Select defaultValue={`${record && record[2]}`}>
                        {specialtyData.map((item: SpecialtyOptimizedType) => <Option key={item[0]} value={item[0]}>{item[1]} - {item[2]} L{item[6]} </Option>)}
                    </Select>
                </Form.Item>

                <Form.Item label="Semester" name="semester"
                    rules={[{ required: false, message: "Please Input Semester" }]}
                >
                    <Select defaultValue={`${record && record[3]}`}>
                        <Option key={1} value={"I"}>1</Option>
                        <Option key={2} value={"II"}>2</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Course Code" name="course_code"
                    rules={[{ required: false, message: "Please Input Course Code" }]}
                >
                    <Input defaultValue={`${record && record[4]}`} type='text' id='course_code' />
                </Form.Item>

                <Form.Item label="Course Credit" name="course_credit"
                    rules={[{ required: false, message: "Please Input Course Credit" }]}
                >
                    <Input defaultValue={`${record && record[5]}`} type='text' />
                </Form.Item>


                <Form.Item label="ASSIGN TO" name="assigned_to_id"
                    rules={[{ required: false, message: "Please Select Lecturer" }]}
                >
                    <Select defaultValue={`${record && assignedTo ? record[11] + " " + record[12] : "None"}`}>
                        <Option key={0} value="">----------</Option>
                        {userTeachers.map((item: DropdownUserTeacherType) => <Option key={item[0]} value={item[0]}>{item[1]} {item[2]}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <MyButtonUpdate loading={loading} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditCourseFormModal;