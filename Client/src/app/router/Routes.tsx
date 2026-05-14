import LoginForm from "../../features/accounts/loginForm";
import RegisterForm from "../../features/accounts/RegisterFom";
import ActivivtyDashboard from "../../features/activities/dashboard/ActivivtyDashboard";
import ActivivtyDetailPage from "../../features/activities/details/ActivivtyDetailPage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import Counter from "../../features/Counter/counter";
import Notfound from "../../features/errors/Notfound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestErrors";
import Homepage from "../../features/home/homepage";
import App from "../layout/App";
import RequireAuth from "./RequireAuth";
import { createBrowserRouter, Navigate } from "react-router";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Homepage />
            },
            {
                path: 'login',
                element: <LoginForm />
            },
            {
                path: 'register',
                element: <RegisterForm />
            },
            {
                element: <RequireAuth />,
                children: [
                    {
                        path: 'activities',
                        element: <ActivivtyDashboard />
                    },
                    {
                        path: 'activities/:id',
                        element: <ActivivtyDetailPage />
                    },
                    {
                        path: 'createActivity',
                        element: <ActivityForm key="create" />
                    },
                    {
                        path: 'manage/:id',
                        element: <ActivityForm key="manage" />
                    },
                ]
            },
            {
                path: 'counter',
                element: <Counter />
            },
            {
                path: 'errors',
                element: <TestErrors />
            },
            {
                path: 'not-found',
                element: <Notfound />
            },
            {
                path: 'server-error',
                element: <ServerError />
            },
            {
                path: '*',
                element: <Navigate replace to="/not-found" />
            },
        ]
    }
]);
