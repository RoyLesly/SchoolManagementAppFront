import React, { FC } from 'react';
import AddCircleOutlineSharp from '@mui/icons-material/AddCircleOutlineSharp';
import { Button, Fab, Typography } from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { blue } from '@mui/material/colors';


interface MyButtonAddProps {
    setAddItem: any
}
const MyButtonAdd:FC<MyButtonAddProps> = ({setAddItem}) => {
    const buttonSx = {
        ...({
                bgcolor: blue[500],
                '&:hover': {
                    bgcolor: blue[800],
                },
        }),
    };

    return (
        <Button sx={{ m: 1, position: 'relative' }}
            onClick={() => {setAddItem(true)}}
        >
            <Fab
                aria-label="save"
                color="primary"
                sx={buttonSx}
            >
        <PersonAddOutlinedIcon />
        </Fab>
    </Button>
  )
}

export default MyButtonAdd