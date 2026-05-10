import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
    activity : Activity
    selectActivity: (id: string) => void,
}

export default function ActivityCard({activity, selectActivity} : Props) {
    const {deleteActivity} = useActivities();
  return (
    <Card sx={{borderRadius : 3}}>
        <CardContent>
            <Typography variant="h5" sx={{fontWeight : 'bold',textTransform : 'uppercase'}}>
                {activity.title}
            </Typography>
            <Typography sx={{color : 'text.secondary',mb : 1.5}}>
                {activity.date}
            </Typography> 
                <Typography variant="body2" >
                {activity.description}
            </Typography>  
               <Typography variant="subtitle2" >
                {activity.city} , {activity.venue}
            </Typography>    
        </CardContent>
        <CardActions sx={{display :'flex',justifyContent :'space-between',gap : 2}}>
           <Chip label={activity.category} variant="outlined"></Chip>
           <Box  sx={{display : 'flex',justifyContent : 'space-between',pb : 2}}>
           <Button size="medium" variant="contained" onClick={() => selectActivity(activity.id)}>View</Button>
           <Button size="medium" variant="contained" color="error"
           disabled={deleteActivity.isPending}  
           onClick={() => deleteActivity.mutate(activity.id)}>Delete</Button>
           </Box>
        </CardActions>

    </Card>
  )
}
