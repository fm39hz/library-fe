import { RouteObject } from "react-router-dom";
import AuthNavigator from "../components/AuthNavigator";
import MainLayout from "../components/MainLayout";
import Authors from "../pages/Authors";
import AllBooks from "../pages/Books";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Publishers from "../pages/Publishers";
import Subscriptions from "../pages/Subscriptions";
import Users from "../pages/Users";

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
      { path: "subscriptions", element: <Subscriptions /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default routes;
