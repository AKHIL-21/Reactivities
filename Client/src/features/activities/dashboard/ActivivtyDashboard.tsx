import Grid from "@mui/material/Grid";
import ActivityList from "./ActivityList";
import ActivivtyDetails from "../details/ActivivtyDetails";
import ActivityForm from "../form/ActivityForm";

type Props ={
 activities : Activity[]
 selectActivity: (id: string) => void
 handleCancelSelectActivity: () => void
 selectedActivity?: Activity | undefined
 openForm : (id? : string) => void
 closeForm : () => void
 onActivitySaved: (activity: Activity) => void
 editMode : boolean,
}
export default function ActivivtyDashboard({
  activities,
  selectActivity,
  handleCancelSelectActivity,
  selectedActivity,
  openForm,
  closeForm,
  onActivitySaved,
  editMode

} : Props) {
  return (
   <Grid container spacing={3}> 
     <Grid size={7} >
        <ActivityList activities={activities} selectActivity={selectActivity} />
        
     </Grid>
        <Grid size={5} >  
          {selectedActivity && !editMode && (
            <ActivivtyDetails
              openForm={openForm}
              activity={selectedActivity}
              handleCancelSelectActivity={handleCancelSelectActivity}
            />
          )}
          {editMode && (
          <ActivityForm
            closeForm={closeForm}
            onActivitySaved={onActivitySaved}
            activity={selectedActivity}
          />
)          }
        </Grid>
   </Grid>
  )
}
