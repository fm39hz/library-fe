import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
// import useStyles from "./styles";
import MainLayout from "./components/MainLayout";
import { AllBooks } from "./pages/Book";
const App: React.FC = () => {
  // const { styles } = useStyles();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<User />}/>
          <Route path="books">
            <Route index element={<AllBooks />} />
            <Route path="suppliers" element={<Home />} />
            <Route path="requests" element={<Home />} />
            <Route path="addbook" element={<Home />} />
          </Route>
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
