// ** React Imports
import { FC, useState, ElementType, ChangeEvent, SyntheticEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import AlertTitle from '@mui/material/AlertTitle'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import MyFormInputText from '@/Designs/MyFormInputText'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { selectChoosenUser, selectChoosenUserProfile } from '@/Redux/Reducers/sliceChoosenUserAndProfile'
import { LevelProps, SpecialtyProps, UserProfile, UserType } from '@/Utils/types'
import { axiosRequest } from '@/Utils/functions'
import { UserCRUDUrl, UserProfilesUrl } from '@/Utils/Config'
import { selectAuthUser } from '@/Redux/Reducers/sliceUser'
import { useGetAllLevels, useGetAllSpecialties, useGetAllUsers } from '@/Utils/customHooks'
import { Spin, notification } from 'antd'
import { useRouter } from 'next/navigation'
import MyButtonLoader, { MyButtonLoader2 } from '@/Designs/MyButtonLoader'
import { CircularProgress, FormLabel, IconButton, Input, Typography, styled } from '@mui/material'
import { ArrowCircleRight } from '@mui/icons-material'
import { green } from '@mui/material/colors'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

interface Tab1AccountProps {
}

const Tab1Account:FC<Tab1AccountProps> = ({ }) => {

  const router = useRouter()
  const storeUser = useSelector(selectAuthUser)
  const storeChoosenUserProfile = useSelector(selectChoosenUserProfile);
  const [ loading, setLoading ] = useState<boolean>(false)


  const defaultValues = {...storeChoosenUserProfile.user};
  const { handleSubmit, reset, control } = useForm<UserType>({
    defaultValues: defaultValues,
  });

  const [ openAlert, setOpenAlert ] = useState(false)
  const [ imgSrc, setImgSrc ] = useState<string>('/images/avatars/1.png')

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])
    }
  }

  const onSubmit = async (data: UserType) => {
    setLoading(true)

    if ( (data["first_name"] == null) || (data["last_name"] == null)  || (data['telephone'].toString().length < 9) || (data["email"].length < 1) ) {
      notification.error({
        "message": "EMPTY FIELDS",
        description: "Some Fields Are Empty !!!"
      })
      return
    } else if ( (data["first_name"].length < 1) || (data["last_name"].length < 1)  || (data['telephone'].toString().length < 9) || (data["email"].length < 1) ) {
      notification.error({
        "message": "EMPTY FIELDS",
        description: "Some Fields Are Empty !!!"
      })
      return
    }

    let values = { 
      id: data.id,
      first_name: data.first_name.toUpperCase(),
      last_name: data.last_name.toUpperCase(),
      email: data.email,
      telephone: data.telephone,
      username: defaultValues.username,
      role: defaultValues.role,
      updated_by_id: storeUser.id,
    }
    console.log(values)
    // return


    const response = await axiosRequest<any>({
        method: "put",
        url: UserCRUDUrl + "/" + values.id,
        payload: values,
        hasAuth: true,
    })
    
    if (response?.data) {
      if (response.data.success) {
        notification.success({
          "message": "OK",
          "description": "Successfully Updated User"
        });
        router.back();
      }
      if (response.data.errors) {
        notification.error({
          "message": "FAILED",
          "description": `${JSON.stringify(response.data.errors)}`
        });
      }
      if (response.data.error) {
        notification.error({
          "message": "FAILED",
          "description": `${JSON.stringify(response.data.error)}`
        });
      }
      setLoading(false)
    }
  };

  return (
    <CardContent>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6}>

          <Grid item xs={12} sx={{ marginTop: 4, marginBottom: 1 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Username</FormLabel>
              <Controller
                rules={{ }}
                control={control}
                name="username"
                render={( {field} ) => {
                  console.log(field)
                  return (
                    <Input {...field} />
                  )
                }}
              ></Controller>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} sx={{ width: 300 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">First Name</FormLabel>
              <Controller
                rules={{ }}
                control={control}
                name="first_name"
                render={( {field} ) => {
                  console.log(field)
                  return (
                    <Input {...field} />
                  )
                }}
              ></Controller>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} sx={{ width: 300 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Last Name</FormLabel>
              <Controller
                rules={{ }}
                control={control}
                name="last_name"
                render={( {field} ) => {
                  console.log(field)
                  return (
                    <Input {...field} />
                  )
                }}
              ></Controller>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} sx={{ width: 300 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">TELEPHONE</FormLabel>
              <Controller
                rules={{ }}
                control={control}
                name="telephone"
                render={( {field} ) => {
                  console.log(field)
                  return (
                    <Input {...field} />
                  )
                }}
              ></Controller>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} sx={{ width: 300 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">EMAIL</FormLabel>
              <Controller
                rules={{ }}
                control={control}
                name="email"
                render={( {field} ) => {
                  console.log(field)
                  return (
                    <Input {...field} />
                  )
                }}
              ></Controller>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} sx={{ width: 300 }}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={handleSubmit(onSubmit)} 
              sx={{ marginRight: 3.5 }}
            >
              Save Changes
            </Button>
          </Grid>

        </Grid>

      </form>

      {/* <form>
        <Grid container spacing={6}>

          <Grid item xs={12} sx={{ marginTop: 4, marginBottom: 1 }}>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <MyFormInputText 
              name={"username"}
              control={control}
              label={""}
              size={"large"}
              required={true}
              disabled={true}
              defaultValue={defaultValues?.username}
            />  
          </Grid>     
          <Grid item xs={12} sm={6}>
            <MyFormInputText 
              name={"first_name"}
              control={control}
              label={"First Name"}
              size={"large"}
              required={true}
              defaultValue={defaultValues.first_name}
            />       
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyFormInputText 
              name={"last_name"}
              control={control}
              label={"Last Name"}
              size={"large"}
              required={true}
              defaultValue={defaultValues.last_name}
            />       
          </Grid> 

          <Grid item xs={12} sm={6}>
            <MyFormInputText 
              name={"telephone"}
              control={control}
              label={"Telephone"}
              size={"large"}
              required={true}
              defaultValue={defaultValues.telephone}
            />       
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <MyFormInputText 
              name={"email"}
              control={control}
              label={"Email"}
              size={"large"}
              required={true}
              defaultValue={defaultValues.email}
            />       
          </Grid>

          {openAlert ? (
            <Grid item xs={12} sx={{ mb: 0 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={(e: SyntheticEvent) => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null}

          <Grid item xs={12} direction="row" spacing={3}>
            <Grid>
              <Button
                color="primary"
                variant="contained"
                size="large"
                onClick={handleSubmit(onSubmit)} 
                sx={{ marginRight: 3.5 }}
              >
                Save Changes
              </Button>
              <MyButtonLoader 
                fetching={loading}
                loadingText="Saving"
              />
              <Spin spinning={loading} />
            </Grid>
          </Grid>
        </Grid>
      </form> */}
    </CardContent>
  )
}

export default Tab1Account
