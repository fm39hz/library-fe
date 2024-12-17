import { TableOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import FormModal from "../../components/FormModal";
import CardExtra from "../../components/CardExtra";
import { User as UserInterface } from "../../interfaces/user";
import { FormModalFields } from "../../interfaces/FormModalProp";

const Users = () => {
	const [isLoading, setLoading] = useState(false)
	const [selectedRecord, setSelectedRecord] = useState<UserInterface | null>();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [users, setUsers] = useState<UserInterface[]>();

	
	const fetchData = async () => {
		setLoading(true)
		// const result = await userApi.getAllUsers();
		// setUsers(data)
		setLoading(false)
	}

	useEffect(() => {
		fetchData(); 
	}, [])

	const showModal = (record?: UserInterface) => {
		setSelectedRecord(record ? record : null);
		setIsModalVisible(true);
	}

	const handleSave = async (values: UserInterface, isEditing?: boolean) => {
		if (isEditing) {
			// await userApi.updateUser(values);
		} else {
			// await userApi.createUser(values);
		}
		setIsModalVisible(false);
	}

	const fields: FormModalFields<any>[] = [
		{
			label: 'Tên người dùng',
			key: 'username',
		},
		{
			label: 'Mật khẩu',
			key: 'password',
			required: false
		},
		{
			label: 'Email',
			key: 'email',
		},
		{
			label: 'số điện thoại',
			key: 'phone',
		},
		{
			label: 'Quyền',
			key: 'permission',
			option: [
				{
					id: 'admin',
					name: 'Admin',
				},
				{
					id: 'user',
					name: 'User',
				}
			]
		}
	]

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
					<Button type="primary" icon={<TableOutlined />} onClick={() => showModal(record)}>Sửa</Button>
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
				fields={fields}
				open={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				onSave={selectedRecord ? () => console.log('update') : () => console.log('save')}
			/>
		)}
		<Card title="Danh sách người dùng" bordered={false} style={{ width: '100%' }} extra={CardExtra(() => showModal())}>
			<Table columns={collumns} loading={isLoading} dataSource={dataSrc} />
		</Card>
	</>;
};

export default Users;