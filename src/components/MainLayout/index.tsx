import React from "react";
import { Layout } from "antd";
import AppHeader from "../Header";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import useStyles from "./styles";

export const MainLayout: React.FC = () => {
  const { styles } = useStyles();
  return (
    <Layout className={styles.mainLayout}>
      <Sidebar />
      <Layout className={styles.contentLayout}>
        <AppHeader />
        <Content className={styles.contentContainer}>
          <div className={styles.content}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
