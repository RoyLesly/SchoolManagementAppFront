import { Form, Input, Modal, notification } from 'antd'
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { LevelCRUDUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { DataProps, LevelProps } from '@/Utils/types';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import MyButtonUpdate from '@/Designs/MyButtonUpdate';


interface EditLevelFormProps {
  showModal: any
  setShowModal: any
  record: LevelProps | null
  reset: any
}

const EditLevelFormModal:FC<EditLevelFormProps> = ({ showModal, setShowModal, reset, record }: any) => {

    const storeUserID = useSelector(selectAuthUser).id
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    
    const onSubmit = async (values: DataProps) => {
        setLoading(true)
        if (values["level"] == "" || values["level"] == undefined || values["level"] == null){
            values["level"] = record["level"]
        }
        const payload = {...values, updated_by_id: storeUserID}

        const response = await axiosRequest<any>({
            method: "put",
            url: LevelCRUDUrl + "/" + record.id,
            payload: payload,
            hasAuth: true,
        })

        setLoading(false)
        if (response?.data.success) {
            notification.success({
                message: "Operation Successful",
                description: "Level Updated Successfully"
            })
            reset();
            setShowModal(false)
            form.resetFields()
        }
        else if (response?.data.errors) {
            console.log(response.data.errors)
            notification.error({
                message: "Operation Failed",
                description: "Level Procedure Failed"
            })
        }
    }

    return (
        <Modal
            title={`EDIT - ${record?.level}`}
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
            destroyOnClose={true}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form} className='bg-teal-700 rounded p-2'>

                <Form.Item label="Level Nummber" name="level"
                    rules={[{ required: false, message: "Please Input Level Number" }]}
                >
                    <Input defaultValue={`${record?.level}`} type='text' />
                </Form.Item>

                <Form.Item>
                    <MyButtonUpdate loading={loading} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditLevelFormModal;