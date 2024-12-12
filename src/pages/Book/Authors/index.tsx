import { TableOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Modal, Table } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import authorApi from "../../../services/api/authorApi";
import { Author } from "../../../interfaces/author";

const Authors = () => {
  const [isLoading, setLoading] = useState(false);
  const [authors, setAuthors] = useState<Author[]>();
  useEffect(() => {
    const fetchAuthor = async () => {
      setLoading(true);
      const response = await authorApi.getAllAuthors();
      if (response.status === 200) {
        setAuthors(response.data);
      }
      setLoading(false);
    };
    fetchAuthor();
  }, []);

  const extra: JSX.Element = (
    <>
      <Search placeholder="tìm kiếm" style={{ width: 200 }} />
      <Divider type="vertical" />
      <Button onClick={() => Modal.info({ title: "test", content: "test" })}>
        Thêm tác giả mới
      </Button>
    </>
  );

  const collumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Tuỳ chọn",
      dataIndex: "option",
      key: "option",
      render: (text: unknown): JSX.Element => {
        return (
          <>
            <Button
              type="primary"
              icon={<TableOutlined />}
              onClick={() =>
                Modal.info({
                  title: "Thông tin",
                  content: <>{JSON.stringify(text)}</>,
                })
              }
            >
              Xem
            </Button>
            <Divider type="vertical" />
            <Button
              type="primary"
              icon={<TableOutlined />}
              onClick={() =>
                Modal.info({
                  title: "Thông tin",
                  content: <>{JSON.stringify(text)}</>,
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
      title="Danh sách tác giả"
      bordered={false}
      style={{ width: "100%" }}
      extra={extra}
    >
      <Table columns={collumns} loading={isLoading} dataSource={authors} />
    </Card>
  );
};

export default Authors;
