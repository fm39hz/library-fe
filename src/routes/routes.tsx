import { RouteObject } from "react-router-dom";
import AuthNavigator from "../components/AuthNavigator";
import MainLayout from "../components/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Authors from "../pages/Authors";
import AllBooks from "../pages/Books";
import Publishers from "../pages/Publishers";
import Subscription from "../pages/Subscriptions";
import Users from "../pages/Users";
import Profile from "../pages/Profile";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AuthNavigator>
        <MainLayout />
      </AuthNavigator>
    ),
    children: [
      { path: "", element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "users", element: <Users /> },
      { path: "books", element: <AllBooks /> },
      { path: "publishers", element: <Publishers /> },
      { path: "authors", element: <Authors /> },
      { path: "subscription", element: <Subscription /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default routes;
