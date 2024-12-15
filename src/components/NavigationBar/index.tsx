import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, MenuProps } from "antd";
import {
  BookOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import useStyles from "./styles";
import authenticationApi from "../../services/api/authenticationApi";

type MenuItem = Required<MenuProps>["items"][number];

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { styles } = useStyles();

  const handleLogout = async () => {
    authenticationApi.logout();
  };

  const menuItems: MenuItem[] = [
    { key: "/", icon: <HomeOutlined />, label: "Home" },
    { key: "/books", icon: <BookOutlined />, label: "Books" },
    { key: "/authors", icon: <UserOutlined />, label: "Authors" },
    {
      key: "user",
      icon: <UserOutlined />,
      label: "User",
      children: [
        {
          key: "/settings",
          icon: <SettingOutlined />,
          label: "Settings",
        },
        {
          key: "logout",
          icon: <LogoutOutlined />,
          label: "Logout",
          onClick: handleLogout,
        },
      ],
    },
  ];

  const handleClick = (e: { key: string }) => {
    if (e.key === "logout") {
      handleLogout();
    } else {
      navigate(e.key);
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

export default NavBar;
