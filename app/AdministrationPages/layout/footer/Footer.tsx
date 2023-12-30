import { Paper, Typography } from '@mui/material';
import React from 'react'

const Footer = () => {
  return (
    <Paper 
      sx={{ 
        display: "flex",
        width: "100%", 
        position: "fixed", 
        padding: 2, 
        bottom: 0, 
        justifyContent: "center",
        backgroundColor: "blue"
      }}
    >
      <Typography variant='h6' color="white" sx={{ }}>Moove Student v2.0.7</Typography>
    </Paper>
  )
}

export default Footer