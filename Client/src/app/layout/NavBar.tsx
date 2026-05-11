import GroupIcon from "@mui/icons-material/Group";
import { AppBar, Box, Button, Container, LinearProgress, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useStore } from "../../lib/hooks/UseStore";
import { Observer } from "mobx-react-lite";


export default function NavBar() {
  const {uiStore} = useStore();
  return (
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" 
      sx={{
        backgroundImage : 'linear-gradient(135deg ,#182a73 0%, #218aae 69%, #20a7ac 89%)',
        position : 'relative'
        }}>
        <Container maxWidth="xl">
            <Toolbar sx={{display : 'flex',justifyContent : 'space-between'}}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button component={NavLink} to="/" color="inherit" sx={{ fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                   <GroupIcon fontSize="large" />
                <Typography variant="h4" sx={{fontWeight : 'bold',textTransform : 'uppercase' }}>
                Reactivities
                </Typography>
              </Button>
             
            </Box>
            <Box sx={{ display: 'flex' }}>
              <MenuItemLink  to="/activities">
                Activities
              </MenuItemLink> 
               <MenuItemLink  to="/createActivity">
                CreateActivity
              </MenuItemLink>     
               <MenuItemLink  to="/counter">
                Counter 
              </MenuItemLink>      
            </Box>
            <Button color="inherit" sx={{ fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
               usermenu
              </Button>
            </Toolbar> 
        </Container>
        <Observer>
          {() => uiStore.isLoading ? (
            <LinearProgress color="secondary" sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
          ) : null}
        </Observer>
      </AppBar>
    </Box>
  )
}
