import { Form, Input, Modal, Select, notification } from 'antd'
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserCRUDUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { DataProps, UserType } from '@/Utils/types';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import MyButtonUpdate from '@/Designs/MyButtonUpdate';


const { Option } = Select

interface EditUserFormProps {
  showModal: any
  setShowModal: any
  setRecord: any
  record: UserType | undefined
  reset: any
}

const EditUserFormModal:FC<EditUserFormProps> = ({ showModal, setShowModal, reset, record, setRecord }: any) => {

    const storeUserID = useSelector(selectAuthUser).id
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    const onSubmit = async (values: DataProps) => {
        setLoading(true)
        if (values["username"] == "" || values["username"] == undefined || values["username"] == null){
            values["username"] = record["username"].toLowerCase()
        }
        if (values["role"] == "" || values["role"] == undefined || values["role"] == null){
            values["role"] = record["role"]
        }
        if (values["email"] == "" || values["email"] == undefined || values["email"] == null){
            values["email"] = record["email"]
        }
        if (values["is_active"] == undefined || values["is_active"].length < 1){
            values["is_active"] = record["is_active"]
        }
        const payload = {
            ...values, 
            username: values["username"].toLowerCase(),
            updated_by_id: storeUserID
        }

        const response = await axiosRequest<any>({
            method: "put",
            url: UserCRUDUrl + "/" + record.id,
            payload: payload,
            hasAuth: true,
        })

        if (response?.data.success) {
            notification.success({
                message: "Operation Successful",
                description: "User Updated Successfully"
            })
            setLoading(false)
            form.resetFields();
            setRecord([])
            reset()
            setShowModal(false)
        }
        if (response?.data.error) {
            notification.error({
                message: "Operation Failed",
                description: `${JSON.stringify(response.data.error)}`
            })
            setLoading(false)
        }
    }

    return (
        <Modal
            title={`EDIT - ${record?.username}`}
            open={showModal}
            onCancel={() => {setShowModal(false); setRecord(undefined); form.resetFields(); }}
            footer={false}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form} className='bg-teal-700 rounded p-2'>

                <Form.Item label="User Name" name="username"
                    rules={[{ required: false, message: "Please Input User Name" }]}
                >
                    <Input defaultValue={`${record?.username}`} type='text' />
                </Form.Item>

                <Form.Item label="Role" name="role"
                    rules={[{ required: false, message: "Please Input Role" }]}
                >
                    <Select defaultValue={`${record?.role}`}>
                        <Option value="admin">Admin</Option>
                        <Option value="teacher">Teacher</Option>
                        <Option value="student">Student</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Email" name="email"
                    rules={[{ required: false, message: "Please Input Email" }]}
                >
                    <Input defaultValue={`${record?.email}`} type='text' />
                </Form.Item>

                <Form.Item label="Status" name="is_active"
                    rules={[{ required: false, message: "Please Select" }]}
                >
                    <Select defaultValue={"Status"}>
                        <Option value={true}>Active</Option>
                        <Option value={false}>Inactive</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <MyButtonUpdate loading={loading} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditUserFormModal;