import React, { useEffect } from "react";
import { Input, Modal, Form, Select } from "antd";
import { FormModalProps } from "../../interfaces/FormModalProp";
import { model } from "../../interfaces/model";

const FormModal: React.FC<FormModalProps<model>> = (
	props: FormModalProps<model>,
) => {
	const [form] = Form.useForm();
	const isEditing = !!props.record; // Xác định xem đang ở chế độ sửa hay thêm mới

	// Set giá trị ban đầu cho form khi modal mở
	useEffect(() => {
		if (props.record) {
			form.setFieldsValue(props.record);
		} else {
			form.resetFields();
		}
	}, [props.record, form]);

	const handleOk = () => {
		form.validateFields().then((values) => {
			props.onSave(values, isEditing); // Gọi hàm onSave với dữ liệu từ form
			props.onClose(); // Đóng modal sau khi lưu
		});
	};

	return (
		<Modal
			title={isEditing ? "Sửa thông tin" : "Thêm mới bản ghi"}
			open={props.open}
			onCancel={props.onClose}
			onOk={handleOk}
			cancelText="Huỷ"
			okText="Lưu"
		>
			<Form form={form} layout="vertical">
				{props.fields
					.filter((field) => field.key !== "option")
					.map((field) => (
						<Form.Item
							key={field.key}
							name={field.key}
							hidden={field.hidden ?? false}
							label={field.label}
							rules={[
								{
									required: field.required ?? true,
									message: `${field.label} không được để trống!`,
								},
							]}
						>
							{field.option ? (
								<Select>
									{field.option.map((item) => (
										<Select.Option key={item.id} value={item.id}>
											{item.name}
										</Select.Option>
									))}
								</Select>
							) : (
								<Input />
							)}
						</Form.Item>
					))}
			</Form>
		</Modal>
	);
};

export default FormModal;
