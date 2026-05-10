
import {  useState } from 'react'
import './styles.css'
import { Box, Container, CssBaseline, Typography } from '@mui/material';
import NavBar from './NavBar';
import ActivivtyDashboard from '../../features/activities/dashboard/ActivivtyDashboard';
import { useActivities } from '../../lib/hooks/useActivities';

function App() {
  const [selectedActivity, setSelectActivity] = useState<Activity | undefined>(undefined);
  const[editMode, setEditMode] = useState(false);
const  {activities, isPending} = useActivities ();
  const handleSelectActivity = (id : string) => {
    setSelectActivity(activities?.find(x => x.id === id));
  }
  const handleCancelSelectActivity = () => {
    setSelectActivity(undefined);
  }
  const handleFormOpen = (id? : string) => {
    if (id) {
      handleSelectActivity(id);
    } else {
      handleCancelSelectActivity();
    }

    setEditMode(true);
  } 
  const handleFormClose = () => {
    setEditMode(false);
  }
  const handleActivitySaved = (activity: Activity) => {
    setSelectActivity(activity);
    setEditMode(false);
  }

  return (
    <Box sx={{ bgcolor: '#eeeeee',minHeight : '100vh' }}>
    <CssBaseline />
      <NavBar openForm={handleFormOpen} />
      <Container maxWidth="xl" sx={{marginTop : 3}}>
        {!activities || isPending ?<Typography>Loading...</Typography>:    <ActivivtyDashboard 
      editMode={editMode}
      openForm={handleFormOpen}
      closeForm={handleFormClose}
      onActivitySaved={handleActivitySaved}
      selectActivity={handleSelectActivity}
      handleCancelSelectActivity={handleCancelSelectActivity}
      selectedActivity={selectedActivity}
      activities={activities} />}
   
      </Container>

    </Box>
  )
}

export default App
