import { Form, Input, Modal, notification } from 'antd'
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { ResultRUDUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { ResultOptimizedType } from '@/Utils/types';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import MyButtonUpdate from '@/Designs/MyButtonUpdate';


interface EditResultsFormProps {
  showModal: any
  setShowModal: any
  record: ResultOptimizedType | undefined
  reset: any
  setRecord: any
}


const EditResultsFormModal:FC<EditResultsFormProps> = ({ showModal, setShowModal, reset, record, setRecord }: any) => {

    const storeUser = useSelector(selectAuthUser)
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    
    const onSubmit = async (values: any) => {
        values["validated"] = false

        if (values["ca"] == "" || values["ca"] == undefined || values["ca"] == null){
            values["ca"] = record[4]
        }
        if (values["exam"] == "" || values["exam"] == undefined || values["exam"] == null){
            values["exam"] = record[5]
        }
        if (values["resit"] == "" || values["resit"] == undefined || values["resit"] == null){
            values["resit"] = record[6]
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
        if ((parseInt(values["ca"]) + parseInt(values["exam"])) >= 50 || (parseInt(values["ca"]) + parseInt(values["resit"])) >= 50){
            values["validated"] = true
        }
       
        const payload = {
            ...values, 
            course_id: record[12], 
            student_id: record[11], 
            updated_by_id: storeUser.id
        }

        console.log(payload)
        // return
        setLoading(true)

        const response = await axiosRequest<any>({
            method: "put",
            url: ResultRUDUrl + "/" + record[0],
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
            notification.error({
                message: "Operation Failed",
                description: `${JSON.stringify(response.data.errors)}`
            })
        }
        else if (response?.data.error) {
            notification.error({
                message: "Operation Failed",
                description: `${JSON.stringify(response.data.error)}`
            })
        }
    }

    return (
        <Modal
            title={`EDIT - ${record && record[2]} ${record && record[3]} - ${record && record[1]} `}
            open={showModal}
            onCancel={() => { setShowModal(false); setRecord(undefined) }}
            footer={false}
            destroyOnClose={true}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form} className='bg-teal-700 rounded p-2'>

                <Form.Item label="CA" name="ca"
                    rules={[{ required: false, message: "Please Input CA" }]}
                >
                    <Input defaultValue={`${record && record[4]}`} type='number' max={30} />
                </Form.Item>

                <Form.Item label="EXAM" name="exam"
                    rules={[{ required: false, message: "Please Input EXAM" }]}
                >
                    <Input defaultValue={`${record && record[5]}`} type='number' max={70}/>
                </Form.Item>

                <Form.Item label="RESIT" name="resit"
                    rules={[{ required: false, message: "Please Input RESIT" }]}
                >
                    <Input defaultValue={`${record && record[6]}`} type='number' max={60}/>
                </Form.Item>

                <Form.Item>
                    <MyButtonUpdate loading={loading} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditResultsFormModal;