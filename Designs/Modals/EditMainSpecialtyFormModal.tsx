import { Form, Input, Modal, Select, notification } from 'antd'
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { MainSpecialtyCRUDUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { DataProps, DomainProps, MainSpecialtyProps } from '@/Utils/types';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import MyButtonUpdate from '@/Designs/MyButtonUpdate';


const { Option } = Select

interface EditMainSpecialtyFormProps {
  showModal: any
  setShowModal: any
  record: MainSpecialtyProps | null
  domains: DomainProps[]
  reset: any
}

const EditMainSpecialtyFormModal:FC<EditMainSpecialtyFormProps> = ({ showModal, domains, setShowModal, reset, record }: any) => {

    const storeUserID = useSelector(selectAuthUser).id
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    
    const onSubmit = async (values: DataProps) => {
        setLoading(true)
        if (values["specialty_name"] == "" || values["specialty_name"] == undefined || values["specialty_name"] == null){
            values["specialty_name"] = record["specialty_name"]
        }
        if (values["domain_id"] == "" || values["domain_id"] == undefined || values["domain_id"] == null){
            values["domain_id"] = record.domain.id
        }
        const payload = {...values, specialty_name: values["specialty_name"].toUpperCase(), updated_by_id: storeUserID}

        const response = await axiosRequest<any>({
            method: "put",
            url: MainSpecialtyCRUDUrl + "/" + record.id,
            payload: payload,
            hasAuth: true,
        })

        setLoading(false)
        if (response?.data.success) {
            notification.success({
                message: "Operation Successful",
                description: "Main Specialty Updated Successfully"
            })
            reset();
            setShowModal(false)
            form.resetFields()
        }
        else if (response?.data.errors) {
            console.log(response.data.errors)
            notification.error({
                message: "Operation Failed",
                description: "Main Specialty Procedure Failed"
            })
        }
    }

    return (
        <Modal
            title={`EDIT - ${record?.specialty_name}`}
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
            destroyOnClose={true}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form} className='bg-teal-700 rounded p-2'>

                <Form.Item label="Specialty Name" name="specialty_name"
                    rules={[{ required: false, message: "Please Input Specialty Name" }]}
                >
                    <Input defaultValue={`${record?.specialty_name}`} type='text' />
                </Form.Item>

                <Form.Item label="Department" name="domain_id"
                    rules={[{ required: false, message: "Please Select Department" }]}
                >
                    <Select defaultValue={`${record?.domain?.domain_name}`}>
                        {domains.map((dom: DomainProps) => <Option key={dom.id} value={dom.id}>{dom.domain_name}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <MyButtonUpdate loading={loading} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditMainSpecialtyFormModal;