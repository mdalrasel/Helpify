import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import SignIn from "../pages/authentication/SignIn";
import Register from "../pages/authentication/Register";
import ErrorPage from "../pages/errorPage/ErrorPage";
import AllPost from "../components/AllPost";
import AddService from "../pages/services/AddService";
import Details from "../components/Details";
import PrivateRoute from "./PrivateRoute";
import ServiceToDo from "../pages/services/ServiceToDo";
import UpdateService from "../pages/services/UpdateService";
import ManageServices from "../pages/services/ManageServices";
import BookedServices from "../pages/services/BookedServices";
import About from "../components/About";
import Contact from "../components/Contact";


export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    Component: MainLayout,
    handle: { title: "Helpify" },
    children: [
      {
        index: true,
        path: '/',
        Component: Home,
        handle: { title: "Home | Helpify" }
      },
      {
        path: '/signIn',
        Component: SignIn,
        handle: { title: " Sign In | Helpify" }
      },
      {
        path: 'register',
        Component: Register,
        handle: { title: "Register | Helpify" }
      },
      {
        path: 'allPost',
        Component: AllPost,
        handle: { title: "Services | Helpify" }
      },
      {
        path: 'add-service',
        element: <PrivateRoute><AddService /></PrivateRoute>,
        handle: { title: "Add Service | Helpify" }
      },
      {
        path: '/details/:id',
        element: <PrivateRoute><Details /></PrivateRoute>,
        handle: { title: "Details Service | Helpify" }
      },
      {
        path: '/manage-services',
        element: <PrivateRoute><ManageServices /></PrivateRoute>,
        handle: { title: "Manage Services | Helpify" }
      },
      {
        path: '/update-service/:id',
        element: <PrivateRoute><UpdateService /></PrivateRoute>,
        handle: { title: "Update Service | Helpify" }
      },
      {
        path: '/booked-services',
        element: <PrivateRoute><BookedServices /></PrivateRoute>,
        handle: { title: "Booked Services | Helpify" }
      },
      {
        path: '/service-to-do',
        element: <PrivateRoute><ServiceToDo /></PrivateRoute>,
        handle: { title: "Service To - Do | Helpify" }
      },
      {
        path:'about',
        Component:About
      },
      {
        path:'/contact',
        Component:Contact
      }
    ]
  },
]);