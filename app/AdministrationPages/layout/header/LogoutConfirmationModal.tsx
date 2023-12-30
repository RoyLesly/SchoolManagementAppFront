import { Button, Grid, Typography } from '@mui/material'
import { Modal } from 'antd'
import { useRouter } from 'next/navigation'
import React, { FC, useState } from 'react'


interface LogoutConfirmationModalProps {
    showModal: boolean
    setShowModal: any
    dispatch: any
    remove: any
}
const LogoutConfirmationModal:FC<LogoutConfirmationModalProps> = ({ showModal,setShowModal, dispatch, remove }) => {
    const router = useRouter();
    const [ loggingOut, setLoggingOut ] = useState(false)

    return (
        <Modal
            title={``}
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
        >
            <Grid container spacing={3} sx={{ alignItems: 'center' }} direction="column">
                <Grid item xs={12} mt={4} mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='h1'>Are You Sure To Logout ???</Typography>
                </Grid>
                <Grid item xs={12} mt={2} mb={2} spacing={6} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button style={{ marginRight: 15, color: "black", fontSize: 30, width: 150, backgroundColor: "red" }} variant='outlined' disabled={loggingOut} onClick={() => { router.push("/"); setLoggingOut(true); dispatch(remove())}}>Yes {}</Button>
                    <Button style={{ marginLeft: 15, color: "black", fontSize: 30, width: 150, backgroundColor: "green" }} variant='outlined' onClick={() => setShowModal(false)}>No</Button>
                </Grid>
            </Grid>
        </Modal>
    )
}

export default LogoutConfirmationModal