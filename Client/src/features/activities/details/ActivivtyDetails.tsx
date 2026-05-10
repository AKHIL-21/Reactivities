import {  Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"

type Props = {
    activity : Activity
    handleCancelSelectActivity: () => void,
    openForm : (id? : string) => void

}
export default function ActivivtyDetails({ activity, handleCancelSelectActivity, openForm }: Props) {
  return (
    <Card sx={{borderRadius : 3}}>
       <CardMedia component="img" image={`/images/categoryImages/${activity.category}.jpg`} alt={activity.title}  >
       </CardMedia>
       <CardContent>
            <Typography variant="h5" sx={{fontWeight : 'bold',textTransform : 'uppercase'}}>
                {activity.title}
            </Typography>
            <Typography sx={{color : 'text.secondary',mb : 1.5}} >
                {activity.date}
            </Typography> 
                <Typography variant="body2" >
                {activity.description}
            </Typography>  
        </CardContent>
         <CardActions >
            <Button color="primary" onClick={() => openForm(activity.id)}>Edit</Button>
             <Button color="inherit" onClick={handleCancelSelectActivity}>Cancel</Button>
         </CardActions>
    </Card> 
)
}
