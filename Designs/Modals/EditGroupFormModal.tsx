import { Form, Input, Modal, Select, notification } from 'antd'
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { axiosRequest } from '@/Utils/functions';
import { DataProps, PermGroupsProps } from '@/Utils/types';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import { UpdatePermGroupUrl } from '@/Utils/Config';
import MyButtonUpdate from '@/Designs/MyButtonUpdate';


interface EditGroupFormProps {
  showModal: any
  setShowModal: any
  record: PermGroupsProps | null
  reset: any
}

const EditGroupFormModal:FC<EditGroupFormProps> = ({ showModal, setShowModal, reset, record }: any) => {

    const storeUserID = useSelector(selectAuthUser).id
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    
    const onSubmit = async (values: DataProps) => {
        setLoading(true)
        if (values["name"] == "" || values["name"] == undefined || values["name"] == null){
            values["name"] = record["name"]
        }
        const payload = {...values, updated_by_id: storeUserID}

        const response = await axiosRequest<any>({
            method: "put",
            url: UpdatePermGroupUrl + "/" + record.id,
            payload: payload,
            hasAuth: true,
        })

        setLoading(false)
        if (response?.data.success) {
            notification.success({
                message: "Operation Successful",
                description: "Group Updated Successfully"
            })
            reset();
            setShowModal(false)
            form.resetFields()
        }
        else if (response?.data.errors) {
            console.log(response.data.errors)
            notification.error({
                message: "Operation Failed",
                description: "Group Procedure Failed"
            })
        }
    }

    return (
        <Modal
            title={`EDIT - ${record?.name}`}
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form} className='bg-teal-700 rounded p-2'>

                <Form.Item label="Group Name" name="name"
                    rules={[{ required: false, message: "Please Input Group Name" }]}
                >
                    <Input placeholder={`${record?.name}`} type='text' />
                </Form.Item>

                <Form.Item>
                    <MyButtonUpdate loading={loading} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditGroupFormModal;