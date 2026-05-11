import { Box, Button, ButtonGroup, Paper, Typography } from "@mui/material";
import { useStore } from "../../lib/hooks/UseStore"
import { observer } from "mobx-react-lite";

export default observer(function Counter() {
    const {counterStore} = useStore();
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 2,
    }}>
        <Box sx={{width:'60%'}}>
                <Typography variant="h2" gutterBottom>
        Counter: {counterStore.title}
      </Typography>
      <Typography variant="h5" gutterBottom>
        The Count is: {counterStore.count}
      </Typography>
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
    <Button variant="contained" color="error" onClick={() => counterStore.increment()}>Increment</Button>
    <Button variant="contained" color="success" onClick={() => counterStore.decrement()}>Decrement</Button>
    <Button variant="contained" color="primary" onClick={() => counterStore.increment(5)}>Increment by 5</Button>
    </ButtonGroup>

        </Box>
        <Paper sx={{width:'40%'}}>
            <Typography variant="h4" gutterBottom>
                Events ({counterStore.eventCount})
            </Typography>
            {counterStore.events.map((event, index) => (
                <Typography key={index} variant="body1" gutterBottom>
                    {event}
                </Typography>
            ))} 
            </Paper>
  
    
    </Box>
 
)
})
