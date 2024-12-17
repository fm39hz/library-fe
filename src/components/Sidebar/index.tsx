import React, { useEffect } from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  BookOutlined,
  SettingOutlined,
  TeamOutlined,
  SolutionOutlined,
  TableOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import authenticationApi from "../../services/api/authenticationApi";
import { useAuth } from "../AuthProvider/lib";
import Sider from "antd/es/layout/Sider";

export const Sidebar: React.FC = () => {
  const [role, setRole] = React.useState<string>();
  useEffect(() => {
    const fetchRole = async () => {
      const response = await authenticationApi.getUser();
      if (response.status === 200) {
        setRole(response.data.role);
      }
    };
    fetchRole();
  }, []);
  const items = [
    {
      key: "/",
      label: "Trang chủ",
      icon: <HomeOutlined />,
    },
    {
      key: "/profile",
      label: "Hồ sơ",
      icon: <UserOutlined />,
    },
    {
      key: "books",
      label: "Quản lí",
      hidden: role !== "ADMIN",
      icon: <SettingOutlined />,
      children: [
        { key: "/users", icon: <TeamOutlined />, label: "Người dùng" },
        { key: "/books", icon: <BookOutlined />, label: "Sách" },
        { key: "/publishers", icon: <TableOutlined />, label: "Nhà cung cấp" },
        { key: "/authors", icon: <SolutionOutlined />, label: "Tác giả" },
      ],
    },
    {
      key: "/logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
    },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLoggedIn } = useAuth();

  const handleClick = (e: { key: string }) => {
    if (e.key == "/logout") {
      authenticationApi.logout();
      setIsLoggedIn(false);
      return;
    }
    navigate(e.key);
  };

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
      }}
    >
      <div
        className="logo"
        style={{ height: "32px", margin: "16px", color: "white" }}
      >
        Library management
      </div>
      <Menu
        onClick={handleClick}
        selectedKeys={[location.pathname]}
        defaultSelectedKeys={["/"]}
        mode="inline"
        theme="dark"
        items={items}
      />
    </Sider>
  );
};
export default Sidebar;
