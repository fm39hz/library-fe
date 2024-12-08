import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
// import useStyles from "./styles";
import MainLayout from "./components/MainLayout";
import { AllBooks, Authors, Suppliers, BorrowRequests } from "./pages/Book";
import Subscription from "./pages/Subscription";
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
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="authors" element={<Authors />} />
            <Route path="requests" element={<BorrowRequests />} />
            {/* <Route path="addbook" element={<Home />} /> */}
          </Route>
          <Route path="subscription" element={<Subscription />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
