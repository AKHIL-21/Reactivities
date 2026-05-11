import { Button } from "@mui/material";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";


export default function MenuItemLink({children,to} : {children : ReactNode , to : string}) {
  return (
 <Button component={NavLink} to={to} color="inherit" 
 sx={{fontSize : '1.2em',textTransform: 'uppercase',fontWeight : 'bold',color:'inherit',
    '&.active':{
        color:  'yellow'
    }
 }}
 >
    {children}          
             
             
    </Button>
  )
}
