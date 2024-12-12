// components/BookCard.jsx
import React from 'react';
import { Card, Typography, Row, Col, Space } from 'antd';
import { BookOutlined } from '@ant-design/icons';
const { Text, Link } = Typography;

export const BookCard = ({ title, link, inStock, image, author }: { id: number, link: string, title: string, inStock: number, image: string, author: string }): JSX.Element => {
    return (
        <Card style={{ width: '50%' }}>
            <Row gutter={16}>
                <Col span={6}>
                    <img
                        src={image}
                        alt={title}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </Col>
                <Col span={18}>
                    <Space direction="vertical">
                        <Link href={link} style={{ fontSize: '16px' }}>
                            {title}
                        </Link>
                        <Text>Tác giả: {author}</Text>
                        <Space>
                            <BookOutlined />
                            <Text>(Số sách có sẵn: {inStock})</Text>
                        </Space>
                    </Space>
                </Col>
            </Row>
        </Card>
    );
};

