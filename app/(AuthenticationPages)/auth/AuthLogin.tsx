import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import Link from "next/link";

import MyFormInputText from "@/Designs/MyFormInputText";
import { useForm } from "react-hook-form";
import { LoginUrl } from "@/Utils/Config";
import { axiosRequest } from "@/Utils/functions";
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
  const [ loginNotification, setLoginNotification ]  = useState<boolean>(false)
  const [ fetching, setFetching ]  = useState<boolean>(false)
  const [ profiles, setProfiles ]  = useState<UserProfile[]>([]);

  useGetAllUserProfiles(setProfiles, setFetching);

  const { handleSubmit, reset, control } = useForm<IFormInput>({
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: IFormInput) => {

    const response = await axiosRequest<any>({
        method: "post",
        url: LoginUrl,
        payload: data,
        hasAuth: true,
    })

    console.log(response)

    if (response?.data) {
      setLoginNotification(true)
      if (response?.data.errors) {
        notification.error({
          "message": "ERROR !!!",
          "description": `${response?.data.errors}`
        })
        return
      } else if (response?.data.success) {
        const userCategory = response.data.success;
        notification.success({
          "message": "CONNECTED !!!",
          "description": ""
        })

        dispatch(addAuthUser(userCategory?.authUser));
        // return
        reset();
        dispatch(addUserProfile(profiles.filter((item: UserProfile) => item.user.id == userCategory?.authUser.id)[0]))
        if (userCategory?.authUser.role == "teacher") {
          router.push("/LecturersPages")
        }
        else if (userCategory?.authUser.role == "student") {
          router.push("/StudentsPages")
        }
        else {
          router.push("/AdministrationPages")
        }
      } else {
        alert(JSON.stringify(response));
      }
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
        >
          Submit
        </Button>
      </Box>
      
      {subtitle}
    </>
  )
};

export default AuthLogin;
