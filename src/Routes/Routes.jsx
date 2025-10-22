import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import HomePage from "../Pages/HomePage";
import AboutUs from "../Pages/AboutUs";
import Profile from "../Pages/Profile";
import SignUp from "../Pages/SignUp";
import Signin from "../Pages/Signin";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

 export const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element:<HomePage></HomePage>,
            },
            {
                path: '/about',
                element:<AboutUs></AboutUs>,
            },
            {
                path: '/profile',
                element:<PrivateRoute><Profile></Profile></PrivateRoute>,
            },
            {
                path: '/signup',
                element:<SignUp></SignUp>,
            },
            {
                path: '/signin',
                element:<Signin></Signin>,
            },
        ]
    }
])