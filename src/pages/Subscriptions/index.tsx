import { TableOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import {
  Subscription,
  SubscriptionRequestDto,
  SubscriptionResponseDto,
} from "../../interfaces/subscriptions";
import subscriptionApi from "../../services/api/subscriptionApi";
import CardHeader from "../../components/CardHeader";
import FormModal from "../../components/FormModal";
import { FormModalFields } from "../../components/FormModal/type";
import authenticationApi from "../../services/api/authenticationApi";
import { UserResponseDto } from "../../interfaces/authentication";

const Subscriptions = () => {
  const [isLoading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<SubscriptionRequestDto | undefined>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [subscriptions, setSubscriptions] = useState<SubscriptionResponseDto[]>();
  const [users, setUsers] = useState<UserResponseDto[]>();

  const showModal = (record?: SubscriptionRequestDto) => {
    setSelectedRecord(record ? record : undefined);
    setIsModalVisible(true);
  };

  const handleSave = async (values: SubscriptionRequestDto, isEditing?: boolean) => {
    if (isEditing) {
      await subscriptionApi.updateSubscription(values);
    } else {
      await subscriptionApi.createSubscription(values);
    }
    setIsModalVisible(false);
    await fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    const response = await subscriptionApi.getAllSubscriptions();
    const users = await authenticationApi.getAllUsers();
    setSubscriptions(response.data);
    setUsers(users.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fields: FormModalFields<any>[] = [
    {
      key: "id",
      label: "ID",
      hidden: true,
      required: false,
    },
    {
      key: "user",
      label: "User",
      option: users,
    },
    {
      key: "startDate",
      label: "Ngày bắt đầu",
    },
    {
      key: "endDate",
      label: "Ngày kết thúc",
    },
    {
      key: "period",
      label: "Chu kì (tháng)",
    },
    {
      key: "rentLimit",
      label: "Giới hạn thuê",
    },
    {
      key: "status",
      label: "Trạng thái",
      option: [
        {
          id: "active",
          name: "Active",
        },
        {
          id: "pending",
          name: "Pending",
        },
      ],
    }
  ];
  const collumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên gói",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Giới hạn thuê",
      dataIndex: "rentLimit",
      key: "rentLimit",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Tuỳ chọn",
      dataIndex: "option",
      key: "option",
      render: (_: any, record: SubscriptionResponseDto): JSX.Element => {
        return (
          <>
            <Button
              type="primary"
              icon={<TableOutlined />}
              onClick={() => Modal.info({
                title: "Thông tin gói đăng ký",
                content: (
                    <div>
                    <p><strong>ID:</strong> {record.id}</p>
                    <p><strong>Tên gói:</strong> {record.name}</p>
                    <p><strong>User:</strong> {record.user}</p>
                    <p><strong>Ngày bắt đầu:</strong> {new Date(record.startDate).toString()}</p>
                    <p><strong>Ngày kết thúc:</strong> {new Date(record.endDate).toString()}</p>
                    <p><strong>Chu kì (tháng):</strong> {record.period}</p>
                    <p><strong>Giới hạn thuê:</strong> {record.rentLimit}</p>
                    <p><strong>Trạng thái:</strong> {record.status}</p>
                    <p><strong>Phí trễ hạn:</strong> {record.lateFee}</p>
                    <p><strong>Tỉ lệ phí trễ hạn:</strong> {record.lateFeePercent}</p>
                    <p><strong>Phí còn lại:</strong> {record.remainingFee}</p>
                    </div>
                )
              })}
            >
              Xem
            </Button>
            <Divider type="vertical" />
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
        <FormModal<SubscriptionResponseDto, any>
          record={selectedRecord}
          fields={fields}
          open={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSave={handleSave}
        />
      )}
      <Card
        title="Danh sách thành viên"
        bordered={false}
        style={{ width: "100%" }}
        extra={<CardHeader onSearch={() => { }} addNew={showModal} />}
      >
        <Table columns={collumns} loading={isLoading} dataSource={subscriptions} />
      </Card>
    </>
  );
};

export default Subscriptions;
