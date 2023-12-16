import { Form, Input, Modal, Select, notification } from 'antd'
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { DomainCRUDUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { DataProps } from '@/Utils/types';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import MyButtonSave from '@/Designs/MyButtonSave';


interface AddDomainFormProps {
  showModal: any
  setShowModal: any
  reset: any
}

const AddDomainFormModal:FC<AddDomainFormProps> = ({ showModal, setShowModal, reset }: any) => {

    const storeUserID = useSelector(selectAuthUser).id
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    
    const onSubmit = async (values: DataProps) => {
        setLoading(true)

        const response = await axiosRequest<any>({
            method: "post",
            url: DomainCRUDUrl,
            payload: {...values, domain_name: values["domain_name"].toUpperCase(), created_by_id: storeUserID},
            hasAuth: true,
        })

        setLoading(false)
        if (response?.data.success) {
            notification.success({
                message: "Operation Successful",
                description: "Domain Added Successfully"
            })
            reset()
            form.resetFields();
        }
        if (response?.data.error) {
            console.log(response.data.error)
            notification.error({
                message: "Operation Failed",
                description : `${JSON.stringify(response.data.error)}`
            })
        }
    }


    return (
        <Modal
            title="Add New Domain"
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form}>

                <Form.Item label="Domain Name" name="domain_name"
                    rules={[{ required: true, message: "Please Input Domain Name" }]}
                >
                    <Input placeholder='Domain Name' type='text' />
                </Form.Item>

                <Form.Item>
                    <MyButtonSave loading={loading} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddDomainFormModal;