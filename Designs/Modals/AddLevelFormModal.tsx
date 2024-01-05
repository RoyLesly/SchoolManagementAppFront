import { Form, Input, Modal, notification } from 'antd'
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { LevelCRUDUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { DataProps } from '@/Utils/types';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import MyButtonSave from '@/Designs/MyButtonSave';


interface AddLevelFormProps {
  showModal: any
  setShowModal: any
  reset: any
}

const AddLevelFormModal:FC<AddLevelFormProps> = ({ showModal, setShowModal, reset }: any) => {

    const storeUser = useSelector(selectAuthUser)
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    
    const onSubmit = async (values: DataProps) => {
        setLoading(true)

        const response = await axiosRequest<any>({
            method: "post",
            url: LevelCRUDUrl,
            payload: {...values, created_by_id: storeUser.id, updated_by_id: storeUser.id},
            hasAuth: true,
        })

        setLoading(false)
        console.log(response)
        if (response?.data.success) {
            notification.success({
                message: "Operation Successful",
                description: "Level Added Successfully"
            })
            reset()
            form.resetFields();
        }
        if (response?.data.error) {
            notification.error({
                message: "Operation Failed",
                description: JSON.stringify(`${response?.data.error}`)
            })
        }
    }

    return (
        <Modal
            title="Create Level"
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form}>

                <Form.Item label="Level Number" name="level"
                    rules={[{ required: true, message: "Please Input Lvel Number" }]}
                >
                    <Input placeholder='Level Number' type='text' />
                </Form.Item>

                <Form.Item>
                    <MyButtonSave loading={loading} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddLevelFormModal;