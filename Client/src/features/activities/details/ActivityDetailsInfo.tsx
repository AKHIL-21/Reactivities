import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { formatDate } from "../../../lib/Util/util";
import { useState } from "react";
import MapComponent from "../../../app/shared/components/MapComponent";

type Props = {
    activity: Activity;
}

export default function ActivityDetailsInfo({ activity }: Props) {
    const [mapOpen, setMapOpen] = useState(false);

    return (
        <Paper sx={{ mb: 2 }}>
            <Grid container sx={{ alignItems: 'center', pl: 2, py: 1 }}>
                <Grid size={1}>
                    <Info color="info" fontSize="large" />
                </Grid>
                <Grid size={11}>
                    <Typography>{activity.description}</Typography>
                </Grid>
            </Grid>
            <Divider />
            <Grid container sx={{ alignItems: 'center', pl: 2, py: 1 }}>
                <Grid size={1}>
                    <CalendarToday color="info" fontSize="large" />
                </Grid>
                <Grid size={11}>
                    <Typography>
                        {formatDate(activity.date, 'dd MMM yyyy h:mm aa')}
                    </Typography>
                </Grid>
            </Grid>
            <Divider />

            <Grid container sx={{ alignItems: 'center', pl: 2, py: 1 }}>
                <Grid size={1}>
                    <Place color="info" fontSize="large" />
                </Grid>
                <Grid size={11}>
                    <Typography>
                        {activity.venue}, {activity.city}
                    </Typography>
                    <Button onClick={() => setMapOpen(!mapOpen)}>
                        {mapOpen ? "Hide map" : "Show map"}
                    </Button>
                </Grid>
            </Grid>
            {mapOpen && (
                <Box sx={{ height: 400, zIndex: 1000, display: 'block' }}>
                    <MapComponent
                        latitude={activity.latitude}
                        longitude={activity.longitude}
                    />
                </Box>
            )}
        </Paper>
    )
}
