import { TableOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Modal, Table } from "antd";
import { useState } from "react";
import FormModal from "../../components/FormModal";
import CardExtra from "../../components/CardExtra";

export const User = () => {
	const [isLoading, setLoading] = useState(false)
	const [selectedRecord, setSelectedRecord] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showEditModal = (record: any) => {
		setSelectedRecord(record);
		setIsModalVisible(true);
	};

	const showAddModal = () => {
		setSelectedRecord(null);
		setIsModalVisible(true);
	};

	const collumns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id"
		},
		{
			title: "Tên người dùng",
			dataIndex: "username",
			key: "username"
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email"
		},
		{
			title: "số điện thoại",
			dataIndex: "phone",
			key: "phone"
		},
		{
			title: "Quyền",
			dataIndex: "permission",
			key: "permission"
		},
		{
			title: "Tuỳ chọn",
			dataIndex: "option",
			key: "option",
			render: (text: any, record: any): JSX.Element => {
				return <>
					<Button type="primary" icon={<TableOutlined />} onClick={() => showEditModal(record)}>Sửa</Button>
				</>;
			}
		}
	]
	const dataSrc = [
		{
			id: 1,
			username: 'admin',
			email: 'admin',
			phone: '0123456789',
			permission: 'admin',
			option: 'Option1'
		},
		{
			id: 2,
			username: 'admin',
			email: 'admin',
			phone: '0123456789',
			permission: 'admin',
			option: 'Option2'
		},
		{
			id: 3,
			username: 'admin',
			email: 'admin',
			phone: '0123456789',
			permission: 'admin',
			option: 'Option3'
		},
		{
			id: 4,
			username: 'admin',
			email: 'admin',
			phone: '0123456789',
			permission: 'admin',
			option: 'Option4'
		},
	]
	return <>
		{setIsModalVisible && (
			<FormModal
				record={selectedRecord}
				fields={collumns}
				open={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				onSave={selectedRecord ? () => console.log('update') : () => console.log('save')}
			/>
		)}
		<Card title="Danh sách người dùng" bordered={false} style={{ width: '100%' }} extra={CardExtra(() => showAddModal())}>
			<Table columns={collumns} loading={isLoading} dataSource={dataSrc} />
		</Card>
	</>;
};