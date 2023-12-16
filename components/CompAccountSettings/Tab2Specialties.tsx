// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Button, {  } from '@mui/material/Button'

// ** Icons Imports
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addChoosenUserProfile, selectChoosenUser, selectChoosenUserProfile } from '@/Redux/Reducers/sliceChoosenUserAndProfile'
import { DomainProps, LevelProps, SpecialtyProps, UserProfile } from '@/Utils/types'
import { axiosRequest } from '@/Utils/functions'
import { UserProfilesUrl } from '@/Utils/Config'
import { selectAuthUser } from '@/Redux/Reducers/sliceUser'
import { message, notification } from 'antd'
import { useRouter } from 'next/navigation'
import MyButtonLoader from '@/Designs/MyButtonLoader'
import { InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { useGetAllDomains, useGetAllLevels, useGetAllSpecialties, useGetAllUserProfiles } from '@/Utils/customHooks'


const Tab2Specialties = () => {

  const router = useRouter()
  const dispatch = useDispatch()
  const storeProfile = useSelector(selectChoosenUserProfile);
  const storeUser = useSelector(selectAuthUser)
  const storeChoosenUser = useSelector(selectChoosenUser)
  const [ profiles, setProfiles ] = useState<UserProfile[]>([])

  const [ myProfiles, setMyProfiles ] = useState<UserProfile[]>([])
  const [ specialties, setSpecialties ] = useState<SpecialtyProps[]>([])

  const [ specialtyList, setSpecialtyList ] = useState<any[]>([])
  const [ highestLevel, setHighestLevel ] = useState<number>(1)
  const [ specialtiesData, setSpecialtiesData ] = useState<SpecialtyProps[]>([])
  const [ specialtiesDataNext, setSpecialtiesDataNext ] = useState<SpecialtyProps[]>([])
  const [ specialty_id, setSpecialty_id ] = useState<number>(0)
  const [ nextSpecialty_id, setNextSpecialty_id ] = useState<number>(0)
  const [ domains, setDomains ] = useState<DomainProps[]>([])
  const [ domain_id, setDomain_id ] = useState<number>(0)
  const [ levels, setLevels ] = useState<LevelProps[]>([])
  const [ level_id, setLevel_id ] = useState<number>(0)
  const [ selected_academic_year, setSelected_academic_year ] = useState<string>("")
  const [ fetching, setFetching ] = useState<boolean>(false)
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ promote, setPromote ] = useState<boolean>(false);
  const thisYear = new Date().getFullYear()

  useGetAllSpecialties(setSpecialties, setFetching)
  useGetAllUserProfiles(setProfiles, setFetching)
  useGetAllDomains(setDomains, setFetching);
  useGetAllLevels(setLevels, setFetching);

  useEffect(() => {
    const fil = profiles.filter((item: UserProfile) => item.user?.id == storeUser.id)
    setMyProfiles(fil)
  }, [profiles, storeUser])


  interface IFormInput {
    specialty_id: number;
  }
  
  const defaultValues = {
    specialty_id: 0,
  };

  const { handleSubmit, reset, control } = useForm<IFormInput>({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    const fil = profiles.filter((item: UserProfile) => item?.user?.id == storeProfile?.user?.id)
    const filA = fil.map((item: UserProfile) => item?.specialty)
    if (filA.length > 0) {
      setSpecialtyList(filA)
    }
  }, [profiles, storeProfile])

  useEffect(() => {
    const levels = specialtyList.map((item: SpecialtyProps) => item?.level?.level)
    const largest_num = levels.reduce((largest, current) => (current > largest ? current : largest), levels[0]) 
    const specWithHighestLevel = specialtyList.filter((item: SpecialtyProps) => item?.level?.level == largest_num)[0]
    const yearOfHighestSpecialty = specWithHighestLevel ? specWithHighestLevel?.academic_year[3] : 0
    const filA = specialties?.filter((item: SpecialtyProps) => item?.level?.level == (largest_num + 1))
    const filB = filA.filter((item: SpecialtyProps) => +item?.academic_year[3] == (+yearOfHighestSpecialty + 1))
    if (filB.length > 0) {
      setSpecialtiesDataNext(filB.reverse())
    }
  }, [promote, specialtyList, specialties])


  console.log(storeProfile)

  const onSubmit = async (data: any) => {
    if (specialty_id < 1) {
      message.error("Select a Specialty !!!");
      return;
    }

    // setLoading(true);

    let values = {
      user_id: storeProfile.user.id,
      role: storeProfile.user.role,
      specialty_id: specialty_id,
      updated_by_id: storeUser.id,
    }


    // return
    const response = await axiosRequest<any>({
        method: "put",
        url: UserProfilesUrl + "/" + storeProfile.id,
        payload: values,
        hasAuth: true,
    })
    
    console.log(response?.data)
    if (response?.data) {
      if (response.data.success) {
        dispatch(addChoosenUserProfile(response.data.success));
        notification.success({
          "message": "OK",
          "description": "Successfully Updated Profile"
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
  
  const onPromote = async (data: any) => {
    if (nextSpecialty_id < 1) {
      message.error("Select a sSpecialty !!!");
      return;
    }

    let values = {
      ...data, 
      user_id: storeProfile.user.id,
      first_name: storeProfile.user?.first_name,
      last_name: storeProfile.user?.last_name,
      email: storeProfile.user?.email,
      telephone: storeProfile.user?.telephone,
      specialty_id: nextSpecialty_id,
      created_by_id: storeUser.id,
      role: storeProfile.user?.role,
      multiple: false,
    }

    const response = await axiosRequest<any>({
        method: "post",
        url: UserProfilesUrl,
        payload: values,
        hasAuth: true,
    })
    
    if (response?.data) {
      if (response.data.success) {
        console.log(response.data.success)
        dispatch(addChoosenUserProfile(response.data.success));
        notification.success({
          "message": "OK",
          "description": "Successfully Created Profile"
        });
        router.back();
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

  const handleChange = (val: any) => {
    setSpecialty_id(val.target.value)
  }
  const handleChangePromote = (val: any) => {
    setNextSpecialty_id(val.target.value)
  }
  const handleChangeDomain = (val: any) => {
    setDomain_id(val.target.value)
  }
  const handleChangeAcademicYear = (val: any) => {
    setSelected_academic_year(val.target.value)
  }
  const handleChangeLevel = (val: any) => {
    setLevel_id(val.target.value)
  }


  useEffect(()=> {
    if (domain_id > 0 && level_id > 0 && selected_academic_year != "") {
      const filA = specialties.filter((item: SpecialtyProps) => item.main_specialty.domain.id == domain_id)
      const filB = filA.filter((item: SpecialtyProps) => item.level.id == level_id)
      const filC = filB.filter((item: SpecialtyProps) => item.academic_year == selected_academic_year)
      setSpecialtiesData(filC)
    }
  }, [domain_id, level_id, specialties, selected_academic_year])

  return (
    <CardContent>
      <Grid container spacing={6}>

        <Grid container xs={12} sx={{ marginTop: 4, marginBottom: 1 }}>

        </Grid>

        {specialtyList[0] == null ? <>

          <Grid item xs={12}>
            <Typography variant='h3'>
              Select Specialty For Student
            </Typography>
          </Grid>
 
          <Grid item xs={12} sm={6} lg={4}>
            <InputLabel htmlFor='account-settings-confirm-new-password'>Select Field</InputLabel>
            <Select
              id="label_select_field"
              labelId="label_select_field"
              value={domain_id}
              label="Select Field"
              onChange={handleChangeDomain}
              fullWidth
            >
              {domains.map((item: DomainProps) => (
                <MenuItem key={item.id} value={item.id}>{item.domain_name}</MenuItem>
              ))}
            </Select>
          </Grid> 

          <Grid item xs={12} sm={6} lg={4}>
            <InputLabel htmlFor='account-settings-confirm-new-password'>Academic Year</InputLabel>
            <Select
              id="label_select_academic_year"
              labelId="label_select_academic_year"
              value={selected_academic_year}
              label="Select Academic Year"
              onChange={handleChangeAcademicYear}
              fullWidth
            >
              {[
                (thisYear) + "/" + (thisYear + 1)
              ].map((item: string) => (
              <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </Grid> 

          <Grid item xs={12} sm={6} lg={4}>
            <InputLabel htmlFor='account-settings-confirm-new-password'>Select Level</InputLabel>
            <Select
              id="label_select_level"
              labelId="label_select_level"
              value={level_id}
              label="Select Level"
              onChange={handleChangeLevel}
              fullWidth
            >
              {levels.map((item: LevelProps) => (
                <MenuItem key={item.id} value={item.id}>{item.level}</MenuItem>
              ))}
            </Select>
          </Grid> 

          <Grid item xs={12}>
            <InputLabel htmlFor='account-settings-confirm-new-password'>Select Specialty</InputLabel>
            <Select
              id="label_select_specialty"
              labelId="label_select_specialty"
              value={specialty_id}
              label="Select Specialty"
              onChange={handleChange}
              fullWidth
            >
              {specialtiesData.map((item: SpecialtyProps) => (
                <MenuItem key={item.id} value={item.id}>{item.main_specialty?.specialty_name} {item.academic_year} Level-{item.level?.level}</MenuItem>
              ))}
            </Select>
          </Grid> 

          <Grid item xs={12}>
            <Button 
              color="primary"
              variant="contained"
              size="large"
              onClick={handleSubmit(onSubmit)} 
              sx={{ marginRight: 2, width: "70%" }}
            >
              Save
            </Button>
            <MyButtonLoader 
              fetching={loading}
              loadingText="Saving"
            />
          </Grid> 
        </> 

          :
        <>
          <Grid item xs={12} alignContent="center" alignItems="center" justifyItems="center">
            <Typography variant='h3'>
              MY LEVELS
            </Typography>
          </Grid>

          {specialtyList.map((item: UserProfile) => (
          <>
            <Grid key={item?.id} item xs={12} sm={6} lg={4} spacing={2}>
              <Grid>
                <InputLabel htmlFor='account-settings-confirm-new-password'>Level {item?.specialty?.level?.level}</InputLabel>
              </Grid>
              <Grid>
                <Select
                  id="label_select_specialty"
                  labelId="label_select_specialty"
                  value={item?.id}
                  label="Select Specialty"
                  onChange={handleChange}
                  fullWidth
                  disabled
                >
                  {specialties?.map((item: SpecialtyProps) => (
                    <MenuItem key={item?.id} value={item?.id}>{item?.main_specialty?.specialty_name} {item?.academic_year}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </> 
          ))}
        </>
        }

        {specialtyList[0] != null && <>
            <Grid item xs={12}>
              <Button onClick={() => {setPromote(!promote)}}>Click To Promote To Next Level</Button>
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='account-settings-confirm-new-password'>Next Level</InputLabel>
              <Select
                id="label_select_next_specialty"
                labelId="label_select_next_specialty"
                // value={0}
                label="Select Next Specialty"
                onChange={handleChangePromote}
                fullWidth
                disabled={!promote}
              >
                {specialtiesDataNext.map((item: SpecialtyProps) => (
                  <MenuItem key={item.id} value={item.id}>{item.main_specialty?.specialty_name} {item.academic_year} Level-{item.level?.level}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Button 
                color="primary"
                variant="contained"
                size="large"
                onClick={handleSubmit(onPromote)} 
                sx={{ marginRight: 3.5 }}
                disabled={nextSpecialty_id < 1 ? true : false}
              >
                Promote
              </Button>
              {loading ? <MyButtonLoader 
                fetching={loading}
                loadingText="Saving"
              />: ""}
            </Grid>
          </>
        }
      </Grid>
    </CardContent>
  )
}

export default Tab2Specialties
