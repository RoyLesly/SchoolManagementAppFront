import { Form, Input, Modal, Button, Select, notification } from 'antd'
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { MainSpecialtyCRUDUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { DataProps, DomainOptimizedType } from '@/Utils/types';
import MyButtonSave from '@//Designs/MyButtonSave';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';


const { Option } = Select

interface AddSpecialtyUserFormProps {
  showModal: any
  setShowModal: any
  domains: DomainOptimizedType[]
  reset: any
}

const AddMainSpecialtyFormModal:FC<AddSpecialtyUserFormProps> = ({ showModal, domains, setShowModal, reset }: any) => {

    const storeUser = useSelector(selectAuthUser)
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    
    const onSubmit = async (values: DataProps) => {
        setLoading(true)

        const response = await axiosRequest<any>({
            method: "post",
            url: MainSpecialtyCRUDUrl,
            payload: {...values, specialty_name: values["specialty_name"].toUpperCase(), created_by_id: storeUser.id, updated_by_id: storeUser.id},
            hasAuth: true,
        })

        setLoading(false)
        if (response?.data.success) {
            notification.success({
                message: "Operation Successful",
                description: "Specialty Added Successfully"
            })
            reset()
            form.resetFields();
        }
        if (response?.data.errors) {
            console.log(response.data.errors)
            notification.error({
                message: "Operation Failed",
                description: "Specialty Procedure Failed"
            })
        }
    }


    return (
        <Modal
            title="Add Specialty"
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form}>

                <Form.Item label="Specialty Name" name="specialty_name"
                    rules={[{ required: true, message: "Please Input Specialty Name" }]}
                >
                    <Input placeholder='Specialty Name' type='text' />
                </Form.Item>

                <Form.Item label="Department" name="domain_id"
                    rules={[{ required: true, message: "Please Input Department Name" }]}
                >
                    <Select>
                        {domains.map((dom: DomainOptimizedType) => <Option key={dom[0]} value={dom[0]}>{dom[1]}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <MyButtonSave loading={loading} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddMainSpecialtyFormModal;