import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { Layout } from "antd";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthProvider from "./components/AuthProvider";
import AuthNavigator from "./components/AuthNavigator";

const { Header, Content } = Layout;

const AppContent: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <Layout className="app">
      {!isLoginPage && (
        <Header>
          <NavigationBar />
        </Header>
      )}
      <Content>
        <Routes>
          <Route
            path="/"
            element={
              <AuthNavigator>
                <Home />
              </AuthNavigator>
            }
          />
          <Route path="/login" element={<Login />} />
          {/* <Route */}
          {/*   path="/books" */}
          {/*   element={ */}
          {/*     <AuthNavigator> */}
          {/*       <Books /> */}
          {/*     </AuthNavigator> */}
          {/*   } */}
          {/* /> */}
          {/* <Route */}
          {/*   path="/authors" */}
          {/*   element={ */}
          {/*     <AuthNavigator> */}
          {/*       <Authors /> */}
          {/*     </AuthNavigator> */}
          {/*   } */}
          {/* /> */}
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
