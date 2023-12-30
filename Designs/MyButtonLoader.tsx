import { Button, Fab } from '@mui/material'
import React, { FC } from 'react';
import { green } from '@mui/material/colors';
import { CircularProgress } from '@mui/material';



interface MyButtonLoaderProps {
    fetching: boolean
    loadingText?: string
    info?: any
    onClick?: any
}
const MyButtonLoader:FC<MyButtonLoaderProps> = ({fetching, loadingText, info, onClick}) => {

    const buttonSx = {
        ...(fetching && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[800],
            },
        }),
    };

  return (
    <Button sx={{ m: 0, position: 'relative' }}>
        <Fab
            aria-label="save"
            color="primary"
            sx={buttonSx}
            onClick={() => onClick()}
        >
        {fetching ? loadingText ? loadingText : "Loading" : <>{info}</>}
        </Fab>
        {fetching && (
        <CircularProgress
            size={71}
            sx={{
            color: green[500],
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
            }}
        />
        )}
    </Button>
  )
}

export const MyButtonLoader2:FC<MyButtonLoaderProps> = ({fetching, loadingText}) => {

    const buttonSx = {
        ...(fetching && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[800],
            },
        }),
    };

  return (
    <Button sx={{ m: 0, position: 'relative' }}>
        {fetching && (
        <CircularProgress
            size={71}
            sx={{
            color: green[500],
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
            }}
        />
        )}
    </Button>
  )
}

export default MyButtonLoader