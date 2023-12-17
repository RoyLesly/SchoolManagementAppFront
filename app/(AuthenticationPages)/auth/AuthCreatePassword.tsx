import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Grid,
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
  setShowMe: any
  userID: number
}

interface IFormInput {
  password: string,
  confirm_password: string,}

const defaultValues = {
  password: "",
  confirm_password: "",
};

const AuthCreatePassword = ({ title, subtitle, subtext, setShowMe, userID }: loginType) => {
  const [ loading, setLoading ] = useState(false);
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
        payload: {...data, user_id: userID, action: "creating_password"},
        hasAuth: true,
    })

    if (response) {
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
        setShowMe(false)
      } 
    }
    setLoading(false)
  }

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={12} lg={4} xl={3} display="flex" justifyContent="center" alignItems="center">
          <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
            CREATE PASSWORD
          </Typography>
        </Grid>
      </Box>
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
