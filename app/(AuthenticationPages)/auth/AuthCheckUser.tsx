import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { CheckUserUrl } from "@/Utils/Config";
import { axiosRequest } from "@/Utils/functions";
import {  Divider, notification } from "antd";
import { useDispatch } from "react-redux";
import { addAuthUser } from "@/Redux/Reducers/sliceUser";
import { useRouter } from "next/navigation";
import MyFormInputText from "@/Designs/MyFormInputText";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
  setShowMe: any
  setUserID: any
}

interface IFormInput {
  username: string;
}

const defaultValues = {
  username: "",
};

const AuthCheckUser = ({ title, subtitle, subtext, setShowMe, setUserID }: loginType) => {
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter()

  const { handleSubmit, reset, control } = useForm<IFormInput>({
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: IFormInput) => {
    const response = await axiosRequest<any>({
        method: "post",
        url: CheckUserUrl,
        payload: data,
        hasAuth: true,
    })

    if (response) {
      if (response.data["errors"]){
        notification.error({
          "message": "NOT FOUND !!!",
          "description": JSON.stringify(response.data["errors"])
        })
      }
      console.log(response.data["success"])
      if (response.data["success"]["user_id"]){
        setUserID(response.data["success"]['user_id'])
        notification.success({
          "message": "CREATE PASSWORD !!!",
          "description": "User Found"
        })
        setShowMe(true)
      }
      else {
        notification.success({
          "message": "HAS PASSWORD !!!",
          "description": JSON.stringify(response.data["success"])
        })
        router.push("/")  
      }    
    }
    setLoading(false)
  }

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={12} lg={4} xl={3} display="flex" justifyContent="center" alignItems="center">
          <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
            CHECK USER
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
            name={"username"}
            control={control}
            label={"Username"}
            size={"large"}
            required={true}
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

export default AuthCheckUser;
