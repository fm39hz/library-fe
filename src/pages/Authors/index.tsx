import { TableOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Modal, Table } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { Author } from "../../interfaces/author";
import authorApi from "../../services/api/authorApi";
import { FormModalFields } from "../../interfaces/FormModalProp";
import FormModal from "../../components/FormModal/FormModal";
import CardExtra from "../../components/CardExtra";

const Authors = () => {
  const [isLoading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Author>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [authors, setAuthors] = useState<Author[]>();

  const fetchAuthor = async () => {
    setLoading(true);
    const response = await authorApi.getAllAuthors();
    if (response.status === 200) {
      setAuthors(response.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchAuthor();
  }, []);

  const showModal = (record?: Author) => {
    setSelectedRecord(record ? record : undefined);
    setIsModalVisible(true);
  };

  const handleSave = async (values: Author, isEditing?: boolean) => {
    if (isEditing) {
      await authorApi.updateAuthor(values);
    } else {
      await authorApi.createAuthor(values);
    }
    setIsModalVisible(false);
    await fetchAuthor();
  };

  const fields: FormModalFields<Author>[] = [
    {
      key: "id",
      label: "ID",
      hidden: true,
      required: false,
    },
    {
      key: "name",
      label: "Tên tác giả",
    },
    {
      key: "age",
      label: "Tuổi",
    },

  ]

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
      render: (_: unknown, record: Author): JSX.Element => {
        return (
          <>
            <Button
              type="primary"
              icon={<TableOutlined />}
              onClick={() => showModal(record) }
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
        <FormModal<Author, Author>
          record={selectedRecord}
          fields={fields}
          open={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSave={handleSave}
        />
      )}
      <Card
        title="Danh sách tác giả"
        bordered={false}
        style={{ width: "100%" }}
        extra={CardExtra(() => showModal())}
      >
        <Table columns={collumns} loading={isLoading} dataSource={authors} />
      </Card>
    </>
  );
};

export default Authors;
