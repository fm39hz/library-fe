import React from 'react';
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

export const AppHeader: React.FC = () => {
  return (
    <Header style={{ background: '#fff', padding: '10px 20px'}}>
      <Title level={3} style={{ margin: 0 }}>
        My App
      </Title>
    </Header>
  );
};

