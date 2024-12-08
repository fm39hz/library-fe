import { TableOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Input, Modal, Table } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";

export const AllBooks = () => {
    const [isLoading, setLoading] = useState(false)

    const modalText = {
        'title': 'Thêm đầu sách mới',
        'content': <div style={{  }}>
            <Input placeholder="Tên đầu sách" style={{ width: 200 }} />
            <Input placeholder="Tác giả" style={{ width: 200 }} />
            <Input placeholder="Thể loại" style={{ width: 200 }} />
            <Input placeholder="Số lượng" style={{ width: 200 }} />
        </div>
    }
    const extra : JSX.Element = <>
            <Search placeholder="tìm kiếm" style={{ width: 200 }} />
            <Divider type="vertical" />
            <Button 
                onClick={() => Modal.info({title: modalText.title, content: modalText.content})}
            >
                Thêm đầu sách mới
            </Button>
        </>
    
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
                    <Button type="primary" icon={<TableOutlined />} onClick={() => Modal.info({title: 'Thông tin đầu sách', content: 'thong tin'})}>Xem</Button>
                    <Divider type="vertical" />
                    <Button type="primary" icon={<TableOutlined />} onClick={() => Modal.info({title: modalText.title, content: modalText.content})}>Sửa</Button>
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
        <Card title="Danh sách các đầu sách" bordered={false} style={{ width: '100%' }} extra={extra}>
            <Table columns={collumns} loading={isLoading} dataSource={dataSrc} />
        </Card>
    </>

};
