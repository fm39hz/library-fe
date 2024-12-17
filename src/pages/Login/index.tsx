import React from "react";
import { Form, Card, Input, Button, message, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import authenticationApi from "../../services/api/authenticationApi";
import useStyles from "./styles";
import { LoginRequest } from "../../interfaces/authentication";
import { useAuth } from "../../components/AuthProvider/lib";

const { Title } = Typography;

const Login: React.FC = () => {
  const { styles } = useStyles();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const onFinish = (values: LoginRequest) => {
    authenticationApi
      .login(values)
      .then(() => {
        message.success("Login successful!");
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        setIsLoggedIn(false);
        if (error.response?.data?.message) {
          message.error(error.response.data.message);
        } else {
          message.error("Login failed. Please try again.");
        }
      });
  };

  return (
    <div className={styles.loginContainer}>
      <Card className={styles.styledCard}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
          Login
        </Title>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className={styles.styledForm}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
