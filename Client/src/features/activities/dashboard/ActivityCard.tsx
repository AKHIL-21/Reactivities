import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material"
import { Link } from "react-router";
import { formatDate } from "../../../lib/Util/util";

type Props = {
    activity: Activity

}
export default function ActivityCard({ activity }: Props) {
    const isHost = false;
    const isGoing = false;
    const label = isHost ? 'You are hosting this activity' : isGoing ? 'You are going to this activity' : '';
    const isCancelled = false;
    const color = isHost ? 'secondary' : isGoing ? 'warning' : 'default';
    return (
        <Card elevation={3} sx={{ borderRadius: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                <CardHeader avatar={<Avatar sx={{ height: 80, width: 80 }} />}
                    title={
                        <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                            {activity.title}
                        </Typography>
                    }
                    subheader={
                        <>
                            Hosted by {''} <Link to={`/profiles/Bob`}></Link>
                        </>
                    }
                    sx={{ flex: 1 }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                    {(isHost || isGoing) && (
                        <Chip label={label} color={color} variant="outlined" sx={{ borderRadius: 2 }} />
                    )}
                    {isCancelled && (
                        <Chip label="Cancelled" color="error" variant="outlined" sx={{ borderRadius: 2 }} />
                    )}
                </Box>
            </Box>
            <Divider  sx={{mb : 3}}/>
            <CardContent sx={{p : 0}}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1,px : 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center',flexGrow : 1 }}>
                  <AccessTimeIcon sx ={{mr : 1}} />
                  <Typography variant="body2" color="text.secondary" >
                      {formatDate(activity.date, 'dd MMM yyyy h:mm aa')}
                  </Typography>
                    </Box>

                  <PlaceIcon sx ={{mr : 1}} />
                  <Typography variant="body2" color="text.secondary">
                    {activity.venue}
                  </Typography>

                </Box>
                <Divider sx={{mb : 2}} />
                <Box sx={{ display: 'flex', gap: 1,px : 2,backgroundColor : 'background.paper',borderRadius : 2,p : 1 }}>
                    Attendees Goes here...

                </Box>
            </CardContent>
            <CardActions sx={{ gap: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                    {activity.description}
                </Typography>
                    <Button size="medium" component={Link} to={`/activities/${activity.id}`} variant="contained" 
                    sx={{display : 'flex',justifySelf :'self-end',borderRadius : 3}}>View</Button>
            </CardActions>

        </Card>
    )
}
