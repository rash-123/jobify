import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
    HomeLayout,
    Landing,
    Register,
    Login,
    DashboardLayout,
    Error,
    AddJob,
    Stats,
    AllJobs,
    Profile,
    Admin,
    EditJob,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as addJobAction } from "./pages/AddJob";
import { loader as allJobAction } from "./pages/AllJobs";
import { loader as editJobLoader } from "./pages/EditJob";
import { action as editJobAction } from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import { loader as adminJobLoader } from "./pages/Admin";

export const checkDefaultTheme = () => {
    const isDarkTheme = localStorage.getItem("darkTheme") === "true";
    document.body.classList.toggle("dark-theme", isDarkTheme);
    return isDarkTheme;
};

checkDefaultTheme();

const route = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: "register",
                element: <Register />,
                action: registerAction,
            },
            {
                path: "login",
                element: <Login />,
                action: loginAction,
            },
            {
                path: "dashboard",
                element: <DashboardLayout />,
                loader: dashboardLoader,
                children: [
                    {
                        index: true,
                        element: <AddJob />,
                        action: addJobAction,
                    },
                    {
                        path: "stats",
                        element: <Stats />,
                    },
                    {
                        path: "all-jobs",
                        element: <AllJobs />,
                        loader: allJobAction,
                    },
                    {
                        path: "profile",
                        element: <Profile />,
                    },
                    {
                        path: "admin",
                        element: <Admin />,
                        loader: adminJobLoader,
                    },
                    {
                        path: "edit-job/:id",
                        element: <EditJob />,
                        loader: editJobLoader,
                        action: editJobAction,
                    },
                    {
                        path: "delete-job/:id",
                        action: deleteJobAction,
                    }
                ],
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={route} />;
};

export default App;
