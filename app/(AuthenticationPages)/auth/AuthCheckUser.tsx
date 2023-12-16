import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { LoginUrl } from "@/Utils/Config";
import { axiosRequest } from "@/Utils/functions";
import {  Divider, notification } from "antd";
import { useDispatch } from "react-redux";
import { addAuthUser } from "@/Redux/Reducers/sliceUser";
import { useRouter } from "next/navigation";
import MyFormInputText from "@/Designs/MyFormInputText";
import { DoneAll, DoneAllRounded } from "@mui/icons-material";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

interface IFormInput {
  username: string;
}

const defaultValues = {
  username: "",
};

const AuthCheckUser = ({ title, subtitle, subtext }: loginType) => {
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter()

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

    if (response) {
      if (response.data["errors"]){
        notification.error({
          "message": "NOT FOUND !!!",
          "description": "User Does Not Exist In Data Base"
        })
      }
      if (response.data["success"]["user"]){
        const user = response.data["success"]['user']
        dispatch(addAuthUser(user))
        notification.success({
          "message": "CREATE PASSWORD !!!",
          "description": "User Found"
        })
        router.push("/CreatePassword")
      }
      else {
        notification.success({
          "message": "HAS PASSWORD !!!",
          "description": "User Found => LOGIN"
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
