import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import AuthProvider from "./components/AuthProvider";
import routes from "./config/route";

const AppContent: React.FC = () => {
  const route = useRoutes(routes);

  return <>{route}</>;
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
