import { Modal, message, notification } from 'antd'
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserCRUDUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { UserType } from '@/Utils/types';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';


interface DeleteUserFormProps {
  showModal: any
  setShowModal: any
  record: UserType | null
  reset: any
}

const DeleteUserFormModal:FC<DeleteUserFormProps> = ({ showModal, setShowModal, reset, record }: any) => {

    const storeUserID = useSelector(selectAuthUser).id
    const [loading, setLoading] = useState(false)
    
    const onSubmit = async () => {
        setLoading(true)
        if (storeUserID == record.id){
            message.error("Cannot Delete Your Self !!!");
            return
        }

        const response = await axiosRequest<any>({
            method: "delete",
            url: UserCRUDUrl + "/" + record.id,
            payload: {"deleted_by_id": storeUserID},
            hasAuth: true,
        })

        setLoading(false)
        if (response?.data.success) {
            notification.success({
                message: "Operation Successful",
                description: "User Deleted Successfully"
            })
            console.log("Deleted")
            reset();
            setShowModal(false);
        }
        if (response?.data.errors) {
            console.log(response.data.errors)
            notification.error({
                message: "Operation Failed",
                description: "User Procedure Failed"
            })
        }
    }


    return (
        <Modal
            title="Delete User"
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
        >
            <div className='flex flex-col flex-wrap text-3xl p-4 bg-teal-600 gap-6 items-center justify-center'>
                <h1>DELETE {record?.username}</h1>
                <div className='px-6 items-center'>ARE YOU SURE TO DELETE</div>
                <div className='px-6 items-center uppercase'>{record?.username}</div>
                <div className='flex gap-10 w-full'>
                    <div onClick={() => {setShowModal(false)}} className='bg-blue-700 rounded-xl w-full text-center text-lg py-1 font-semibold cursor-pointer'>Cancel</div>
                    <div onClick={() => {onSubmit()}} className='bg-red-500 rounded-xl w-full text-center text-lg py-1 font-semibold cursor-pointer'>Delete</div>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteUserFormModal;