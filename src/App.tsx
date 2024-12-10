import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { Layout } from "antd";
import NavigationBar from "./components/NavigationBar";
import AuthProvider from "./components/AuthProvider";
// import AuthNavigator from "./components/AuthNavigator";
import Home from "./pages/Home";
import Login from "./pages/Login";
import useStyles from "./styles";
import MainLayout from "./components/MainLayout";
import { AllBooks, Authors, BorrowRequests, Suppliers } from "./pages/Book";
import AuthNavigator from "./components/AuthNavigator";
import User from "./pages/User";
import Subscription from "./pages/Subscription";

const { Header, Content } = Layout;

const AppContent: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const { styles } = useStyles();

  return (<>
    <Routes>
      {!isLoginPage && (
        <Route path="/" element={<AuthNavigator><MainLayout /></AuthNavigator>}>
          <Route index element={<Home />} />
          <Route path="users" element={<User />}/>
          <Route path="books">
            <Route index element={<AllBooks />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="authors" element={<Authors />} />
            <Route path="requests" element={<BorrowRequests />} />
            {/* <Route path="addbook" element={<Home />} /> */}
          </Route>
          <Route path="subscription" element={<Subscription />} />
        </Route>
      )}
      <Route path="/login" element={<Login />} />
    </Routes>
  </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
