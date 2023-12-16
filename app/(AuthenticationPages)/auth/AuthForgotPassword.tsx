import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ForgotPasswordUrl } from "@/Utils/Config";
import { axiosRequest } from "@/Utils/functions";
import {  Divider, message, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "@/Redux/Reducers/sliceUser";
import { useRouter } from "next/navigation";
import MyFormInputText from "@/Designs/MyFormInputText";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

interface IFormInput {
  username: string,
  email: string,}

const defaultValues = {
  username: "",
  email: "",
};

const AuthForgotPassword = ({ title, subtitle, subtext }: loginType) => {
  const storeUser = useSelector(selectAuthUser)
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter()
  const [ authMethod, setAuthMethod ] = useState("none")

  const { handleSubmit, reset, control } = useForm<IFormInput>({
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: IFormInput) => {   
    let values = {};
    if (authMethod == "username") {
      if (data["username"] == "") {
        message.error("Cannot Leave Username Empty");
        return;
      };
      values = { ...values, data: data["username"], auth_method: authMethod}
    }
    if (authMethod == "email") {
      if (data["email"] == "") {
        message.error("Cannot Leave Email Empty");
        return;
      };
      values = { ...values, data: data["email"], auth_method: authMethod}
    }

    const response = await axiosRequest<any>({
        method: "post",
        url: ForgotPasswordUrl,
        payload: values,
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

  const handleChange = (val: any) => {
    console.log(val.target.value)
    setAuthMethod(val.target.value)
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

        <Grid mt={2} mb={4} alignItems="center" alignContent="center">
          <Typography alignItems="center" alignContent="center">To Reset Password Enter Username or Email of the Account To Be reset</Typography>
        </Grid>

        <Grid>
          <Select
            id="select_auth_method"
            labelId="label_select_auth_method"
            value={authMethod}
            label="Select Identification Method"
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="username">Username</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>
        </Grid>

        { authMethod =="username" && <Grid mt={4}>
          <MyFormInputText
            name={"username"}
            control={control}
            label={"Username"}
            size={"large"}
            required={true}
            type="text"
          />
        </Grid>}

        { authMethod == "email" && <Grid mt={4}>
          <MyFormInputText
            name={"email"}
            control={control}
            label={"Email"}
            size={"large"}
            required={true}
            type="text"
          
          />
        </Grid>}
      
      </Stack>

      <Divider />

      { authMethod != "none" && <Grid>
        <Button 
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleSubmit(onSubmit)} 
        >
          Submit
        </Button>
      </Grid>}

      {subtitle}
      
    </>
  )
};

export default AuthForgotPassword;
