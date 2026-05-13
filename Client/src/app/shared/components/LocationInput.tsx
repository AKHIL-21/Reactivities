import {
    Box,
    CircularProgress,
    List,
    ListItemButton,
    ListItemText,
    Paper,
    TextField,
    Typography,
    type TextFieldProps,
} from "@mui/material";
import { debounce } from "@mui/material/utils";
import axios from "axios";
import { useMemo, useState } from "react";
import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";
import type { LocationIQSuggestion } from "../../../lib/types";

type Props<T extends FieldValues> = UseControllerProps<T> &
    Omit<TextFieldProps, "name" | "defaultValue" | "value" | "onChange" | "onBlur"> & {
        onSuggestionSelect?: (suggestion: LocationIQSuggestion) => void;
        suggestions?: LocationIQSuggestion[];
        loading?: boolean;
    };

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
    const {
        suggestions: externalSuggestions,
        loading: externalLoading,
        onSuggestionSelect,
        ...textFieldProps
    } = props;

    const { field, fieldState } = useController(props);
    const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>(externalSuggestions ?? []);
    const [loading, setLoading] = useState(false);
    const locationUrl = "https://api.locationiq.com/v1/autocomplete?key=pk.cd32537ed2f4bd881877dd58a7fc6cf3&limit=5&dedupe=1";

    const fetchSuggestions = useMemo(
        () => debounce(async (query: string) => {
            if (!query || query.length < 3) {
                setSuggestions([]);
                return;
            }

            setLoading(true);

            try {
                const response = await axios.get<LocationIQSuggestion[]>(
                    `${locationUrl}&q=${encodeURIComponent(query)}`
                );
                setSuggestions(response.data);
            } catch (error) {
                console.error(error);
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        }, 500),
        []
    );

    const visibleSuggestions = externalSuggestions ?? suggestions;
    const isLoading = externalLoading ?? loading;
    const inputValue = typeof field.value === "string" ? field.value : "";

    const handleSuggestionClick = (suggestion: LocationIQSuggestion) => {
        field.onChange(suggestion.display_name);
        setSuggestions([]);
        onSuggestionSelect?.(suggestion);
    };

    const handleChange = (value: string) => {
        field.onChange(value);
        fetchSuggestions(value);
    };

    return (
        <Box sx={{ position: "relative" }}>
            <TextField

                {...textFieldProps}
                {...field}
                fullWidth
                value={inputValue}
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={event => {
                    handleChange(event.target.value);
                }}
            />

            {isLoading && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                    <CircularProgress size={18} />
                    <Typography variant="body2">Loading locations...</Typography>
                </Box>
            )}

            {visibleSuggestions.length > 0 && (
                <Paper sx={{ position: "absolute", zIndex: 10, mt: 0.5, width: "100%" }}>
                    <List dense disablePadding>
                        {visibleSuggestions.map(suggestion => (
                            <ListItemButton
                                key={suggestion.place_id}
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                <ListItemText
                                    primary={suggestion.display_name}
                                    secondary={suggestion.display_address}
                                />
                            </ListItemButton>
                        ))}
                    </List>
                </Paper>
            )}
        </Box>
    );
}
