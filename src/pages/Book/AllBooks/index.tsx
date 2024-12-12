import { TableOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Input, Modal, Table } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { Book } from "../../../interfaces/book";
import bookApi from "../../../services/api/bookApi";
import authorApi from "../../../services/api/authorApi"; // Import authorApi
import Typography from "antd/es/typography/Typography";

const AllBooks = () => {
  const [isLoading, setLoading] = useState(false);
  const [books, setBooks] = useState<Book[]>();

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      const result = await bookApi.getAllBooks();
      if (result.status === 200) {
        setBooks(result.data);
      }
      setLoading(false);
    };
    loadBooks();
  }, []);

  const modalText = {
    title: "Thêm đầu sách mới",
    content: (
      <div style={{}}>
        <Input placeholder="Tên đầu sách" style={{ width: 200 }} />
        <Input placeholder="Tác giả" style={{ width: 200 }} />
        <Input placeholder="Thể loại" style={{ width: 200 }} />
        <Input placeholder="Số lượng" style={{ width: 200 }} />
      </div>
    ),
  };

  const extra: JSX.Element = (
    <>
      <Search placeholder="tìm kiếm" style={{ width: 200 }} />
      <Divider type="vertical" />
      <Button
        onClick={() =>
          Modal.info({ title: modalText.title, content: modalText.content })
        }
      >
        Thêm đầu sách mới
      </Button>
    </>
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tiêu dề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Số lượng",
      dataIndex: "inStock",
      key: "inStock",
    },
    {
      title: "Tuỳ chọn",
      dataIndex: "option",
      key: "description",
      render: (_: unknown, record: Book) => {
        const showBookInfo = async () => {
          const authorResult = await authorApi.getAuthorById(record.authorId);
          const authorName = authorResult.data.name;

          Modal.info({
            title: "Thông tin đầu sách",
            content: (
              <div>
                <Typography>
                  <strong>Tiêu đề:</strong> {record.title}
                </Typography>
                <Typography>
                  <strong>Tác giả:</strong> {authorName}
                </Typography>
                <Typography>
                  <strong>Mô tả:</strong> {record.description}
                </Typography>
              </div>
            ),
          });
        };

        return (
          <>
            <Button
              type="primary"
              icon={<TableOutlined />}
              onClick={showBookInfo}
            >
              Xem
            </Button>
            <Divider type="vertical" />
            <Button
              type="primary"
              icon={<TableOutlined />}
              onClick={() =>
                Modal.info({
                  title: modalText.title,
                  content: modalText.content,
                })
              }
            >
              Sửa
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <Card
      key="allBooks"
      title="Danh sách các đầu sách"
      bordered={false}
      style={{ width: "100%" }}
      extra={extra}
    >
      <Table columns={columns} loading={isLoading} dataSource={books} />
    </Card>
  );
};

export default AllBooks;
