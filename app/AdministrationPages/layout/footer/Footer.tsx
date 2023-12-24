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
      }}
    >
      <Typography variant='h6' color="#1a237e" sx={{ }}>Moove Student v2.0.5</Typography>
    </Paper>
  )
}

export default Footer