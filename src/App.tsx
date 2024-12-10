import React from "react";
import {
  BrowserRouter as Router,
  useLocation,
  useRoutes,
} from "react-router-dom";
import AuthProvider from "./components/AuthProvider";
// import AuthNavigator from "./components/AuthNavigator";
import useStyles from "./styles";
import routes from "./routes/routes";

// const { Header, Content } = Layout;

const AppContent: React.FC = () => {
  const route = useRoutes(routes);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const { styles } = useStyles();

  return (<>{route}</>);
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
