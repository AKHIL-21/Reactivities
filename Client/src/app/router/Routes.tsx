import ActivivtyDashboard from "../../features/activities/dashboard/ActivivtyDashboard";
import ActivivtyDetailPage from "../../features/activities/details/ActivivtyDetailPage";
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
                element : <ActivivtyDetailPage />
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

