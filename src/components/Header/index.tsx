import React from "react";
import { Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import useStyles from "./styles";

export const AppHeader: React.FC = () => {
  const { styles } = useStyles();
  return (
    <Header className={styles.header}>
      <Title level={3} className={styles.title}>
        <strong>Thư viện sách</strong>
      </Title>
    </Header>
  );
};

export default AppHeader;
