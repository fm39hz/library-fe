import { RouteObject } from "react-router-dom";
import AuthNavigator from "../components/AuthNavigator";
import MainLayout from "../components/MainLayout";
import Home from "../pages/Home";
import User from "../pages/User";
import { AllBooks, Authors, BorrowRequests, Suppliers } from "../pages/Book";
import Subscription from "../pages/Subscription";
import Login from "../pages/Login";

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
          { path: "suppliers", element: <Suppliers /> },
          { path: "authors", element: <Authors /> },
          { path: "requests", element: <BorrowRequests /> },
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
