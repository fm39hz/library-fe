import { Card, Col, Divider, Row, Select, Typography } from "antd";
import AuthNavigator from "../../components/AuthNavigator";
import BookCard from "../../components/BookCard";
import Search from "antd/es/input/Search";

const mock = {
  title: "Sách mẫu",
  inStock: 123,
  author: "Nguyễn Văn A",
  id: 0,
  link: "#",
  image: "#",
}

export const Home = () => {
  return (
    <AuthNavigator>
      <Row gutter={16}>
        <Col span={12}>
          <Row gutter={16}>
            <Col span={12}>
              <Select
                placeholder="Tìm theo"
                style={{ width: '100%', marginRight: '10px' }}
                onChange={(value) => console.log(`Selected: ${value}`)}
              >
                <Select.Option value="title">Tiêu đề</Select.Option>
                <Select.Option value="author">Tác giả</Select.Option>
              </Select>
            </Col>
            <Col span={12}>
              <Select
                placeholder="Sắp xếp"
                style={{ width: '100%' }}
                onChange={(value) => console.log(`Selected: ${value}`)}
              >
                <Select.Option value="asc">A-Z</Select.Option>
                <Select.Option value="desc">Z-A</Select.Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Search placeholder="tìm kiếm" onSearch={(value) => console.log(value)} style={{ width: '100%' }} />
        </Col>
      </Row>
      <Divider />
      <BookCard
        id={mock.id}
        link={mock.link}
        title={mock.title}
        inStock={mock.inStock}
        image={mock.image}
        author={mock.author}
      />
    </AuthNavigator>
  );
};
