import { TableOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Modal, Table } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";

export const Subscription = () => {
	const [isLoading, setLoading] = useState(false)
	const extra: JSX.Element = <>
		<Search placeholder="tìm kiếm" style={{ width: 200 }} />
		<Divider type="vertical" />
		<Button
			onClick={() => Modal.info({ title: 'test', content: 'test' })}
		>
			Thêm thành viên mới
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
	return <Card title="Danh sách thành viên" bordered={false} style={{ width: '100%' }} extra={extra}>
		<Table columns={collumns} loading={isLoading} dataSource={dataSrc} />
		</Card>;
};