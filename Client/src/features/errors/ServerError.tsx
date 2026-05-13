import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";

type ServerErrorState = {
    error?: {
        message?: string;
        details?: string;
        title?: string;
        detail?: string;
    };
};

export default function ServerError() {
    const { state } = useLocation() as { state: ServerErrorState | null };
    const error = state?.error;
    const title = error?.message ?? error?.title ?? 'There has been an error';
    const detail = error?.details ?? error?.detail ?? 'Internal Server Error';

  return (
      <Paper>
         {error ? (
            <>
            <Typography gutterBottom variant="h3" sx={{px : 4, pt: 2}} color="secondary"> 
                {title}
            </Typography>
            <Divider></Divider>
            <Typography variant="body1" sx={{p:4, whiteSpace: 'pre-wrap'}}>
               {detail}
            </Typography>
            </>
         ):(
            <Typography variant="h5">
                Server Error
            </Typography>
         )}
      </Paper>
  )
}
