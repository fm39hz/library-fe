import React, { useState, useEffect } from "react";
import { Input, Modal, Form } from "antd";
import { FormModalProps } from "../../interfaces/FormModalProp";

const FormModal: React.FC<FormModalProps> = ({ record, fields, open, onClose, onSave }) => {
	const [form] = Form.useForm();
	const isEditing = !!record; // Xác định xem đang ở chế độ sửa hay thêm mới

	// Set giá trị ban đầu cho form khi modal mở
	useEffect(() => {
		if (record) {
			form.setFieldsValue(record);
		} else {
			form.resetFields();
		}
	}, [record, form, open]);

	const handleOk = () => {
		form.validateFields().then((values) => {
			onSave(values); // Gọi hàm onSave với dữ liệu từ form
			onClose(); // Đóng modal sau khi lưu
		});
	};

	return (
		<Modal
			title={isEditing ? "Sửa thông tin" : "Thêm mới bản ghi"}
			open={open}
			onCancel={onClose}
			onOk={handleOk}
			cancelText="Huỷ"
			okText="Lưu"
		>
			<Form form={form} layout="vertical">
				{fields
					.filter((field) => field.key !== "option")
					.map((field) => (
						<Form.Item
							key={field.key}
							name={field.key}
							label={field.title}
							rules={[{ required: true, message: `${field.title} không được để trống!` }]}
						>
							<Input />
						</Form.Item>
					))}
			</Form>
		</Modal>
	);
};

export default FormModal;
