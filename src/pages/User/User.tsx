import { TableOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Modal, Table } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";

export const User = () => {
	const [isLoading, setLoading] = useState(false)
	const extra: JSX.Element = <>
		<Search placeholder="tìm kiếm" style={{ width: 200 }} />
		<Divider type="vertical" />
		<Button
			onClick={() => Modal.info({ title: 'test', content: 'test' })}
		>
			Thêm người dùng mới
		</Button>
	</>

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
			render: (text: any): JSX.Element => {
				return <>
					<Button type="primary" icon={<TableOutlined />} onClick={() => Modal.info({ title: 'Thông tin người dùng', content: <>{JSON.stringify(text)}</> })}>Xem</Button>
					<Divider type="vertical" />
					<Button type="primary" icon={<TableOutlined />} onClick={() => Modal.info({ title: 'Thông tin người dùng', content: <>{JSON.stringify(text)}</> })}>Sửa</Button>
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
	return <Card title="Danh sách người dùng" bordered={false} style={{ width: '100%' }} extra={extra}>
		<Table columns={collumns} loading={isLoading} dataSource={dataSrc} />
		</Card>;
};