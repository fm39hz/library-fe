import { Card, Typography, Row, Col, Space, Image, Modal, Button } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { Book } from "../../interfaces/book";
import { Author } from "../../interfaces/author";
import { useEffect, useState } from "react";
import authorApi from "../../services/api/authorApi";
const { Text, Link } = Typography;

export const BookCard = (props: Book): JSX.Element => {
  const [author, setAuthor] = useState<Author>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchAuthor = async () => {
      setIsLoading(true);
      const response = await authorApi.getAuthorById(props.authorId);
      if (response.status !== 200) {
        console.error("Failed to fetch author");
        return;
      }
      setAuthor(response.data);
      setIsLoading(false);
    };
    fetchAuthor();
  }, [props.authorId]);
  return isLoading ? (
    <></>
  ) : (
    <Card style={{ width: "50%" }}>
      <Row gutter={16}>
        <Col span={6}>
          <Image
            src={props.image}
            alt={props.title}
            style={{ width: "100%", height: "auto" }}
            onClick={() => Modal.prototype()}
          />
        </Col>
        <Col span={18}>
          <Space direction="vertical">
            <Link key={props.id} style={{ fontSize: "16px" }}>
              {props.title}
            </Link>
            <Text>Tác giả: {author?.name}</Text>
            <Space>
              <BookOutlined />
              <Text>(Số sách có sẵn: {props.inStock})</Text>
            </Space>
            <Button onClick={() => { }}>Mượn sách</Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};
