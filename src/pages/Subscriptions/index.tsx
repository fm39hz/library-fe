import { TableOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Modal, Table } from "antd";
import { useState } from "react";
import { Subscription, SubscriptionResponseDto } from "../../interfaces/subscriptions";
import subscriptionApi from "../../services/api/subscriptionApi";
import CardExtra from "../../components/CardExtra";
import FormModal from "../../components/FormModal";

const Subscriptions = () => {
	const [isLoading, setLoading] = useState(false)
	const [selectedRecord, setSelectedRecord] = useState<Subscription>();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [subscriptions, setSubscriptions] = useState<Subscription[]>();

	const showModal = (record?: Subscription) => {
		setSelectedRecord(record ? record : undefined);
		setIsModalVisible(true);
	};

	const fetchData = async () => {
		setLoading(true);
		const response = await subscriptionApi.getSubsription();
		// setSubscriptions(response);
		setLoading(false);
	}
	const collumns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id"
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email"
		},
		{
			title: "Ngày đăng kí",
			dataIndex: "reg_date",
			key: "reg_date"
		},
		{
			title: "Tuỳ chọn",
			dataIndex: "option",
			key: "option",
			render: (text: any): JSX.Element => {
				return <>
					<Button type="primary" icon={<TableOutlined />} onClick={() => Modal.info({ title: 'Thông tin', content: <>{JSON.stringify(text)}</> })}>Xem</Button>
					<Divider type="vertical" />
					<Button type="primary" icon={<TableOutlined />} onClick={() => Modal.info({ title: 'Thông tin', content: <>{JSON.stringify(text)}</> })}>Sửa</Button>
				</>;
			}
		}
	]
	const dataSrc = [
		{
			id: 1,
			name: "Nguyen Van A",
			email: "dX4dM@example.com",
			reg_date: "2022-01-01",
			option: "option"
		},
	]
	return <>
	{isModalVisible && (
        <FormModal<Author, Subscription>
          record={selectedRecord}
          fields={fields}
          open={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSave={handleSave}
        />
      )}<Card title="Danh sách thành viên" bordered={false} style={{ width: '100%' }} extra={CardExtra(() => showModal())}>
		<Table columns={collumns} loading={isLoading} dataSource={dataSrc} />
	</Card>;
	</>
};

export default Subscriptions;