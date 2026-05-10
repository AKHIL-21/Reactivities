import GroupIcon from "@mui/icons-material/Group";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";

type Props = {
  openForm : (id? : string) => void
}

export default function NavBar({ openForm }: Props) {
  return (
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
        backgroundImage : 'linear-gradient(135deg ,#182a73 0%, #218aae 69%, #20a7ac 89%)'}}>
        <Container maxWidth="xl">
            <Toolbar sx={{display : 'flex',justifyContent : 'space-between'}}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <GroupIcon fontSize="large" />
                <Typography variant="h4" sx={{fontWeight : 'bold',textTransform : 'uppercase' }}>
                Reactivities
                </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Button color="inherit" sx={{fontSize : '1.2rem',fontWeight : 'bold',textTransform : 'uppercase' }}>
                Activities
                </Button>
                <Button color="inherit" sx={{fontSize : '1.2rem',fontWeight : 'bold',textTransform : 'uppercase' }}>
                About
                </Button>
                <Button color="inherit" sx={{fontSize : '1.2rem',fontWeight : 'bold',textTransform : 'uppercase' }}>
                Contact
                </Button>
            </Box>
            <Button size="large" variant="contained" color="warning" onClick={() => openForm()}>
                Create Activity
            </Button>
            </Toolbar> 
        </Container>
       
      </AppBar>
    </Box>
  )
}
