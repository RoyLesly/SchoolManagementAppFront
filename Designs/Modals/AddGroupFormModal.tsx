import { Form, Input, Modal, Button, Select, notification } from 'antd'
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { CreatePermGroupUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { DataProps } from '@/Utils/types';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import MyButtonSave from '@/Designs/MyButtonSave';


const { Option } = Select

interface AddGroupFormProps {
  showModal: any
  setShowModal: any
  reset: any
}

const AddGroupFormModal:FC<AddGroupFormProps> = ({ showModal, setShowModal, reset }: any) => {

    const storeUser = useSelector(selectAuthUser)
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    
    const onSubmit = async (values: DataProps) => {
        setLoading(true)

        const response = await axiosRequest<any>({
            method: "post",
            url: CreatePermGroupUrl,
            payload: {...values, created_by_id: storeUser.id},
            hasAuth: true,
        })

        setLoading(false)
        if (response?.data.success) {
            notification.success({
                message: "Operation Successful",
                description: "Group Added Successfully"
            })
            reset()
            form.resetFields();
        }
        if (response?.data.errors) {
            console.log(response.data.errors)
            notification.error({
                message: "Operation Failed",
                description: "Group Procedure Failed"
            })
        }
    }


    return (
        <Modal
            title="Add New Group"
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form} className='py-10 px-4'>

                <Form.Item label="Group Name" name="name"
                    rules={[{ required: true, message: "Please Input Group Name" }]}
                >
                    <Input placeholder='Group Name' type='text' />
                </Form.Item>

                <Form.Item>
                    <MyButtonSave loading={loading} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddGroupFormModal;