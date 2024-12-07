import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { Layout } from "antd";
import "./App.css";
import AuthProvider from "./components/AuthContext";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Login from "./pages/Login";

const { Header, Content } = Layout;

const AppContent: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <Layout className="app">
      {!isLoginPage && (
        <Header className="app-header">
          <NavigationBar />
        </Header>
      )}
      <Content className={`app-content ${isLoginPage ? "login-page" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/books" element={<Books />} /> */}
          {/* <Route path="/authors" element={<Authors />} /> */}
          {/* <Route path="/logout" element={<Logout />} /> */}
        </Routes>
      </Content>
    </Layout>
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
