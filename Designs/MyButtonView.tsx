import { EyeFilled } from '@ant-design/icons';
import React, { FC } from 'react';
import { green } from '@mui/material/colors';
import { Button, Fab, Stack, Typography } from '@mui/material'


interface ButtonViewProps {
    nextTabNumber: string
    setSelNum: any
}

const MyButtonView:FC<ButtonViewProps> = ({ setSelNum, nextTabNumber }) => {

  const onClickView = () => {
    setSelNum(nextTabNumber)
  }

  return (
    <Button sx={{ m: 0 }} onClick={onClickView}>
        <Stack spacing={1} direction="row">
          <Typography>View</Typography>
          <EyeFilled />
        </Stack>
    </Button>
  )
}

export default MyButtonView