import { Form, Input, Modal, notification } from 'antd'
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { MainCourseCRUDUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { DataProps, MainCourseProps } from '@/Utils/types';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import MyButtonUpdate from '@/Designs/MyButtonUpdate';


interface EditMainCourseFormProps {
  showModal: any
  setShowModal: any
  record: MainCourseProps | null
  reset: any
}

const EditMainCourseFormModal:FC<EditMainCourseFormProps> = ({ showModal, setShowModal, reset, record }: any) => {

    const storeUserID = useSelector(selectAuthUser).id
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    
    const onSubmit = async (values: DataProps) => {
        setLoading(true)
        if (values["course_name"] == "" || values["course_name"] == undefined || values["course_name"] == null){
            values["course_name"] = record["course_name"].toUpperCase()
        }
        if (values["course_code"] == "" || values["course_code"] == undefined || values["course_code"] == null){
            values["course_code"] = record["course_code"]
        }
        if (values["course_credit"] == "" || values["course_credit"] == undefined || values["course_credit"] == null){
            values["course_credit"] = record["course_credit"]
        }
        const payload = {...values, course_name: values["course_name"].toUpperCase(), updated_by_id: storeUserID}

        const response = await axiosRequest<any>({
            method: "put",
            url: MainCourseCRUDUrl + "/" + record.id,
            payload: payload,
            hasAuth: true,
        })

        setLoading(false)
        if (response?.data.success) {
            notification.success({
                message: "Operation Successful",
                description: "Main Course Updated Successfully"
            })
            setShowModal(false)
            form.resetFields()
        } else if (response?.data.error) {
            console.log(response.data.error)
            notification.error({
                message: "Operation Failed",
                description: JSON.stringify(response.data.error)
            })
        }
    }

    return (
        <Modal
            title={`EDIT - ${record?.course_name}`}
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
            destroyOnClose={true}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form} className='bg-teal-700 rounded p-2'>

                <Form.Item label="Course Name" name="course_name"
                    rules={[{ required: false, message: "Please Input Course Name" }]}
                >
                    <Input defaultValue={`${record?.course_name}`} type='text' />
                </Form.Item>

                <Form.Item>
                    <MyButtonUpdate loading={loading} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditMainCourseFormModal;