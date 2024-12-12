import { RouteObject } from "react-router-dom";
import AuthNavigator from "../components/AuthNavigator";
import MainLayout from "../components/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Authors from "../pages/Authors";
import AllBooks from "../pages/Books";
import Publishers from "../pages/Publishers";
import Subscription from "../pages/Subscriptions";
import User from "../pages/Users";
import RentRequests from "../pages/RentRequests";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AuthNavigator>
        <MainLayout />
      </AuthNavigator>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "users", element: <User /> },
      {
        path: "books",
        children: [
          { index: true, element: <AllBooks /> },
          { path: "publishers", element: <Publishers /> },
          { path: "authors", element: <Authors /> },
          { path: "requests/:id", element: <RentRequests /> },
        ],
      },
      { path: "subscription", element: <Subscription /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default routes;
