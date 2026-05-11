import {  Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { Link, useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";

export default function ActivivtyDetails() {
const {id} = useParams();
const {activity, isLoadingActivity} = useActivities(id);
const navigate = useNavigate();
if(!activity || isLoadingActivity) return <h2>Loading...</h2>;
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
            <Button component={Link} to={`/manage/${activity.id}`} color="primary" >Edit</Button>
             <Button color="inherit" onClick={() => navigate('/activities')}>Cancel</Button>
         </CardActions>
    </Card> 
)
}
