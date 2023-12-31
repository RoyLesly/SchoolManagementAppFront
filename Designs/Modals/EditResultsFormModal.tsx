import { Form, Input, Modal, notification } from 'antd'
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { DomainCRUDUrl, ResultRUDUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { DataProps, ResultProps } from '@/Utils/types';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import MyButtonUpdate from '@/Designs/MyButtonUpdate';


interface EditResultsFormProps {
  showModal: any
  setShowModal: any
  record: ResultProps | null
  reset: any
}

const EditResultsFormModal:FC<EditResultsFormProps> = ({ showModal, setShowModal, reset, record }: any) => {

    const storeUser = useSelector(selectAuthUser)
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    
    const onSubmit = async (values: DataProps) => {
  
        if (values["ca"] == "" || values["ca"] == undefined || values["ca"] == null){
            values["ca"] = record["ca"]
        }
        if (values["exam"] == "" || values["exam"] == undefined || values["exam"] == null){
            values["exam"] = record["exam"]
        }
        if (values["resit"] == "" || values["resit"] == undefined || values["resit"] == null){
            values["resit"] = record["resit"]
        }
        if (values["ca"] > 30 || values["ca"] < 0){
            notification.error({
                message: "Invalid Range !!!",
                description: "Valid Range 0 - 30"
            })
            return;
        }
        if (values["exam"] > 70 || values["exam"] < 0){
            notification.error({
                message: "Invalid Range !!!",
                description: "Valid Range 0 - 70"
            })
            return;
        }
        if (values["resit"] > 60 || values["resit"] < 0){
            notification.error({
                message: "Invalid Range !!!",
                description: "Valid Range 0 - 60"
            })
            return;
        }
        setLoading(true)

        const payload = {
            ...values, 
            course_id: record.course.id, 
            student_id: record.student.id, 
            updated_by_id: storeUser.id
        }

        const response = await axiosRequest<any>({
            method: "put",
            url: ResultRUDUrl + "/" + record.id,
            payload: payload,
            hasAuth: true,
        })

        setLoading(false)

        if (response?.data.success) {
            notification.success({
                message: "Operation Successful",
                description: "Result Updated Successfully"
            })
            reset();
            setShowModal(false)
            form.resetFields()
        }
        else if (response?.data.errors) {
            console.log(response.data.errors)
            notification.error({
                message: "Operation Failed",
                description: `${JSON.stringify(response.data.errors)}`
            })
        }
        else if (response?.data.error) {
            console.log(response.data.error)
            notification.error({
                message: "Operation Failed",
                description: `${JSON.stringify(response.data.error)}`
            })
        }
    }

    return (
        <Modal
            title={`EDIT - ${record?.student?.user?.first_name} ${record?.student?.user?.last_name}`}
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
            destroyOnClose={true}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form} className='bg-teal-700 rounded p-2'>

                <Form.Item label="CA" name="ca"
                    rules={[{ required: false, message: "Please Input CA" }]}
                >
                    <Input defaultValue={`${record?.ca}`} type='number' max={30} />
                </Form.Item>

                <Form.Item label="EXAM" name="exam"
                    rules={[{ required: false, message: "Please Input EXAM" }]}
                >
                    <Input defaultValue={`${record?.exam}`} type='number' max={70}/>
                </Form.Item>

                <Form.Item label="RESIT" name="resit"
                    rules={[{ required: false, message: "Please Input RESIT" }]}
                >
                    <Input defaultValue={`${record?.resit}`} type='number' max={60}/>
                </Form.Item>

                <Form.Item>
                    <MyButtonUpdate loading={loading} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditResultsFormModal;