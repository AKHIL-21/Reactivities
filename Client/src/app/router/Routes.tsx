import ActivivtyDashboard from "../../features/activities/dashboard/ActivivtyDashboard";
import ActivivtyDetails from "../../features/activities/details/ActivivtyDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import Homepage from "../../features/home/homepage";
import App from "../layout/App";
import { createBrowserRouter } from "react-router";
export const routes = createBrowserRouter([
     {
        path : '/', 
        element : <App />,
        children :[
            {
                path : '',
                element : <Homepage />
            },
            {
                path : 'activities',
                element : <ActivivtyDashboard />
            },{
                path : 'activities/:id',
                element : <ActivivtyDetails />
            },
            {
                path : 'createActivity',
                element :<ActivityForm  key="create"/>
            },
            {
                path : 'manage/:id',
                element :<ActivityForm key="manage"/>
            }

        ]
     }
])  

