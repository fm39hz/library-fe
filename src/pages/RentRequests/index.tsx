import { TableOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Modal, Table } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const RentRequests = () => {
  const [isLoading, setLoading] = useState(false);
  const id = Number(useParams().id);
  const extra: JSX.Element = (
    <>
      <Search placeholder="tìm kiếm" style={{ width: 200 }} />
    </>
  );

  const collumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Người mượn",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Sách mượn",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày mượn",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
  const dataSrc = [
    {
      id: 1,
      name: "Nguyen Van A",
      email: "nva@nva.com",
      book: 1,
      date: "2022-01-01",
      status: "Pending",
      option: "option",
    },
  ];
  return (
    <Card
      title="Danh sách yêu cầu mượn sách"
      bordered={false}
      style={{ width: "100%" }}
      extra={extra}
    >
      <Table columns={collumns} loading={isLoading} dataSource={dataSrc} />
    </Card>
  );
};

export default RentRequests;

