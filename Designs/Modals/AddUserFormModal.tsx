import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form";
import MyFormInputText from '../MyFormInputText';
import { Button } from '@mui/material';
import MyFormSelect from '../MyFormSelect';
import { UserCRUDUrl } from '@/Utils/Config';
import { axiosRequest } from '@/Utils/functions';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';
import MySnackBar from '@/Designs/MySnackBar';

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


interface AddUserFormProps {
    showModal: any
    setShowModal: any
    resetItems: any
}

interface IFormInput {
  username: string;
  role: string;
}

const defaultValues = {
  username: "",
  role: "",
};
  
const AddUserFormModal:React.FC<AddUserFormProps> = ({ showModal, setShowModal, resetItems }) => {
  const storeUser = useSelector(selectAuthUser);
  const [ alertShow, setAlertShow ] = React.useState<boolean>(false)
  const [ alertMessage, setAlertMessage ] = React.useState<string>("false")
  const [ alertSeverity, setAlertSeverity ] = React.useState<string>("success")

  const { handleSubmit, reset, control } = useForm<IFormInput>({
    defaultValues: defaultValues,
  });
  const onSubmit = async (data: IFormInput) => {
    const payload = {
      ...data, 
      username: data["username"].toLowerCase(),
      created_by_id: storeUser.id}

    const response = await axiosRequest<any>({
        method: "post",
        url: UserCRUDUrl,
        payload: payload,
        hasAuth: true,
    })

    if (response?.data.success) {
      setAlertShow(true)
      setShowModal(false)
      setAlertSeverity("success");
      setAlertMessage("Operation Success")  
      resetItems();
      reset();
    }
    if (response?.data.errors) {
      setAlertShow(true)
      setAlertSeverity("warning");
      setAlertMessage(JSON.stringify(response?.data.errors));
    }
    if (response?.data?.error) {
      setAlertShow(true)
      setAlertSeverity("error");
      setAlertMessage(`${response.data.error}`);    }
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

          <Box mb={2}>
            <MyFormInputText 
              name={"username"}
              control={control}
              label={"Username"}
            />
          </Box>

          <Box mt={4} mb={4}>
            <MyFormSelect
              name={"role"}
              control={control}
              label={"Role"}
              selectItems={[
                {displayName: "Admin", value: "admin"},
                {displayName: "Lecturer", value: "teacher"},
                {displayName: "Student", value: "student"},
              ]}
            />
          </Box>

          <Box mb={2}>
            <MyFormInputText 
              name={"email"}
              control={control}
              label={"Email"}
            />
          </Box>

          <Box m={2} sx={{ width: "100" }}>
            <Button onClick={handleSubmit(onSubmit)} variant={"contained"} fullWidth>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
      <MySnackBar 
        show={alertShow}
        setShow={setAlertShow}
        message={alertMessage}
        severity={alertSeverity}
      />
    </div>
  );
}

export default AddUserFormModal;