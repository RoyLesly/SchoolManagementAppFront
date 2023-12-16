import { Alert, AlertProps, Snackbar } from '@mui/material'
import React, { FC, forwardRef } from 'react'


interface MySnackbarProps {
    message: string
    show: boolean
    setShow: any
    severity: any
}
const MySnackBar:FC<MySnackbarProps> = ({ message, show, setShow, severity}) => {

    const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(
        function SnakbarAlert(props, ref) {
            return <Alert elevation={6} ref={ref} {...props} />
        }
    )
    const handleClose = (e: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setShow(false)
    }
  return (
    <>
        {/* <Snackbar
            open={show}
            onClose={handleClose}
            message={message}
            autoHideDuration={4000}
            anchorOrigin={{ vertical: "top", horizontal: "right"}}
        /> */}
        <Snackbar
            open={show}
            onClose={handleClose}
            autoHideDuration={4000}
            anchorOrigin={{ vertical: "top", horizontal: "right"}}
        >
            <SnackbarAlert onClose={handleClose} severity={severity}>
                {message}
            </SnackbarAlert>
        </Snackbar>
    </>
  )
}

export default MySnackBar