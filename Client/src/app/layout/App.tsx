
import { useEffect, useState } from 'react'
import './styles.css'
import { Box, Container, CssBaseline } from '@mui/material';
import axios from 'axios';
import NavBar from './NavBar';
import ActivivtyDashboard from '../../features/activities/dashboard/ActivivtyDashboard';

function App() {
  const [activites, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectActivity] = useState<Activity | undefined>(undefined);
  const[editMode, setEditMode] = useState(false);
  useEffect(() => {
    axios.get<Activity[]>('/api/activities')
      .then(Response => setActivities(Response.data));
      return ()=> {}
  }, [])
  const handleSelectActivity = (id : string) => {
    setSelectActivity(activites.find(x => x.id === id));
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
  const handleSubmitForm = (activity : Activity) => {
    if (activity.id) {
      setActivities([...activites.filter(x => x.id !== activity.id), activity]);
      setSelectActivity(activity);
    } else {
      activity.id = crypto.randomUUID();
      setActivities([...activites, activity]);
      setSelectActivity(activity);
    }
    setEditMode(false);
  }
  const handleDeleteActivity = (id : string) => {
    setActivities([...activites.filter(x => x.id !== id)]);
  }
  return (
    <Box sx={{ bgcolor: '#eeeeee' }}>
    <CssBaseline />
      <NavBar openForm={handleFormOpen} />
      <Container maxWidth="xl" sx={{marginTop : 3}}>
      <ActivivtyDashboard 
      deleteActivity={handleDeleteActivity}
      submitForm={handleSubmitForm}
      editMode={editMode}
      openForm={handleFormOpen}
      closeForm={handleFormClose}
      selectActivity={handleSelectActivity}
      handleCancelSelectActivity={handleCancelSelectActivity}
      selectedActivity={selectedActivity}
      activities={activites} />
      </Container>

    </Box>
  )
}

export default App
