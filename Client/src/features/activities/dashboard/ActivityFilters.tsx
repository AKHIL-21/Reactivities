import { FilterList, Event } from "@mui/icons-material";
import { Box, ListItemText, MenuItem, MenuList, Paper, Typography } from "@mui/material";
import Calender from "react-calendar";
import 'react-calendar/dist/Calendar.css';
export default function ActivityFilters() {
  return (
    <Box sx={{display:'flex' ,flexDirection: 'column', gap: '3',borderRadius: 3}}>
        <Paper>
            <Box sx={{width : '100%', mb: 2}}>
               <Typography variant="h5" sx={{display:'flex', alignItems:'center', gap: 1, p: 2,color: 'primary.main'}}>
                <FilterList sx={{mr: 1}} />
                Filters
               </Typography>
               <MenuList sx={{display:'flex', flexDirection: 'column', gap: 1, p: 2}}>  
                <MenuItem sx={{display:'flex', alignItems:'center', gap: 1}}>       
                <ListItemText primary="All Activities" />
                </MenuItem>
                <MenuItem sx={{display:'flex', alignItems:'center', gap: 1}}>       
                <ListItemText primary="I am going" />
                </MenuItem>               
                 <MenuItem sx={{display:'flex', alignItems:'center', gap: 1}}>       
                <ListItemText primary="I am hosting" />
                </MenuItem>

                </MenuList>
            </Box>
        </Paper>
        <Box component={Paper} sx={{display:'flex', flexDirection: 'column', width: '100%', gap: 1, p: 2, mt: 2}}>
             <Typography variant="h5" sx={{display:'flex', alignItems:'center', gap: 1, p: 2,color: 'primary.main'}}>
                <Event sx={{mr: 1}} />
                Select Date
             </Typography>
             <Calender  />
        </Box>
    </Box>
  )
}
