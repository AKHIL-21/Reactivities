import { z } from 'zod';
import { requiredString } from '../Util/util';



const coordinateString = (fieldName: string, min: number, max: number) =>
    requiredString(fieldName).refine(value => {
        const numberValue = Number(value);

        return !Number.isNaN(numberValue) && numberValue >= min && numberValue <= max;
    }, { message: `${fieldName} must be between ${min} and ${max}` });

export const activitySchema = z.object({
    title: requiredString('Title').max(100, { message: 'Title must not exceed 100 characters' }),
    description: requiredString('Description'),
    category: requiredString('Category'),
    date: requiredString('Date').refine(value => {
        const selectedDate = new Date(value);

        return !Number.isNaN(selectedDate.getTime()) && selectedDate >= new Date();
    }, { message: 'Date must be in the future' }),
    location: z.object({
        venue: requiredString('Venue'),
        city: z.string().optional(),
        latitude: coordinateString('Latitude', -90, 90),
        longitude: coordinateString('Longitude', -180, 180),
    })
});

export type ActivitySchema = z.infer<typeof activitySchema>;
