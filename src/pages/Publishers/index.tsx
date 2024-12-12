import { TableOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Modal, Table } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { Publisher } from "../../interfaces/publishers";
import publisherApi from "../../services/api/publisherApi";

const Publishers = () => {
  const [isLoading, setLoading] = useState(false);
  const [publishers, setPublishers] = useState<Publisher[]>();
  useEffect(() => {
    const fetchPublisher = async () => {
      setLoading(true);
      const result = await publisherApi.getAllPublishers();
      if (result.status === 200) {
        setPublishers(result.data);
      }
      setLoading(false);
    };
    fetchPublisher();
  }, []);
  const extra: JSX.Element = (
    <>
      <Search placeholder="tìm kiếm" style={{ width: 200 }} />
      <Divider type="vertical" />
      <Button onClick={() => Modal.info({ title: "test", content: "test" })}>
        Thêm nhà cung cấp mới
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
      title: "Tên",
      dataIndex: "name",
      key: "name",
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
      title="Danh sách nhà cung cấp"
      bordered={false}
      style={{ width: "100%" }}
      extra={extra}
    >
      <Table columns={collumns} loading={isLoading} dataSource={publishers} />
    </Card>
  );
};

export default Publishers;
