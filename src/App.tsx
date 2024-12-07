import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Home from "./pages/Home";
import NavigationBar from "./components/NavigationBar";
import useStyles from "./styles";

const { Header, Content } = Layout;

const App: React.FC = () => {
  const { styles } = useStyles();
  return (
    <Router>
      <Layout className={styles.app}>
        <Header>
          <NavigationBar />
        </Header>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/books" element={<Books />} /> */}
            {/* <Route path="/authors" element={<Authors />} /> */}
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/logout" element={<Logout />} /> */}
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
