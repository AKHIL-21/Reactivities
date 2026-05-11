import type { DateArg } from "date-fns";

export function formatDate(date: DateArg<Date>, formatString: string) {
    const options: Intl.DateTimeFormatOptions = {};

    if (formatString.includes('dd')) {
        options.day = '2-digit';
    }
    if (formatString.includes('MMM')) {
        options.month = 'short';
    }
    if (formatString.includes('yyyy')) {
        options.year = 'numeric';
    }
    if (formatString.includes('h:mm aa')) {
        options.hour = 'numeric';
        options.minute = '2-digit';
        options.hour12 = true;
    }

    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
}
