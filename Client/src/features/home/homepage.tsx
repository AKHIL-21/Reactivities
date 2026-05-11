import { Container, Typography } from "@mui/material";

export default function homepage() {
  return (

    <Container sx={{mt :3}}>
       <Typography variant="h3" align="center" gutterBottom>
        Welcome to Reactivities
       </Typography>
       <Typography variant="h5" align="center" gutterBottom>
        Please login to see the activities
       </Typography>
    </Container>
)
}
