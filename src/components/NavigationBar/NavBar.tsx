import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import {
  BookOutlined,
  UserOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import useStyles from "./styles";

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { styles } = useStyles();

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      key: "/books",
      icon: <BookOutlined />,
      label: "Books",
    },
    {
      key: "/authors",
      icon: <UserOutlined />,
      label: "Authors",
    },
    {
      key: "/login",
      icon: <LoginOutlined />,
      label: "Login",
    },
    {
      key: "/logout",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];

  const handleClick = (e: { key: string }) => {
    navigate(e.key);
  };

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[location.pathname]}
      onClick={handleClick}
      items={menuItems}
      className={styles.navbar}
    />
  );
};
