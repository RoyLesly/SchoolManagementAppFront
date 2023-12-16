import { Box, Paper, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
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
      }}
    >
      <Typography variant='h6' color="#1a237e" sx={{ }}>Result Management Portal v2.0.2</Typography>
    </Paper>
  )
}

export default Footer