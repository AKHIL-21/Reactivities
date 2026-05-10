import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import {  type FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
type Props = {
  closeForm : () => void
  onActivitySaved: (activity: Activity) => void
  activity? : Activity | undefined,
}
export default function ActivityForm({ closeForm, onActivitySaved, activity }: Props) {
const {updateActivity,createActivity} = useActivities();
    const dateValue = activity?.date ? activity.date.split('T')[0] : '';

    const handleSubmit =async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission logic here
        const formData = new FormData(event.currentTarget);
        const data :{[key : string] :FormDataEntryValue} = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        if(activity) {
            const updatedActivity = {
                ...activity,
                ...data,
                date: data.date
                    ? new Date(`${data.date.toString()}T00:00:00`).toISOString()
                    : activity.date,
            };
            try {
                await updateActivity.mutateAsync(updatedActivity as Activity);
                onActivitySaved(updatedActivity as Activity);
            } catch (error) {
                console.error(error);
            }
        }
        else{
            const newActivity: Activity = {
                id: crypto.randomUUID(),
                title: data.title.toString(),
                description: data.description.toString(),
                category: data.category.toString(),
                date: new Date(`${data.date.toString()}T00:00:00`).toISOString(),
                city: data.city.toString(),
                venue: data.venue.toString(),
                isCancelled: false,
                latitude: 0,
                longitude: 0,
            };
            try {
                await createActivity.mutateAsync(newActivity);
                onActivitySaved(newActivity);
            } catch (error) {
                console.error(error);
            }
        }

    }
    
  return (
  <Paper sx={{ borderRadius :3 , padding: 3 }} >
    <Typography variant="h4" component="h2" color="primary" gutterBottom   >
        Create Activity
    </Typography>
    <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} >
    <TextField name="title" label="Title" defaultValue={activity?.title ?? ''} required/>
    <TextField name="description" label="Description" defaultValue={activity?.description ?? ''} fullWidth multiline rows={3} required/>      
    <TextField name="category" label="Category" defaultValue={activity?.category ?? ''} required/>       
    <TextField name="date" label="Date" type="date" defaultValue={dateValue} required slotProps={{ inputLabel: { shrink: true } }} />       
    <TextField name="city" label="City" defaultValue={activity?.city ?? ''} required/>       
    <TextField name="venue" label="Venue" defaultValue={activity?.venue ?? ''} required/>       
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }} >
            <Button color="inherit" onClick={closeForm}>
                Cancel
            </Button>
            <Button color="success" type="submit" variant="contained"
            disabled={updateActivity.isPending || createActivity.isPending}>
                Submit
            </Button>
        </Box>
    </Box>
  </Paper>  
  )
}
