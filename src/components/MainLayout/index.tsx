import React from "react";
import { Layout } from "antd";
import AppHeader from "../Header";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

export const MainLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout style={{ marginLeft: 200 }}>
        <AppHeader />
        <Content style={{ margin: "16px" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: "100%" }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
