import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Home from "./pages/Home";
import NavigationBar from "./components/NavigationBar";
import Login from "./pages/Login";
import authenticationApi from "./services/api/authenticationApi";
import "./App.css";

const { Header, Content } = Layout;

const App: React.FC = () => {
  authenticationApi.initializeToken();

  return (
    <Router>
      <Layout className="app">
        <Header className="app-header">
          <NavigationBar />
        </Header>
        <Content className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/books" element={<Books />} /> */}
            {/* <Route path="/authors" element={<Authors />} /> */}
            {/* <Route path="/logout" element={<Logout />} /> */}
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
