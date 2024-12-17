import React, { useEffect } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, HomeOutlined, BookOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import authenticationApi from "../../services/api/authenticationApi";
import { useAuth } from "../AuthProvider/lib";

const { Sider } = Layout;
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
      icon: <HomeOutlined />,
      label: "Trang chủ",
    },
    {
      key: "/users",
      icon: <UserOutlined />,
      label: "Quản lí người dùng",
    },
    {
      key: "books",
      label: "Quản lí",
      hidden: role !== "ADMIN",
      icon: <BookOutlined />,
      children: [
        { key: "/books", label: "Toàn bộ sách" },
        { key: "/books/publishers", label: "Nhà cung cấp" },
        { key: "/books/authors", label: "Tác giả" },
      ],
    },
    {
      key: "/logout",
      label: "Đăng xuất",
      icon: <UserOutlined />,
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
        height: "100vh", // Chiều cao bằng toàn màn hình
        position: "fixed", // Cố định sidebar
        left: 0, // Căn trái
        top: 0, // Căn trên
        bottom: 0, // Kéo dài tới đáy
        zIndex: 1000, // Đảm bảo sidebar luôn nổi trên các thành phần khác
      }}
    >
      <div
        className="logo"
        style={{ height: "32px", margin: "16px", color: "white" }}
      >
        My Logo
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
