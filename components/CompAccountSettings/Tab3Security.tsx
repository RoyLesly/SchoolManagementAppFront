// ** React Imports
import { ChangeEvent, MouseEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import KeyOutline from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import MyFormInputText from '@/Designs/MyFormInputText'
import { useForm } from 'react-hook-form'
import { axiosRequest } from '@/Utils/functions'
import { useSelector } from 'react-redux'
import { notification } from 'antd'
import { CreateUpdateResetPasswordUrl, UserProfilesUrl } from '@/Utils/Config'
import MyButtonLoader from '@/Designs/MyButtonLoader'
import ResetPasswordFormModal from '@/Designs/Modals/RestPasswordFormModal'
import { selectAuthUser, selectUserProfile } from '@/Redux/Reducers/sliceUser'
import { selectChoosenUser } from '@/Redux/Reducers/sliceChoosenUserAndProfile'

interface State {
  newPassword: string
  currentPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showCurrentPassword: boolean
  showConfirmNewPassword: boolean
}

const Tab3Security = () => {

  const storeUser = useSelector(selectAuthUser);
  const storeChoosenUser = useSelector(selectChoosenUser);
  const storeProfile = useSelector(selectUserProfile);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ resetPasswordModal, setResetPasswordModal ] = useState<boolean>(false);
  console.log(storeChoosenUser)

  const defaultValues = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };
  const { handleSubmit, reset, control } = useForm({
    defaultValues: defaultValues,
  });
  // ** States
  const [values, setValues] = useState<State>({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })

  const onSubmit = async () => {
    if (values["newPassword"].length < 4) {
      notification.error({
        "message": "Password Short",
        "description": "Must be Greater Than 3"
      });
      return;
    }

    if (values["newPassword"] != values["confirmNewPassword"]) {
      notification.error({
        "message": "Password Not Matching !!!",
        "description": ""
      });
      return;
    }
    setLoading(true)


    let value = {
      ...values,
      user_id: storeChoosenUser.id,
      password: values["currentPassword"],
      updating_password: true,
      updated_by_id: storeUser.id,
      action: "updating_password",
    }

    const response = await axiosRequest<any>({
        method: "post",
        url: CreateUpdateResetPasswordUrl,
        payload: value,
        hasAuth: true,
    })

    if (response?.data) {
      if (response.data.success) {
        notification.success({
          "message": "OK",
          "description": "Successfully Updated Password"
        });
        // router.back();
      }
      if (response.data.errors) {
        notification.error({
          "message": "Check Password",
          "description": `${JSON.stringify(response.data.errors)}`
        });
      }
      if (response.data.error) {
        notification.error({
          "message": "CHECK PASSWORD",
          "description": `${JSON.stringify(response.data.error)}`
        });
      }
    }
    setLoading(false)
    
  };

  // Handle Current Password
  const handleCurrentPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }
  const handleMouseDownCurrentPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle New Password
  const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }
  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }
  const handleMouseDownConfirmNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <>
      <form>
        <CardContent sx={{ paddingBottom: 0 }}>
          <Grid container spacing={5} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Grid container spacing={4}>
                
                <Grid item xs={12} sx={{ marginTop: 3 }} container justifyContent="center">
                  <Typography>Change Password For - {storeChoosenUser.first_name} {storeChoosenUser.last_name}</Typography>
                </Grid>

                <Grid item xs={12} sx={{ marginTop: 1 }}>
                  <MyFormInputText
                    name={"username"}
                    // id='account-settings-current-password'
                    control={control}
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    label={""}
                    size={"large"}
                    required={true}
                    customInput={
                      <>
                      <InputLabel htmlFor='account-settings-current-password'>Current Password</InputLabel>
                      <OutlinedInput fullWidth
                        label='Current Password'
                        value={values.currentPassword}
                        id='account-settings-current-password'
                        type={values.showCurrentPassword ? 'text' : 'password'}
                        onChange={handleCurrentPasswordChange('currentPassword')}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              aria-label='toggle password visibility'
                              onClick={handleClickShowCurrentPassword}
                              onMouseDown={handleMouseDownCurrentPassword}
                            >
                              {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                            </IconButton>
                          </InputAdornment>
                        }
                      /></>
                    }
                    // defaultValue={defaultValues.user.username}
                  />  
                </Grid>

                <Grid item xs={12} sx={{ marginTop: 4 }}>
                <MyFormInputText
                    name={"username"}
                    // id='account-settings-current-password'
                    control={control}
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    label={""}
                    size={"large"}
                    required={true}
                    customInput={
                      <>
                      <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
                      <OutlinedInput fullWidth
                        label='New Password'
                        value={values.newPassword}
                        id='account-settings-current-password'
                        type={values.showNewPassword ? 'text' : 'password'}
                        onChange={handleNewPasswordChange('newPassword')}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              aria-label='toggle password visibility'
                              onClick={handleClickShowNewPassword}
                              onMouseDown={handleMouseDownNewPassword}
                            >
                              {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                            </IconButton>
                          </InputAdornment>
                        }
                      /></>
                    }
                    // defaultValue={defaultValues.user.username}
                  />  
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm New Password</InputLabel>
                    <OutlinedInput
                      label='Confirm New Password'
                      value={values.confirmNewPassword}
                      id='account-settings-confirm-new-password'
                      type={values.showConfirmNewPassword ? 'text' : 'password'}
                      onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            aria-label='toggle password visibility'
                            onClick={handleClickShowConfirmNewPassword}
                            onMouseDown={handleMouseDownConfirmNewPassword}
                          >
                            {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>

        <Grid item xs={12} container justifyContent="center">
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            sx={{ marginTop: 5 }}
            onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
          >
            Clear Fields
          </Button>
        </Grid>

        <Divider sx={{ marginTop: 4, marginBottom: 4 }} />

        <Grid item xs={12} container justifyContent="center" marginBottom={2}>
          <Grid item xs={12} container justifyContent="center">
            <Button 
              color="primary"
              variant="contained"
              size="large"
              onClick={handleSubmit(onSubmit)} 
              sx={{ marginRight: 1 }}
            >
              Update Password
            </Button>
            <MyButtonLoader
              fetching={loading}
              loadingText="Saving"
            />
            <Button
              type='reset'
              variant='contained'
              color='secondary'
              sx={{ marginLeft: 1, backgroundColor: "red" }}
              onClick={() => setResetPasswordModal(true)}
            >
              Reset Password
            </Button>
          </Grid>
        </Grid>     
      </form>
      <ResetPasswordFormModal
        showModal={resetPasswordModal}
        setShowModal={setResetPasswordModal}
      />
    </>
  )
}
export default Tab3Security
