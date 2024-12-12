// Sidebar.tsx
import React from "react";
import { Layout, Menu, MenuProps } from "antd";
import { UserOutlined, HomeOutlined, BookOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import authenticationApi from "../../services/api/authenticationApi";

const { Sider } = Layout;

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
    label: "Quản lí sách",
    icon: <BookOutlined />,
    children: [
      { key: "/books", label: "Toàn bộ sách" },
      { key: "/books/suppliers", label: "Nhà cung cấp" },
      { key: "/books/authors", label: "Tác giả" },
      { key: "/books/requests", label: "Yêu cầu mượn sách" },
      // { key: '/books/addbook', label: 'Nhập sách mới' },
    ],
  },
  {
    key: "/subscription",
    label: "Thành viên thân thiết",
    icon: <UserOutlined />,
  },
  {
    key: "/change-password",
    label: "Đổi mật khẩu",
    icon: <UserOutlined />,
  },
  {
    key: "/logout",
    label: "Đăng xuất",
    icon: <UserOutlined />,
  },
];
export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: { key: string }) => {
    if (e.key == "/logout") {
      authenticationApi.logout();
      navigate("/login");
      return;
    }
    navigate(e.key);
  };

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
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
