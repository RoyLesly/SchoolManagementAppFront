import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";

import MyFormInputText from "@/Designs/MyFormInputText";
import { useForm } from "react-hook-form";
import { LoginUrl } from "@/Utils/Config";
import { axiosRequest, getAllUserProfiles } from "@/Utils/functions";
import { useDispatch } from "react-redux";
import { addAuthUser, addUserProfile } from "@/Redux/Reducers/sliceUser";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import { useGetAllUserProfiles } from "@/Utils/customHooks";
import { UserProfile } from "@/Utils/types";


interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

interface IFormInput {
  username: string;
  password: string;
}

const defaultValues = {
  username: "",
  password: "",
};

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [ count, setCount ]  = useState<number>(0)
  const [ userUsername, setUserUsername ]  = useState<string>("")
  const [ authInfo, setAuthInfo ]  = useState<any>()
  const [ loginNotification, setLoginNotification ]  = useState<boolean>(false)
  const [ fetching, setFetching ]  = useState<boolean>(false)
  const [ profiles, setProfiles ]  = useState<UserProfile[]>([]);

  useEffect(() =>{
    if (count == 0) {
        console.log(userUsername)
    }
    if (count == 1) {
        if (userUsername != "") {
            getAllUserProfiles(setProfiles, ()=>{}, { searchField: "user__username", value: userUsername })
        }
        setCount(count + 1)
    }
    if (count == 2) {
        if (profiles.length > 0) {
            dispatch(addUserProfile(profiles[0]))
            setCount(count + 1)
        }
    }
    if (count == 3) {
        console.log(authInfo)
        if (authInfo["role"] == "teacher") {
            router.push("/LecturersPages")
        }
        else if (authInfo["role"]  == "student") {
            router.push("/StudentsPages")
        }
        else {
            router.push("/AdministrationPages")
        }
    }
  }, [count, authInfo, userUsername, router, profiles, dispatch])

  const { handleSubmit, reset, control } = useForm<IFormInput>({
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: IFormInput) => {
    setFetching(true)

    const response = await axiosRequest<any>({
        method: "post",
        url: LoginUrl,
        payload: data,
        hasAuth: true,
    })

    if (response?.data) {
      setLoginNotification(true)
      if (response?.data.errors) {
        notification.error({
          "message": "ERROR !!!",
          "description": JSON.stringify(response?.data.errors)
        })
        setFetching(false)    
        return
      } else if (response?.data.success) {
        const userCategory = response.data.success;
        notification.success({
          "message": "LOGIN SUCCESSFUL !!!",
          "description": ""
        })
        console.log(userCategory)
        dispatch(addAuthUser(userCategory?.authUser));
        reset();
        setUserUsername(userCategory?.authUser?.username)
        setAuthInfo(userCategory?.authUser)
        setCount(1)
      } else {
        alert(JSON.stringify(response));
        setFetching(false)
      }
    } else {
      notification.error({
        "message": "SERVER NOT REACHABLE !!!",
        "description": "Check Server !!!"
      })
      setFetching(false)    
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box mt={4}>
          <MyFormInputText 
            name={"username"}
            control={control}
            label={"Username"}
            size={"large"}
            required={true}
          />
        </Box>
        <Box mt={6}>
          <MyFormInputText
            name={"password"}
            control={control}
            label={"Password"}
            size={"large"}
            required={true}
            type="password"
          />
        </Box>

        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <Typography
            component={Link}
            href="/ForgotPassword"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>

      <Box mt={2}>
        <Button 
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleSubmit(onSubmit)} 
          disabled={fetching}
        >
          <div style={{ marginRight: 10 }}>Submit</div> <CircularProgress size={12} style={{ marginRight: 4 }} />
        </Button>
      </Box>
      
      {subtitle}
    </>
  )
};

export default AuthLogin;
