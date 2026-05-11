import { Group } from "@mui/icons-material";
import {  Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function homepage() {
  return (
    <Paper 
    sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
  backgroundImage : 'linear-gradient(135deg ,#182a73 0%, #218aae 69%, #20a7ac 89%)',
          gap: 6,
    }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        gap: 2,
        color: 'white',
      }}>
        <Group fontSize="large" sx={{ height: '110', width: '110' }} />
        <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 'bold' }}> Reactivities</Typography>        
      </Box>
              <Typography variant="h2" sx={{ fontSize: '4rem', fontWeight: 'bold' }}>Welcome to Reactivities</Typography>      
              <Button variant="contained" color="primary" size="large" 
              component={Link}
              to= '/activities'
              sx={{height : 80,fontSize : '1.5em'}}
              >    
                Take me to the activities!
              </Button>  
    </Paper>
)
}
