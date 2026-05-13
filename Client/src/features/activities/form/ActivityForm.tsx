import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from "react";
import { activitySchema, type ActivitySchema } from "../../../lib/schemas/activitySchema";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import TextInput from "../../../app/shared/components/textInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./CategoryOptions";
import LocationInput from "../../../app/shared/components/LocationInput";

export default function ActivityForm() {
    const { control, handleSubmit, reset, setValue } = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema),
        defaultValues: {
            title: '',
            description: '',
            category: '',
            date: '',
            location: {
                city: '',
                venue: '',
                latitude: '0',
                longitude: '0',
            },
        }
    });
    const { id } = useParams();
    const navigate = useNavigate();
    const { activity, updateActivity, createActivity, isLoadingActivity } = useActivities(id);
    useEffect(() => {
        if (activity) {
            reset({
                title: activity.title,
                description: activity.description,
                category: activity.category,
                date: activity.date.slice(0, 16),
                location: {
                    city: activity.city,
                    venue: activity.venue,
                    latitude: activity.latitude.toString(),
                    longitude: activity.longitude.toString(),
                },
            });
        }
    }, [activity, reset])

    const onsubmit = async (data: ActivitySchema) => {
        const activityData: Activity = {
            id: activity?.id ?? crypto.randomUUID(),
            title: data.title,
            description: data.description,
            category: data.category,
            date: new Date(data.date).toISOString(),
            city: data.location.city ?? '',
            venue: data.location.venue,
            isCancelled: activity?.isCancelled ?? false,
            latitude: Number(data.location.latitude),
            longitude: Number(data.location.longitude),
        };

        if (activity) {
            await updateActivity.mutateAsync(activityData);
            navigate(`/activities/${activity.id}`);
        } else {
            const createdId = await createActivity.mutateAsync(activityData);
            navigate(`/activities/${createdId ?? activityData.id}`);
        }
    }

    if (isLoadingActivity) return <h2>Loading...</h2>;

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }} >
            <Typography variant="h4" component="h2" color="primary" gutterBottom   >
                {activity ? 'Edit Activity' : 'Create Activity'}
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onsubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} >
                <TextInput label="Title" name="title" control={control} />
                <TextInput label="Description" name="description" control={control} multiline rows={3} />
                <Box sx={{display:'flex', gap: 3}}>
                    <SelectInput
                        items={categoryOptions} label="Category" name="category" control={control}
                    />
                    <DateTimeInput label="Date" name="date" control={control} />
                </Box>

                <LocationInput
                    control={control}
                    label="Enter the location"
                    name="location.venue"
                    onSuggestionSelect={suggestion => {
                        setValue('location.venue', suggestion.display_name, { shouldDirty: true, shouldValidate: true });
                        setValue('location.city', suggestion.address.city ?? suggestion.address.county ?? '', { shouldDirty: true });
                        setValue('location.latitude', suggestion.lat, { shouldDirty: true, shouldValidate: true });
                        setValue('location.longitude', suggestion.lon, { shouldDirty: true, shouldValidate: true });
                    }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }} >
                    <Button color="inherit" onClick={() => { }}>
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
