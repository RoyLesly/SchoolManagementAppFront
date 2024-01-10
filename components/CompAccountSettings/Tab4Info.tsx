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
import { CustomUserOptimizedType, UserType } from '@/Utils/types'
import { useDispatch, useSelector } from 'react-redux'
import { addChoosenUser, selectChoosenUser, selectChoosenUserProfile } from '@/Redux/Reducers/sliceChoosenUserAndProfile'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { axiosRequest } from '@/Utils/functions'
import { selectAuthUser } from '@/Redux/Reducers/sliceUser'
import { UserCRUDUrl, UserControlOptimizedQueryUrl } from '@/Utils/Config'
import { notification } from 'antd'
import MyButtonLoader from '@/Designs/MyButtonLoader'
import { getOptimizedQuery } from '@/Utils/pagination'
import { InputLabel } from '@mui/material'

const Tab4Info = () => {
  const router = useRouter();
  const dispatch = useDispatch();  
  const storeUser = useSelector(selectAuthUser);
  const storeChoosenUserProfile = useSelector(selectChoosenUserProfile);
  const [ loading, setLoading ] = useState<boolean>(false)

  const [ customUser, setCustomUser ] = useState<any[]>()
  const [ count, setCount ] = useState<number>(0)
  const [ sex, setSex ] = useState<string>("")
  const [ hod, setHod ] = useState<boolean>(false)
  const [ title, setTitle ] = useState<string>("")

const [ customUserFieldList, setCustomUserFieldList ] = useState([
    "id", 
    "address", 
    "sex",
    "hod",
    "dob",
    "pob",
    "title",
    "about",
    "role",
    "username",
])

  useEffect(() => {
    if (count == 0) {
      getOptimizedQuery(setCustomUser, ()=>{}, ()=>{}, ()=>{}, ()=>{}, UserControlOptimizedQueryUrl, { 
        model: "CustomUser", 
        searchField: "id",
        value: storeChoosenUserProfile[15],
        fieldList: [...customUserFieldList]
      });
      if (customUser) { 
        console.log(customUser)
        setSex(customUser ? customUser[0][2] : '');
        setHod(customUser ? customUser[0][3] : false);
        setTitle(customUser ? customUser[0][6] : "");
        setCount(count + 1)
      }
    }
  }, [count, storeChoosenUserProfile, customUser, customUserFieldList])


  const defaultValues = customUser ? [...customUser[0]] : [];
  const { handleSubmit, reset, control } = useForm<any>({
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: UserType) => {

    const EmptyFieldChecker = (a: any, b: any, c: string) => {
      console.log(a, b, c)
      if ((a == undefined && b == undefined) || (a == '' && b == '') || (a == null && b == null)) {
        notification.error({
          "message": "EMPTY FIELDS",
          description: c + " !!!"
        })
        return true
      }
      return false
    }
    const AssignValueToEmptyField = (a: any, b: any, c: string) => {

      if ((a == undefined && b != undefined) || (a == '' && b != '') || (a == null && b != null)) {
        if (c == "id") { data["id"] = b}
        if (c == "sex") { data["sex"] = b}
        if (c == "hod") { data["hod"] = b}
        if (c == "title") { data["title"] = b}
        if (c == "dob") { data["dob"] = b}
        if (c == "pob") { data["pob"] = b}
        if (c == "about") { data["about"] = b}
      }
      return false
    }
    if (customUser && (customUser[0][8] != "student")) { 
      if (EmptyFieldChecker(data["title"] , title, "Title")) return;
      if (EmptyFieldChecker(data["hod"] , hod, "Head Of Department")) return;
    }

    if (customUser && customUser[0][8] != "student") { 
      if (AssignValueToEmptyField(data["hod"], hod, "hod")) return;
      if (AssignValueToEmptyField(data["title"], title, "title")) return;
    }

    // if (EmptyFieldChecker(data["sex"] , sex, "sex")) return;
    // if (EmptyFieldChecker(data["address"] , defaultValues[1], "Address")) return;
    // if (EmptyFieldChecker(data["pob"] , defaultValues[5], "Place Of Birth")) return;
    // if (EmptyFieldChecker(data["dob"] , defaultValues[4], "Date Of Birth")) return;
    // if (EmptyFieldChecker(data["about"] , defaultValues[7])) return;
    

    if (AssignValueToEmptyField(data["id"], defaultValues[0], "id")) return;
    if (AssignValueToEmptyField(data["sex"], sex, "sex")) return;
    if (AssignValueToEmptyField(data["dob"], defaultValues[4], "dob")) return;
    if (AssignValueToEmptyField(data["pob"], defaultValues[5], "pob")) return;
    // if (AssignValueToEmptyField(data["about"], defaultValues[7], "about")) return;

    console.log(data)
    setLoading(true)
    let values = {
      id: data["id"],
      address: data.address?.toUpperCase(),
      about: data.about?.toUpperCase(),
      user_id: data.id,
      dob: data.dob,
      pob: data.pob?.toUpperCase(),
      role: customUser && customUser[0][8],
      username: customUser && customUser[0][9],
      sex: sex,
      hod: hod,
      title: title,
      updated_by_id: storeUser.id,
    }

    console.log(values)

    const response = await axiosRequest<any>({
        method: "put",
        url: UserCRUDUrl + "/" + values['id'],
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
      if (response.data.errors) {
        notification.error({
          "message": "FAILED",
          "description": `${JSON.stringify(response.data.errors)}`
        });
      }
      setLoading(false)
    }
  };


  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          {customUser && (customUser[0][8] != "student" && <>
              <Grid item xs={12} sm={12} sx={{ marginTop: 5 }}>
                <FormControl>
                  <FormLabel sx={{ fontSize: '0.875rem' }}>Title</FormLabel>
                  <RadioGroup row onChange={(e) => {setTitle(e.target.value)}} defaultValue={title} aria-label='gender' name='account-settings-info-radio'>
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
                  <RadioGroup row onChange={(e) => {setHod(e.target.value == "true")} } defaultValue={hod} aria-label='gender' name='account-settings-info-radio'>
                    <FormControlLabel value={true} label="Yes" control={<Radio />} />
                    <FormControlLabel value={false} label="No" control={<Radio />} />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </>)
          }

          <Grid item xs={12} sm={3}>
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
              <RadioGroup row onChange={(e) => {setSex(e.target.value)}} defaultValue={sex} aria-label='gender' name='account-settings-info-radio'>
                <FormControlLabel value='Male' label='Male' control={<Radio />} />
                <FormControlLabel value='Female' label='Female' control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <InputLabel>Address</InputLabel>
            <MyFormInputText 
              name={"address"}
              control={control}
              label={""}
              size={"large"}
              required={true}
              defaultValue={defaultValues[1]}
            />       
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel>Place Of Birth</InputLabel>
            <MyFormInputText 
              name={"pob"}
              control={control}
              label={""}
              size={"large"}
              required={true}
              defaultValue={defaultValues[5]}
            />       
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel>Date Of Birth</InputLabel>
            <MyFormInputText 
              name={"dob"}
              control={control}
              label={""}
              size={"large"}
              required={true}
              defaultValue={defaultValues[4]}
            />       
          </Grid>
          
          <Grid item xs={12} sm={12}>
            <InputLabel>About</InputLabel>
            <MyFormInputText 
              name={"about"}
              control={control}
              label={""}
              size={"large"}
              required={true}
              defaultValue={defaultValues[7]}

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
