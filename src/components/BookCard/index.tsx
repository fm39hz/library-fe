import {
  Card,
  Typography,
  Row,
  Col,
  Space,
  Image,
  Modal,
  Button,
  Select,
  Divider,
} from "antd";
import { BookOutlined } from "@ant-design/icons";
import { Book } from "../../interfaces/book";
import { Author } from "../../interfaces/author";
import { useEffect, useState } from "react";
import authorApi from "../../services/api/authorApi";
import { periods } from "./const";
import subscriptionApi from "../../services/api/subscriptionApi";
import recordApi from "../../services/api/recordApi";
import { RecordRequestDto } from "../../interfaces/record";
const { Text, Link } = Typography;

export const BookCard = (props: Book): JSX.Element => {
  const [author, setAuthor] = useState<Author>();
  const [isLoading, setIsLoading] = useState(true);
  const rentBook = async () => {
    const subscription = await subscriptionApi.getSubsription();
    const records = await recordApi.getRecordBySubscription(
      subscription.data.id,
    );

    if (subscription.status !== 200 || records.status !== 200) {
      return Modal.error({
        title: "Failed to fetch subscription",
        content: "Please try again later",
      });
    }
    const bookRemaining = props.inStock > 0;
    if (!bookRemaining) {
      return Modal.error({
        title: "Out of stock",
        content: "This book is out of stock",
      });
    }
    const limitReached = records.data.length >= subscription.data.rentLimit;
    if (limitReached) {
      return Modal.error({
        title: "Out of rent limit",
        content: "You have reached the limit of rented books",
        okText: "Buy more",
        okButtonProps: { href: "/payment-rent-limit" },
      });
    }
    console.log(subscription);
    let period = periods[0];
    return Modal.info({
      title: (
        <Row>
          <Typography>
            Số lượt mượn còn lại:{" "}
            {subscription.data.rentLimit - records.data.length}
          </Typography>
          <Divider />
          <Typography>Chọn thời gian thuê</Typography>
          <Select
            defaultValue={period}
            onChange={(value: number) => (period = value)}
          />
          <Typography>Tháng</Typography>
        </Row>
      ),
      closable: true,
      okButtonProps: {
        disabled: limitReached,
        onClick: async () => {
          const rentBookRequest: RecordRequestDto = {
            bookId: props.id,
            period: period,
          };
          const response = await subscriptionApi.rentBook(rentBookRequest);
          console.log(response);
          Modal.info({
            title: "Rent book",
            content: `Rent book successfully, return date: ${response.data.exceedDate}`,
            onOk: () => window.location.reload(),
          });
        },
      },
      cancelButtonProps: { disabled: !limitReached, hidden: false },
    });
  };
  useEffect(() => {
    const fetchAuthor = async () => {
      setIsLoading(true);
      const authorResponse = await authorApi.getAuthorById(props.authorId);
      if (authorResponse.status !== 200) {
        console.error("Failed to fetch");
        return;
      }
      setAuthor(authorResponse.data);
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
            // alt={props.name}
            style={{ width: "100%", height: "auto" }}
            onClick={() => Modal.prototype()}
          />
        </Col>
        <Col span={18}>
          <Space direction="vertical">
            <Link key={props.id} style={{ fontSize: "16px" }}>
              {props.name}
            </Link>
            <Text>Tác giả: {author?.name}</Text>
            <Space>
              <BookOutlined />
              <Text>(Số sách có sẵn: {props.inStock})</Text>
            </Space>
            <Button onClick={rentBook}>Mượn sách</Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};
export default BookCard;
