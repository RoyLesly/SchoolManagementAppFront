import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { CreateUpdateResetPasswordUrl } from "@/Utils/Config";
import { axiosRequest } from "@/Utils/functions";
import {  Divider, message, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addAuthUser, selectAuthUser } from "@/Redux/Reducers/sliceUser";
import { useRouter } from "next/navigation";
import MyFormInputText from "@/Designs/MyFormInputText";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

interface IFormInput {
  password: string,
  confirm_password: string,}

const defaultValues = {
  password: "",
  confirm_password: "",
};

const AuthCreatePassword = ({ title, subtitle, subtext }: loginType) => {
  const storeAuthUser = useSelector(selectAuthUser)
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter()

  const { handleSubmit, reset, control } = useForm<IFormInput>({
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: IFormInput) => {
   
    if (data["password"] == "") {
      message.error("Cannot Leave Password Empty")
    }
    if (data["password"] != data["confirm_password"]) {
      message.error("PASSWORD NOT MATCHING")
      return
    }
    const response = await axiosRequest<any>({
        method: "post",
        url: CreateUpdateResetPasswordUrl,
        payload: {...data, user_id: storeAuthUser.id, action: "creating_password"},
        hasAuth: true,
    })

    if (response) {
      console.log(response.data)
      if (response.data["error"]){
        notification.error({
          "message": "NOT FOUND !!!",
          "description": JSON.stringify(response.data["error"])
        })
      }
      if (response.data["success"]){
        notification.success({
          "message": "LOGIN AGAIN !!!",
          "description": JSON.stringify(response.data["success"])
        })
        router.push("/")
      } 
    }
    setLoading(false)
  }

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
            name={"password"}
            control={control}
            label={"Password"}
            size={"large"}
            required={true}
            type="password"
          />
        </Box>
        <Box mt={4}>
          <MyFormInputText
            name={"confirm_password"}
            control={control}
            label={"Confirm Password"}
            size={"large"}
            required={true}
            type="password"
          />
        </Box>
      
      </Stack>

      <Divider />

      <Box>
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

export default AuthCreatePassword;
