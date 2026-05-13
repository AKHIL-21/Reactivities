import { FormControl, FormHelperText, InputLabel, MenuItem, Select, type SelectProps } from "@mui/material";
import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<SelectProps<string>, 'name' | 'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'error'> & {
    items: { text: string; value: string }[];
    label: string;
  };

export default function SelectInput<T extends FieldValues>(props: Props<T>) {
    const {
      items,
      label,
      name,
      control,
      rules,
      defaultValue,
      shouldUnregister,
      disabled,
      ...selectProps
    } = props;

    const { field, fieldState } = useController({
      name,
      control,
      rules,
      defaultValue,
      shouldUnregister,
      disabled,
    });

  return (
  <FormControl fullWidth error={!!fieldState.error}>
    <InputLabel>{label}</InputLabel>
    <Select
      {...selectProps}
      name={field.name}
      value={(field.value || '') as string}
      label={label}
      onChange={event => field.onChange(event.target.value)}
      onBlur={field.onBlur}
      inputRef={field.ref}
      disabled={disabled}
    >
      {items.map(item => (
        <MenuItem key={item.value} value={item.value}>
            {item.text}
        </MenuItem>
      ))}
    </Select>
    <FormHelperText>
        {fieldState.error?.message}
    </FormHelperText>
    </FormControl>
  )
}
