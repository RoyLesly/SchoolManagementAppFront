import { Box, Button, Modal, Typography } from '@mui/material'
import React, { FC } from 'react'
import MySnackBar from '../MySnackBar'
import MyFormInputText from '../MyFormInputText'
import MyFormSelect from '../MyFormSelect'
import { useForm } from 'react-hook-form'


interface ConfirmEmailModalProps {
    showModal: any
    setShowModal: any
    email: string
    reset: any
  }

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface IFormInput {
    email: string;
}

const defaultValues = {
    email: "",
};
const ConfirmEmailModal:FC<ConfirmEmailModalProps> = ({ showModal, setShowModal, email }: any) => {
    const [ iHaveCode, setIHaveCode ] = React.useState<boolean>(false);
    const [ alertShow, setAlertShow ] = React.useState<boolean>(false);
    const [ alertMessage, setAlertMessage ] = React.useState<string>("false");
    const [ alertSeverity, setAlertSeverity ] = React.useState<string>("success");

    const { handleSubmit, reset, control } = useForm<IFormInput>({
        defaultValues: defaultValues,
    });
    const onSubmit = async (data: any) => {
    // const payload = {...data, created_by_id: storeUser.id}

    // const response = await axiosRequest<any>({
    //     method: "post",
    //     url: UserCRUDUrl,
    //     payload: payload,
    //     hasAuth: true,
    // })

    // setAlertShow(true)
    // if (response?.data.success) {
    //   setShowModal(false)
    //   setAlertSeverity("success");
    //   setAlertMessage("Operation Success")  
    //   resetItems();
    //   reset();
    // }
    // if (response?.data.errors) {
    //   setAlertSeverity("warning");
    //   setAlertMessage("Operation Failed");
    // }
    // if (response?.data?.error) {
    //   setAlertSeverity("error");
    //   setAlertMessage(`${response.data.error}`);    }
    };

    return (
        <div>
            <Modal
                open={showModal}
                onClose={() => {setShowModal(false)}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    {iHaveCode ? <>
                        <Box mt={4} mb={4}>
                            <Box m={2} sx={{ width: "100" }}>
                                <Typography sx={{color: "red"}}>
                                    Enter Code Below
                                </Typography>
                            </Box>
                            <Box m={2} sx={{ width: "100" }}>
                            <MyFormInputText 
                                name={"code"}
                                control={control}
                                label={"CODE"}
                                />
                            </Box>
                            <Box m={2} sx={{ width: "100" }}>
                                <Button onClick={handleSubmit(onSubmit)} variant={"contained"} fullWidth>
                                    Validate Code
                                </Button>
                            </Box>
                            <Box m={2} sx={{ width: "100", marginTop: 10 }}>
                                <Typography sx={{color: "blue"}}>
                                    <code className='cursor-pointer' onClick={() => {setIHaveCode(false)}}>Send Code</code>
                                </Typography>
                            </Box>
                        </Box>
                    </> 
                    
                    : 
                    
                    <>
                        <Box mt={4} mb={4}>
                            <Box m={2} sx={{ width: "100" }}>
                                <Typography sx={{color: "red"}}>
                                    Send Code to This Email
                                </Typography>
                                <Typography sx={{color: "blue"}}>
                                    <code>{email}</code>
                            </Typography>
                        </Box>

                            
                            <Box m={2} sx={{ width: "100" }}>
                                <Button onClick={handleSubmit(onSubmit)} variant={"contained"} fullWidth>
                                    SEND
                                </Button>
                            </Box>
                            <Box m={2} sx={{ width: "100", marginTop: 10 }}>
                                <Typography sx={{color: "blue"}}>
                                    <code className='cursor-pointer' onClick={() => {setIHaveCode(true)}}>I have code</code>
                                </Typography>
                            </Box>
                            
                        </Box>
                    </>

                    }   
                    
                </Box>
            </Modal>
            <MySnackBar 
                show={alertShow}
                setShow={setAlertShow}
                message={alertMessage}
                severity={alertSeverity}
            />
        </div>
    )
}

export default ConfirmEmailModal