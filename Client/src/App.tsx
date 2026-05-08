
import { useEffect, useState } from 'react'
import './App.css'
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';

function App() {
  const [activites, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    axios.get<Activity[]>('/api/activities')
      .then(Response => setActivities(Response.data));
      return ()=> {}
  }, [])
  return (
    <>
      <Typography variant='h3'>Reactivities </Typography>
      <List>
        {activites.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText> {activity.title}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default App
