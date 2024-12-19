import { TableOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import FormModal from "../../components/FormModal";
import CardHeader from "../../components/CardHeader/";
import { User as UserInterface } from "../../interfaces/user";
import { FormModalFields } from "../../interfaces/FormModalProp";
import authenticationApi from "../../services/api/authenticationApi";
import { UserResponseDto } from "../../interfaces/authentication";

const Users = () => {
  const [isLoading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<UserInterface | null>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [users, setUsers] = useState<UserResponseDto[]>();

  const fetchData = async () => {
    setLoading(true);
    const result = await authenticationApi.getAllUsers();
    setUsers(result.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showModal = (record?: UserInterface) => {
    setSelectedRecord(record ? record : null);
    setIsModalVisible(true);
  };

  const handleSave = async (values: UserInterface, isEditing?: boolean) => {
    if (isEditing) {
      // await userApi.updateUser(values);
    } else {
      // await userApi.createUser(values);
    }
    setIsModalVisible(false);
  };

  const fields: FormModalFields<any>[] = [
    {
      label: "Tên",
      key: "name",
    },
    {
      label: "Mật khẩu",
      key: "password",
      required: false,
    },
    {
      label: "Email",
      key: "email",
    },
    {
      label: "số điện thoại",
      key: "phone",
    },
    {
      label: "Vai trò",
      key: "role",
      option: [
        {
          id: "ADMIN",
          name: "ADMIN",
        },
        {
          id: "USER",
          name: "USER",
        },
      ],
    },
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Tuỳ chọn",
      dataIndex: "option",
      key: "option",
      render: (_: any, record: any): JSX.Element => {
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
      {setIsModalVisible && (
        <FormModal
          record={selectedRecord}
          fields={fields}
          open={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSave={
            selectedRecord
              ? () => console.log("update")
              : () => console.log("save")
          }
        />
      )}
      <Card
        title="Danh sách người dùng"
        bordered={false}
        style={{ width: "100%" }}
        extra={<CardHeader onSearch={() => { }} addNew={showModal} />}
      >
        <Table columns={collumns} loading={isLoading} dataSource={users} />
      </Card>
    </>
  );
};

export default Users;
