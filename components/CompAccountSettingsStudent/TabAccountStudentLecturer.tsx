// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent, useEffect } from 'react'

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
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addChoosenUserProfile, selectChoosenUserProfile } from '@/Redux/Reducers/sliceChoosenUserAndProfile'
import { LevelProps, SpecialtyProps, UserProfile, UserType } from '@/Utils/types'
import { axiosRequest } from '@/Utils/functions'
import { UserCRUDUrl, UserProfilesUrl } from '@/Utils/Config'
import { addUserProfile, selectAuthUser, selectUserProfile } from '@/Redux/Reducers/sliceUser'
import { useGetAllLevels, useGetAllSpecialties, useGetAllUserProfiles, useGetAllUsers } from '@/Utils/customHooks'
import { notification } from 'antd'
import { useRouter } from 'next/navigation'
import MyButtonLoader from '@/Designs/MyButtonLoader'
import { IconButton, Typography, styled } from '@mui/material'
import ConfirmEmailModal from '@/Designs/Modals/ConfirmEmailModal'

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


const TabAccountStudentLecturer = () => {

  const router = useRouter();
  const [ openConfirmationModal, setOpenConfirmationModal ] = useState<boolean>(false)
  const dispatch = useDispatch()
  const storeProfile = useSelector(selectUserProfile);
  const storeUser = useSelector(selectAuthUser)
  const [ users, setUsers ] = useState<UserType[]>([])
  const [ levels, setLevels ] = useState<LevelProps[]>([])
  const [ specialties, setSpecialties ] = useState<SpecialtyProps[]>([]);
  const [ specialtiesData1, setSpecialtiesData1 ] = useState<SpecialtyProps[]>([]);
  const [ fetching, setFetching ] = useState<boolean>(false);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ profiles, setProfiles ] = useState<UserProfile[]>([]);
  const [ mySpecialties, setMySpecialties ] = useState<any[]>([]);

  useGetAllLevels(setLevels, setFetching)
  useGetAllSpecialties(setSpecialties, setFetching)
  useGetAllUserProfiles(setProfiles, setFetching)
  useGetAllUsers(setUsers, setFetching, { searchField: "id", value: storeUser.id})

  useEffect(() => {
    setSpecialtiesData1(specialties)
  }, [specialties])

  useEffect(() => {
    const storeProfs = profiles.filter((item: UserProfile) => item.user.id == storeUser.id);
    const storeSpec = storeProfs.map((item: UserProfile) => item.specialty);
    if (storeSpec[0] != null) {
      setMySpecialties(storeSpec);
    }
  }, [dispatch, profiles, storeUser])

  useEffect(() => {
    // setSpecialtiesData2(specialtiesData1)
  }, [])

  const defaultValues = {...users[0]};
  const { handleSubmit, reset, control } = useForm<UserType>({
    defaultValues: defaultValues,
  });
  const [openAlert, setOpenAlert] = useState<boolean>(true)
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])
    }
  }

  const onSubmit = async (data: UserType) => {
    console.log(data)
    console.log(defaultValues)
    if (data["first_name"] == "" || data["first_name"] == undefined){
      data["first_name"] = defaultValues["first_name"]
    }
    if (data["last_name"] == "" || data["last_name"] == undefined){
      data["last_name"] = defaultValues["last_name"]
    }
    if (data["telephone"].toString() == "" || data["telephone"] == undefined){
      data["telephone"] = defaultValues["telephone"]
    }
    if (data["email"] == "" || data["email"] == undefined){
      data["email"] = defaultValues["email"]
    }

    let values = {
      ...data, 
      first_name: data.first_name.toUpperCase(),
      last_name: data.last_name.toUpperCase(),
      user_id: data.id,
      username: defaultValues.username,
      role: defaultValues.role,
      updated_by_id: storeUser.id,
      multiple: true,
    }
    setLoading(true)

    const response = await axiosRequest<any>({
        method: "put",
        url: UserCRUDUrl + "/" + defaultValues.id,
        payload: values,
        hasAuth: true,
    })
    
    setLoading(false)

    if (response?.data) {
      if (response.data?.success) {
        dispatch(addUserProfile(response.data.success));
        notification.success({
          "message": "OK",
          "description": "Successfully Updated User"
        });
        router.back();
      }
      if (response.data?.errors) {
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


          <Grid item xs={6}>
            <MyFormInputText 
              name={"username"}
              control={control}
              label={""}
              size={"large"}
              required={true}
              disabled={true}
              defaultValue={defaultValues.username}
            />  
          </Grid>     
          <Grid item xs={6}>
            <MyFormInputText 
              name={"matricle"}
              control={control}
              label={""}
              size={"large"}
              required={true}
              disabled={true}
              defaultValue={defaultValues?.matricle}
            />  
          </Grid>     
          <Grid item xs={12} sm={6}>
            <MyFormInputText 
              name={"first_name"}
              control={control}
              label={""}
              size={"large"}
              required={true}
              defaultValue={defaultValues.first_name}
            />       
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyFormInputText 
              name={"last_name"}
              control={control}
              label={""}
              size={"large"}
              required={true}
              defaultValue={defaultValues.last_name}
            />       
          </Grid> 

          <Grid item xs={12} sm={6}>
            <MyFormInputText 
              name={"telephone"}
              control={control}
              label={""}
              size={"large"}
              required={true}
              defaultValue={defaultValues.telephone}
            />       
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <MyFormInputText 
              name={"email"}
              control={control}
              label={""}
              size={"large"}
              required={true}
              defaultValue={defaultValues.email}
            />       
          </Grid>

          { mySpecialties.length > 0 && storeProfile?.user?.role == "student" ? <Grid container item direction="row" spacing={4}>
            {mySpecialties.map((item: SpecialtyProps) => <Grid key={item?.id} xs={12} sm={6} item direction="row">
              <MyFormInputText
                name={"specialty_id"}
                control={control}
                label={"Specialty"}
                size={"large"}
                required={true}
                disabled={true}
                defaultValue={item?.main_specialty?.specialty_name + " L" + item?.level?.level + " " + item?.academic_year}
              />
            </Grid> )}
          </Grid> : null}

          {!users[0]?.email_confirmed ? (
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
                  <Button onClick={() => {setOpenConfirmationModal(true)}}>
                    Resend Confirmation
                 </Button>
              </Alert>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <Button 
              color="primary"
              variant="contained"
              size="large"
              onClick={handleSubmit(onSubmit)} 
              sx={{ marginRight: 3.5 }}
            >
              Save Changes
            </Button>
            {loading ? <MyButtonLoader 
              fetching={loading}
              loadingText="Saving"
            /> : null}
          </Grid>
        </Grid>
      </form>

      <ConfirmEmailModal
        showModal={openConfirmationModal}
        setShowModal={setOpenConfirmationModal}
        email={defaultValues.email}
        reset={reset}
      />

    </CardContent>
  )
}

export default TabAccountStudentLecturer
