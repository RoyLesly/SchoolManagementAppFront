import { Box, Button, Grid, Typography } from '@mui/material'
import { Modal } from 'antd'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'


interface NotLoggedInModalProps {
    showModal: boolean
    setShowModal: any
}
const NotLoggedInModal:FC<NotLoggedInModalProps> = ({ showModal,setShowModal }) => {
    const router = useRouter();

    return (
        <Modal
            title={``}
            open={showModal}
            onCancel={() => {}}
            // onCancel={() => setShowModal(false)}
            footer={false}
        >
            <Grid container spacing={3} sx={{ alignItems: 'center' }} direction="column">
                <Grid item xs={12} mt={4} mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='h1'>NOT LOGGED IN !!!</Typography>
                </Grid>
                <Grid item xs={12} mt={2} mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button variant='outlined' onClick={() => router.push("/")}>Login Again</Button>
                </Grid>
            </Grid>
        </Modal>
    )
}

export default NotLoggedInModal