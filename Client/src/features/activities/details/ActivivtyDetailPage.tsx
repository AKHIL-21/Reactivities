import {  Grid } from "@mui/material"
import {  useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailsheader from "./ActivityDetailsheader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChats from "./ActivityDetailsChats";
import ActivityDetailsSideBar from "./ActivityDetailsSideBar";

export default function ActivivtyDetailPage() {
const {id} = useParams();
const {activity, isLoadingActivity} = useActivities(id);
if(!activity || isLoadingActivity) return <h2>Loading...</h2>;
  return (
  <Grid container spacing={2}>
    <Grid size={6}>
        <ActivityDetailsheader activity={activity} />
        <ActivityDetailsInfo  activity={activity}/>
        <ActivityDetailsChats />
    </Grid>
    <Grid size={4}>
        <ActivityDetailsSideBar />
    </Grid>
  </Grid>
)
}
  