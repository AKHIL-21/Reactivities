import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";
type Props = {
  closeForm : () => void
  activity? : Activity | undefined,
    submitForm : (activity : Activity) => void
}
export default function ActivityForm({ closeForm, activity,submitForm }: Props) {
    const handleSubmit = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission logic here
        const formData = new FormData(event.currentTarget);
        const data :{[key : string] :FormDataEntryValue} = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        if(activity) {
            data.id = activity.id;
        }
        submitForm(data as unknown as Activity);
    }
    
  return (
  <Paper sx={{ borderRadius :3 , padding: 3 }} >
    <Typography variant="h4" component="h2" color="primary" gutterBottom   >
        Create Activity
    </Typography>
    <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} >
    <TextField name="title" label="Title" defaultValue={activity?.title ?? ''}/>
    <TextField name="description" label="Description" defaultValue={activity?.description ?? ''} fullWidth multiline rows={3} />      
    <TextField name="category" label="Category" defaultValue={activity?.category ?? ''} />       
    <TextField name="date" label="Date" type="date" defaultValue={activity?.date ?? ''} />       
    <TextField name="city" label="City" defaultValue={activity?.city ?? ''} />       
    <TextField name="venue" label="Venue" defaultValue={activity?.venue ?? ''} />       
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }} >
            <Button color="inherit" onClick={closeForm}>
                Cancel
            </Button>
            <Button color="success" type="submit" variant="contained">
                Submit
            </Button>
        </Box>
    </Box>
  </Paper>  
  )
}
