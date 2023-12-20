// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import MyFormInputText from '@/Designs/MyFormInputText'
import { UserType } from '@/Utils/types'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { axiosRequest } from '@/Utils/functions'
import { addUserProfile, selectAuthUser, selectUserProfile } from '@/Redux/Reducers/sliceUser'
import { UserCRUDUrl, UserProfilesUrl } from '@/Utils/Config'
import { notification } from 'antd'
import MyButtonLoader from '@/Designs/MyButtonLoader'
import { useGetAllUsers } from '@/Utils/customHooks'

const TabInfoStudentLecturer = () => {
  const router = useRouter();
  const dispatch = useDispatch();  
  const storeUser = useSelector(selectAuthUser);
  const storeProfile = useSelector(selectUserProfile);
  const [ loading, setLoading ] = useState<boolean>(false)

  const [ sex, setSex ] = useState<string>("")
  const [ hod, setHod ] = useState<boolean>(false)
  const [ title, setTitle ] = useState<string>("")
  const [ users, setUsers ] = useState<UserType[]>([])

  useGetAllUsers(setUsers, ()=>{}, { searchField: "id", value: storeUser.id })

  useEffect(() => {
    setHod(users[0]?.hod ? users[0]?.hod : false)
    setSex(users[0]?.sex ? users[0].sex : "")
    setTitle(users[0]?.title ? users[0].title : "")
  }, [users])

  const defaultValues = {...users[0]};
  const { handleSubmit, reset, control } = useForm<UserType>({
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: UserType) => {
    setLoading(true)
    let values = {
      ...data, 
      user_id: data.id,
      sex: sex,
      hod: hod,
      title: title,
      updated_by_id: storeUser.id,
      username: defaultValues["username"],
      email: defaultValues["email"],
      role: defaultValues["role"],
    }

    const response = await axiosRequest<any>({
        method: "put",
        url: UserCRUDUrl + "/" + defaultValues.id,
        payload: values,
        hasAuth: true,
    })
    
    if (response?.data) {
      if (response.data.success) {
        dispatch(addUserProfile(response.data.success));
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
      <form>
        <Grid container spacing={7}>
          {storeProfile?.user?.role != "student" ? <>
            <Grid item xs={12} sm={12} sx={{ marginTop: 5 }}>
              <FormControl>
                <FormLabel sx={{ fontSize: '0.875rem' }}>Title</FormLabel>
                <RadioGroup row onChange={(e) => {setTitle(e.target.value)}} defaultValue={defaultValues?.title} aria-label='gender' name='account-settings-info-radio'>
                  <FormControlLabel value={"Prof"} label="Prof" control={<Radio />} />
                  <FormControlLabel value={"Engr"} label="Engr" control={<Radio />} />
                  <FormControlLabel value="Dr" label="Dr" control={<Radio />} />
                  <FormControlLabel value={"Mr"} label="Mr" control={<Radio />} />
                  <FormControlLabel value={"Mrs"} label="Mrs" control={<Radio />} />
                  <FormControlLabel value="Miss" label="Miss" control={<Radio />} />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControl>
                <FormLabel sx={{ fontSize: '0.875rem' }}>Head Of Department</FormLabel>
                <RadioGroup row onChange={(e) => {setHod(e.target.value == "true")} } defaultValue={defaultValues?.hod} aria-label='gender' name='account-settings-info-radio'>
                  <FormControlLabel value={true} label="Yes" control={<Radio />} />
                  <FormControlLabel value={false} label="No" control={<Radio />} />
                </RadioGroup>
              </FormControl>
            </Grid>
          </> : null}

          <Grid item xs={12} sm={3}>
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
              <RadioGroup row onChange={(e) => {setSex(e.target.value)}} defaultValue={defaultValues?.sex} aria-label='gender' name='account-settings-info-radio'>
                <FormControlLabel value='Male' label='Male' control={<Radio />} />
                <FormControlLabel value='Female' label='Female' control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <MyFormInputText 
              name={"address"}
              control={control}
              label={"Address"}
              size={"large"}
              required={true}
              defaultValue={defaultValues?.address}
            />       
          </Grid>

          <Grid item xs={12} sm={6}>
            <MyFormInputText 
              name={"pob"}
              control={control}
              label={"Place Of Birth"}
              size={"large"}
              required={true}
              defaultValue={defaultValues?.pob}
            />       
          </Grid>

          <Grid item xs={12} sm={6}>
            <MyFormInputText 
              name={"dob"}
              control={control}
              label={"Date Of Birth"}
              size={"large"}
              required={true}
              defaultValue={defaultValues?.dob}
            />       
          </Grid>
          
          <Grid item xs={12} sm={12}>
            <MyFormInputText 
              name={"about"}
              control={control}
              label={"About"}
              size={"large"}
              required={true}
              defaultValue={defaultValues?.about}

            />
          </Grid>

          <Grid item xs={12}>
            <Button 
              color="primary"
              variant="contained"
              size="large"
              onClick={handleSubmit(onSubmit)} 
              sx={{ marginRight: 4 }}
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
    </CardContent>
  )
}

export default TabInfoStudentLecturer
