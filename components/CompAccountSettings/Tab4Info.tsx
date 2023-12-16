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
import { addChoosenUser, selectChoosenUser, selectChoosenUserProfile } from '@/Redux/Reducers/sliceChoosenUserAndProfile'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { axiosRequest } from '@/Utils/functions'
import { selectAuthUser } from '@/Redux/Reducers/sliceUser'
import { UserCRUDUrl } from '@/Utils/Config'
import { notification } from 'antd'
import MyButtonLoader from '@/Designs/MyButtonLoader'

const Tab4Info = () => {
  const router = useRouter();
  const dispatch = useDispatch();  
  const storeUser = useSelector(selectAuthUser);
  const storeChoosenUserProfile = useSelector(selectChoosenUserProfile);
  const [ loading, setLoading ] = useState<boolean>(false)

  const [ sex, setSex ] = useState<string>("")
  const [ hod, setHod ] = useState<boolean>(false)
  const [ title, setTitle ] = useState<string>("")

  useEffect(() => {
    setHod(storeChoosenUserProfile.user.hod ? storeChoosenUserProfile.user.hod : false)
    setSex(storeChoosenUserProfile.user?.sex)
    setTitle(storeChoosenUserProfile.user?.title ? storeChoosenUserProfile.user.title : "")
  }, [storeChoosenUserProfile])

  const defaultValues = {...storeChoosenUserProfile};
  const { handleSubmit, reset, control } = useForm<UserType>({
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: UserType) => {
    const emptyValues = new Set(["", null, undefined])
    const checkEmpty = (obj: UserType) => {
      // return Object.entries(obj).reduce((accum, entry) => {
      //   const [ key, val ] = entry;
      //   if (emptyValues.has(val)) {
      //     notification.error({
      //       message: "Check Fields",
      //       description: `${key} is ${val}`
      //     })
      //     return;
      //   }
      //   return accum;
      // }, {})
    }
    checkEmpty(data)

    setLoading(true)
    let values = {
      ...storeChoosenUserProfile.user, 
      address: data.address?.toUpperCase(),
      about: data.about.toUpperCase(),
      user_id: data.id,
      dob: data.dob,
      pob: data.pob.toUpperCase(),
      role: storeChoosenUserProfile.user.role,
      sex: sex,
      hod: hod,
      title: title,
      updated_by_id: storeUser.id,
    }

    console.log(values)

    const response = await axiosRequest<any>({
        method: "put",
        url: UserCRUDUrl + "/" + storeChoosenUserProfile.user.id,
        payload: values,
        hasAuth: true,
    })
    
    if (response?.data) {
      if (response.data.success) {
        console.log(response.data.success)
        dispatch(addChoosenUser(response.data.success));
        notification.success({
          "message": "OK",
          "description": "Successfully Updated User Info"
        });
        router.back();
      }
      if (response.data.error) {
        notification.error({
          "message": "FAILED",
          "description": `${JSON.stringify(response.data.error)}`
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
          {storeChoosenUserProfile?.user?.role != "student" && <>
            <Grid item xs={12} sm={12} sx={{ marginTop: 5 }}>
              <FormControl>
                <FormLabel sx={{ fontSize: '0.875rem' }}>Title</FormLabel>
                <RadioGroup row onChange={(e) => {setTitle(e.target.value)}} defaultValue={defaultValues?.user?.title} aria-label='gender' name='account-settings-info-radio'>
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
                <RadioGroup row onChange={(e) => {setHod(e.target.value == "true")} } defaultValue={defaultValues?.user?.hod} aria-label='gender' name='account-settings-info-radio'>
                  <FormControlLabel value={true} label="Yes" control={<Radio />} />
                  <FormControlLabel value={false} label="No" control={<Radio />} />
                </RadioGroup>
              </FormControl>
            </Grid>
          </>}

          <Grid item xs={12} sm={3}>
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
              <RadioGroup row onChange={(e) => {setSex(e.target.value)}} defaultValue={defaultValues?.user?.sex} aria-label='gender' name='account-settings-info-radio'>
                <FormControlLabel value='Male' label='Male' control={<Radio />} />
                <FormControlLabel value='Female' label='Female' control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <MyFormInputText 
              name={"address"}
              control={control}
              label={"Address"}
              size={"large"}
              required={true}
              defaultValue={defaultValues?.user?.address}
            />       
          </Grid>

          <Grid item xs={12} sm={6}>
            <MyFormInputText 
              name={"pob"}
              control={control}
              label={"Place Of Birth"}
              size={"large"}
              required={true}
              defaultValue={defaultValues?.user?.pob}
            />       
          </Grid>

          <Grid item xs={12} sm={6}>
            <MyFormInputText 
              name={"dob"}
              control={control}
              label={"Date Of Birth"}
              size={"large"}
              required={true}
              defaultValue={defaultValues?.user?.dob}
            />       
          </Grid>
          
          <Grid item xs={12} sm={12}>
            <MyFormInputText 
              name={"about"}
              control={control}
              label={"About"}
              size={"large"}
              required={true}
              defaultValue={defaultValues?.user?.about}

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
            <MyButtonLoader 
              fetching={loading}
              loadingText="Saving"
            />
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default Tab4Info
