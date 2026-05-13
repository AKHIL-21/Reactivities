import { TextField, type TextFieldProps } from "@mui/material";
import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";

type Props<T extends FieldValues> = UseControllerProps<T> & Omit<TextFieldProps, 'type' | 'name' | 'defaultValue'>;

export default function DateTimeInput<T extends FieldValues>(props: Props<T>) {
    const { field, fieldState } = useController(props);

    return (
        <TextField
            {...props}
            {...field}
            fullWidth
            type="datetime-local"
            variant="outlined"
            value={field.value || ''}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{ inputLabel: { shrink: true }, ...props.slotProps }}
        />
    );
}
