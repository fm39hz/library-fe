import React, { useState, useEffect } from "react";
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
import authenticationApi from "../../services/api/authenticationApi";
import { MenuItemType } from "antd/es/menu/interface";

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { styles } = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    authenticationApi.logout();
    setIsLoggedIn(false);
    navigate("/");
  };

  const menuItems: MenuItemType[] = [
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
  ];

  if (isLoggedIn) {
    menuItems.push({
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    });
  } else {
    menuItems.push({
      key: "/login",
      icon: <LoginOutlined />,
      label: "Login",
    });
  }

  const handleClick = (e: { key: string }) => {
    if (e.key !== "logout") {
      navigate(e.key);
    }
  };

  return isLoggedIn ? (
    <Menu
      mode="horizontal"
      selectedKeys={[location.pathname]}
      onClick={handleClick}
      items={menuItems}
      className={styles.navbar}
    />
  ) : (
    <div></div>
  );
};
