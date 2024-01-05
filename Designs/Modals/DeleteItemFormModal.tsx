import { Form, Modal, notification } from 'antd'
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { axiosRequest } from '@/Utils/functions';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import { Button, Stack } from '@mui/material';



interface DeleteItemFormProps {
  showModal: any
  setShowModal: any
  record_name: string | undefined
  record: any
  reset: any
  url: string
}

const DeleteItemFormModal:FC<DeleteItemFormProps> = ({ showModal, setShowModal, url, record_name, reset, record }: any) => {

    const storeUserID = useSelector(selectAuthUser).id
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    // console.log(record)

    
    const onSubmit = async () => {
        setLoading(true)

        const response = await axiosRequest<any>({
            method: "delete",
            url: url + "/" + record.id,
            payload: {"deleted_by_id": storeUserID},
            hasAuth: true,
        })

        setLoading(false)
        if (response?.data.success) {
            notification.success({
                message: "Operation Successful",
                description: record_name + " Deleted Successfully"
            })
            reset();
            form.resetFields();
            setShowModal(false);
        }
        if (response?.data.errors) {
            notification.error({
                message: "Operation Failed",
                description : `${JSON.stringify(response.data.errors)}`
            })
        }
    }

    return (
        <Modal
            title={`Delete ${record_name?.toUpperCase()}`}
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
        >
            <div className='flex flex-col flex-wrap text-3xl p-4 bg-teal-600 gap-6 items-center justify-center'>
                <h1>DELETE {record_name?.toUpperCase()}</h1>
                <div className='px-6 items-center'>ARE YOU SURE TO DELETE</div>
                <div className='px-6 items-center uppercase text-yellow-400 font-bold'>{record_name}</div>
                
                <Stack spacing={4} direction="row">
                    <Button onClick={() => {setShowModal(false)}}>Cancel</Button>
                    <Button onClick={() => {onSubmit()}}>Delete</Button>
                </Stack>
            </div>
        </Modal>
    )
}

export default DeleteItemFormModal;