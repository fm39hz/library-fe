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
import Home from "./pages/Home";
import Login from "./pages/Login";
import useStyles from "./styles";

const { Header, Content } = Layout;

const AppContent: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const { styles } = useStyles();

  return (
    <Layout className={styles.app}>
      {!isLoginPage && (
        <Header className={styles.header}>
          <NavigationBar />
        </Header>
      )}
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/books" element={<Books />} /> */}
          {/* <Route path="/authors" element={<Authors />} /> */}
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
