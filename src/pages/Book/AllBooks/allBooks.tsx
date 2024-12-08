import { TableOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Table } from "antd";

export const AllBooks = () => {
    const collumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Tiêu dề",
            dataIndex: "title",
            key: "title"
        },
        {
            title: "Tác giả",
            dataIndex: "author",
            key: "author"
        },
        {
            title: "Thể loại",
            dataIndex: "category",
            key: "category"
        },        
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity"
        },
        {
            title: "Tuỳ chọn",
            dataIndex: "option",
            key: "option",
            render: () => {
                return <>
                    <Button type="primary" icon={<TableOutlined />}>Xem</Button> 
                    <Divider type="vertical" /> 
                    <Button type="primary" icon={<TableOutlined />}>Sửa</Button>
                </>;
            }
        }
    ]
    const dataSrc = [
        {
            id: 1,
            title: "Book 1",
            author: "Author 1",
            category: "Category 1",
            quantity: 10,
            option: "Option 1"
        },
        {
            id: 2,
            title: "Book 2",
            author: "Author 2",
            category: "Category 2",
            quantity: 20,
            option: "Option 2"
        },
        {
            id: 3,
            title: "Book 3",
            author: "Author 3",
            category: "Category 3",
            quantity: 30,
            option: "Option 3"
        }
    ]
    return <>
        <Card title="Danh sách các đầu sách" bordered={false} style={{ width: '100%' }} extra={<Button>Thêm đầu sách mới</Button>}>
            <Table columns={collumns} dataSource={dataSrc} />
        </Card>
    </>

};
  