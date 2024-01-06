import { Form, Input, Modal, notification } from 'antd'
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { DomainCRUDUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { DataProps, DomainOptimizedType, DomainProps } from '@/Utils/types';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import MyButtonUpdate from '@/Designs/MyButtonUpdate';


interface EditDomainFormProps {
  showModal: any
  setShowModal: any
  record: DomainOptimizedType | undefined
  reset: any
}

const EditDomainFormModal:FC<EditDomainFormProps> = ({ showModal, setShowModal, reset, record }: any) => {

    const storeUserID = useSelector(selectAuthUser).id
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    const onSubmit = async (values: DataProps) => {
        if (values["domain_name"] == "" || values["domain_name"] == undefined || values["domain_name"] == null){
            values["domain_name"] = record[1]
        }
        const payload = {...values, domain_name: values["domain_name"].toUpperCase(), updated_by_id: storeUserID}

        const response = await axiosRequest<any>({
            method: "put",
            url: DomainCRUDUrl + "/" + record[0],
            payload: payload,
            hasAuth: true,
        })

        setLoading(false)
        if (response?.data.success) {
            notification.success({
                message: "Operation Successful",
                description: "Domain Updated Successfully"
            })
            reset();
            setShowModal(false)
            form.resetFields()
        }
        else if (response?.data.error) {
            console.log(response.data.error)
            notification.error({
                message: "Operation Failed",
                description: "Domain Procedure Failed"
            })
        }
    }

    return (
        <Modal
            title={`EDIT - ${record && record[1]}`}
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
            destroyOnClose={true}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form} className='bg-teal-700 rounded p-2'>

                <Form.Item label="Domain Name" name="domain_name"
                    rules={[{ required: false, message: "Please Input Domain Name" }]}
                >
                    <Input defaultValue={`${record && record[1]}`} type='text' />
                </Form.Item>

                <Form.Item>
                    <MyButtonUpdate loading={loading} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditDomainFormModal;