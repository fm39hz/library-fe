import { TableOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Modal, Table } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";

export const Authors = () => {
	const [isLoading, setLoading] = useState(false)
	const extra: JSX.Element = <>
		<Search placeholder="tìm kiếm" style={{ width: 200 }} />
		<Divider type="vertical" />
		<Button
			onClick={() => Modal.info({ title: 'test', content: 'test' })}
		>
			Thêm tác giả mới
		</Button>
	</>

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
			title: "Age",
			dataIndex: "age",
			key: "age"
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
			name: 'abcxyz',
			age: '30',
			option: 'Option1'
		},
	]
	return <Card title="Danh sách tác giả" bordered={false} style={{ width: '100%' }} extra={extra}>
		<Table columns={collumns} loading={isLoading} dataSource={dataSrc} />
		</Card>;
};