'use client';
import { Form, Input, Modal, Select, notification } from 'antd'
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { CreateUpdateResetPasswordUrl, UserCRUDUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import { Button, Grid, Typography } from '@mui/material';
import { selectChoosenUser, selectChoosenUserProfile } from '@/Redux/Reducers/sliceChoosenUserAndProfile';


const { Option } = Select

interface ResetPasswordFormProps {
  showModal: any
  setShowModal: any
}

const ResetPasswordFormModal:FC<ResetPasswordFormProps> = ({ showModal, setShowModal }: any) => {

    const storeUser = useSelector(selectAuthUser);
    const storeChoosenUser = useSelector(selectChoosenUser);
    const [loading, setLoading] = useState(false);

    const Reset = async () => {
        const payload = {
            updated_by_id: storeUser.id, 
            account_to_reset_id: storeChoosenUser.id,
            password: "0000",
            action: "resetting_password"
        }
        const response = await axiosRequest<any>({
            method: "post",
            url: CreateUpdateResetPasswordUrl,
            payload: payload,
            hasAuth: true,
        })

        setLoading(false)
        if (response?.data.success) {
            notification.success({
                message: "Operation Successful",
                description: "Password Reset Successfully"
            })
            setShowModal(false)
        }
        if (response?.data.error) {
            notification.error({
                message: "Operation Failed",
                description : `${JSON.stringify(response.data.error)}`
            })
        }
    }

    return (
        <Modal
            title={`Reset Password - ${storeChoosenUser?.first_name} ${storeChoosenUser?.last_name}`}
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
        >
            <Grid item xs={12} sx={{ marginTop: 3 }} container justifyContent="center">
                <Typography alignContent="center" variant='h2'>Are You Sure to Reset Account Password ? </Typography>
                <Typography alignContent="center" variant='h1'>NB</Typography>
                <Typography alignContent="center" variant='h5'><code>{storeChoosenUser?.first_name} will not be able to login with old password</code></Typography>
                <Typography alignContent="center" variant='h5'><code>The New Password after successful Reset will be</code></Typography>
                <Typography alignContent="center" variant='h3'>0000</Typography>
                <Grid item xs={12} sx={{ marginTop: 3 }} container justifyContent="center">
                    <Button onClick={() => {Reset()}}>Reset</Button>
                </Grid>
            </Grid>
        </Modal>
    )
}

export default ResetPasswordFormModal;