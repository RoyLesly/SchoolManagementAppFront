// ** React Imports
import { FC, useState, ElementType, ChangeEvent, SyntheticEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import CardContent from '@mui/material/CardContent'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import MyFormInputText from '@/Designs/MyFormInputText'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { selectChoosenUserProfile } from '@/Redux/Reducers/sliceChoosenUserAndProfile'
import { CustomUserOptimizedType, UserType } from '@/Utils/types'
import { axiosRequest } from '@/Utils/functions'
import { UserCRUDUrl, UserControlOptimizedQueryUrl } from '@/Utils/Config'
import { selectAuthUser } from '@/Redux/Reducers/sliceUser'
import { useRouter } from 'next/navigation'
import MyButtonLoader from '@/Designs/MyButtonLoader'
import { IconButton, InputLabel, Typography, styled } from '@mui/material'
import { Spin, notification } from 'antd'
import { getOptimizedQuery } from '@/Utils/pagination'
import { CustomUserFieldList, currentAcademicYear } from '@/Utils/constants'
import { FlashOffOutlined } from '@mui/icons-material'
import { removeChoosenCourse } from '@/Redux/Reducers/sliceDomainSpecialityCourse'

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
  const dispatch = useDispatch();
  const storeUser = useSelector(selectAuthUser)
  const storeChoosenUserProfile = useSelector(selectChoosenUserProfile);
  const [ customUser, setCustomUser ] = useState<CustomUserOptimizedType[]>()
  const [ count, setCount ] = useState<number>(0)
  const [ loading, setLoading ] = useState<boolean>(false)


  useEffect(() => {
    if (count == 0) {
      dispatch(removeChoosenCourse())
      getOptimizedQuery(setCustomUser, ()=>{}, ()=>{}, ()=>{}, ()=>{}, UserControlOptimizedQueryUrl, { 
        model: "CustomUser", 
        searchField: "id",
        value: storeChoosenUserProfile[15],
        fieldList: [...CustomUserFieldList]
      });
      if (customUser) { 
        setCount(count + 1)
      }
    }
  }, [count, dispatch, customUser, storeChoosenUserProfile])

  const defaultValues = customUser ? [...customUser[0]] : [];
  const { handleSubmit, reset, control } = useForm<any>({
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

    const EmptyFieldChecker = (a: any, b: any) => {
      if ((a == undefined && b == undefined) || (a == '' && b == '') || (a == null && b == null)) {
        notification.error({
          "message": "EMPTY FIELDS",
          description: "Some Fields Are Empty !!!"
        })
        return true
      }
      return false
    }
    const AssignValueToEmptyField = (a: any, b: any, c: string) => {
      
      if ((a == undefined && b != undefined) || (a == '' && b != '') || (a == null && b != null)) {
        console.log("HERE", a, b, c)
        if (c == "id") { data["id"] = b}
        if (c == "username") { data["username"] = b}
        if (c == "matricle") { data["matricle"] = b}
        if (c == "first_name") { data["first_name"] = b}
        if (c == "last_name") { data["last_name"] = b}
        if (c == "telephone") { data["telephone"] = b}
        if (c == "email") { data["email"] = b}
      }
      return false
    }

    if (EmptyFieldChecker(data["first_name"] , defaultValues[3])) return;
    if (EmptyFieldChecker(data["last_name"] , defaultValues[4])) return;
    if (EmptyFieldChecker(data["telephone"] , defaultValues[6])) return;
    if (EmptyFieldChecker(data["email"] , defaultValues[7])) return;

    if (AssignValueToEmptyField(data["id"], defaultValues[0], "id")) return;
    if (AssignValueToEmptyField(data["username"], defaultValues[1], "username")) return;
    if (AssignValueToEmptyField(data["matricle"], defaultValues[2], "matricle")) return;
    if (AssignValueToEmptyField(data["first_name"], defaultValues[3], "first_name")) return;
    if (AssignValueToEmptyField(data["last_name"], defaultValues[4], "last_name")) return;
    if (AssignValueToEmptyField(data["telephone"], defaultValues[6], "telephone")) return;
    if (AssignValueToEmptyField(data["email"], defaultValues[7], "email")) return;

    setLoading(true)

    let values = { 
      id: data.id,
      first_name: data.first_name.toUpperCase(),
      last_name: data.last_name.toUpperCase(),
      email: data.email,
      telephone: data.telephone,
      username: defaultValues[1],
      role: defaultValues[10],
      updated_by_id: storeUser.id,
    }

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
          "description": "Successfully Updated User Account"
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

      <form>
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

          <Grid item xs={12} sm={6}>
            <InputLabel>Username</InputLabel>
            <MyFormInputText 
              name={"username"}
              control={control}
              label={""}
              size={"large"}
              required={true}
              disabled={true}
              defaultValue={defaultValues[1]}
            />  
          </Grid>     
          <Grid item xs={12} sm={6}>
            <InputLabel>Matricle</InputLabel>
            <MyFormInputText 
              name={"matricle"}
              control={control}
              label={""}
              size={"large"}
              required={true}
              disabled={true}
              defaultValue={defaultValues[2]}
            />  
          </Grid>     
          <Grid item xs={12} sm={6}>
            <InputLabel>First Name</InputLabel>
            <MyFormInputText 
              name={"first_name"}
              control={control}
              label={""}
              size={"large"}
              required={true}
              defaultValue={defaultValues[3]}
            />       
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Last Name</InputLabel>
            <MyFormInputText 
              name={"last_name"}
              control={control}
              label={""}
              size={"large"}
              required={true}
              defaultValue={defaultValues[4]}
            />       
          </Grid> 

          <Grid item xs={12} sm={6}>
            <InputLabel>Telephone</InputLabel>
            <MyFormInputText 
              name={"telephone"}
              control={control}
              label={""}
              size={"large"}
              required={true}
              defaultValue={defaultValues[6]}
            />       
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <InputLabel>Email</InputLabel>
            <MyFormInputText 
              name={"email"}
              control={control}
              label={""}
              size={"large"}
              required={true}
              defaultValue={defaultValues[7]}
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
      </form>
    </CardContent>
  )
}

export default Tab1Account
