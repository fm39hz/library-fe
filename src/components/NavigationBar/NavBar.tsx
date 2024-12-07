import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import {
  BookOutlined,
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import useStyles from "./styles";
import authenticationApi from "../../services/api/authenticationApi";
import { MenuItemType } from "antd/es/menu/interface";

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { styles } = useStyles();

  const handleLogout = async () => {
    authenticationApi.logout();
    navigate("/login");
  };

  const menuItems: MenuItemType[] = [
    { key: "/", icon: <HomeOutlined />, label: "Home" },
    { key: "/books", icon: <BookOutlined />, label: "Books" },
    { key: "/authors", icon: <UserOutlined />, label: "Authors" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];

  const handleClick = (e: { key: string }) => {
    if (e.key !== "logout") {
      navigate(e.key);
    } else {
      handleLogout();
    }
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
