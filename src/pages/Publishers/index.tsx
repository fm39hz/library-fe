import { TableOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Modal, Table } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { Publisher } from "../../interfaces/publishers";
import publisherApi from "../../services/api/publisherApi";
import { FormModalFields } from "../../components/FormModal/type";
import CardHeader from "../../components/CardHeader";
import FormModal from "../../components/FormModal";

const Publishers = () => {
  const [isLoading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Publisher>();
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const showModal = (record?: Publisher) => {
    setSelectedRecord(record ? record : undefined);
    setIsModalVisible(true);
  };

  const handleSave = async (values: Publisher, isEditing?: boolean) => {
    if (isEditing) {
      // await bookApi.updateBook(values);
    } else {
      // await bookApi.createBook(values);
    }
    setIsModalVisible(false);
    // await fetchData();
  };

  const fields: FormModalFields<Publisher>[] = [
    {
      key: "id",
      label: "ID",
      hidden: true,
      required: false,
    },
    {
      key: "name",
      label: "Tên",
    }
  ];

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

      render: (text: unknown, record: Publisher): JSX.Element => {
        return (
          <>
            <Button
              type="primary"
              icon={<TableOutlined />}
              onClick={() => showModal(record)}
            >
              Sửa
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <>
      {isModalVisible && (
        <FormModal<Publisher, any>
          record={selectedRecord}
          fields={fields}
          open={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSave={handleSave}
        />
      )}
      <Card
        title="Danh sách nhà cung cấp"
        bordered={false}
        style={{ width: "100%" }}
        extra={<CardHeader onSearch={() => { }} addNew={showModal} />}
      >
        <Table columns={collumns} loading={isLoading} dataSource={publishers} />
      </Card>
    </>
  );
};

export default Publishers;
