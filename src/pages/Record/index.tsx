import { useEffect, useState } from "react";
import recordApi from "../../services/api/recordApi";
import { RecordResponseDto } from "../../interfaces/record";
import FormModal from "../../components/FormModal";
import CardHeader from "../../components/CardHeader";
import { Button, Card, Table } from "antd";
import { FormModalFields } from "../../components/FormModal/type";
import { title } from "process";
import { TableOutlined } from "@ant-design/icons";
import { Book } from "../../interfaces/book";
import { render } from "react-dom";
import bookApi from "../../services/api/bookApi";
import { SubscriptionResponseDto } from "../../interfaces/subscriptions";
import subscriptionApi from "../../services/api/subscriptionApi";

const Record: React.FC = () => {
  const [records, setRecords] = useState<RecordResponseDto[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RecordResponseDto | undefined>();
  const [books, setBooks] = useState<Book[]>();
  const [subs, setSubs] = useState<SubscriptionResponseDto[]>();

  const fetchData = async () => {
    const response = await recordApi.getAllRecords();
    const books = await bookApi.getAllBooks();
    const subs = await subscriptionApi.getAllSubscriptions();
    if (response.status === 200) {
      setBooks(books.data);
      setRecords(response.data);
      setSubs(subs.data);
    }
    setLoading(false);
  };

  const showModal = (record?: RecordResponseDto) => {
      setSelectedRecord(record ? record : undefined);
      setIsModalVisible(true);
    };

  const handleSave = async (values: RecordResponseDto, isEditing?: boolean) => {
    if (isEditing) {
      
    } else {
      
    }
    setIsModalVisible(false);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fields: FormModalFields<any>[] = [
    {
      key: "id",
      label: "ID",
      hidden: true,
      required: false,
    },
    {
      key: "book",
      label: "Sách",
      option: books,
    },
    {
      key: "subscription",
      label: "Sub",
      option: subs,
    },
    {
      key: "rentDate",
      label: "Ngày bắt đầu",
    },
    {
      key: "exceedDate",
      label: "Ngày trả",
    },
  ];

  const getDateTime = (datetime: Date): JSX.Element => {
    const date = new Date(datetime).toDateString();
    const time = new Date(datetime).toLocaleTimeString();
    return <>{date} {time}</>;
  }

  const collumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "rentDate",
      key: "rentDate",
      render: (_: any, record: any): JSX.Element => {
        return getDateTime(record.rentDate);
      }
    },
    {
      title: "Ngày trả",
      dataIndex: "exceedDate",
      key: "exceedDate",
      render: (_: any, record: any): JSX.Element => {
        return getDateTime(record.exceedDate);
      }
    },
    {
      title: "Sách",
      dataIndex: "book",
      key: "book",
      render: (_: any, record: any): JSX.Element => {
        return <>{record.book.name}</>;
      },
    },
    {
      title: "Sub",
      dataIndex: "subscription",
      key: "subscription",
      render: (_: any, record: any): JSX.Element => {
        return <>{record.subscription.name}</>;
      }
    },
    {
      title: "Tuỳ chọn",
      dataIndex: "option",
      key: "option",
      render: (_: any, record: RecordResponseDto): JSX.Element => {
        return (
          <>
          <Button
              type="primary"
              icon={<TableOutlined />}
              onClick={() => showModal(record)}
            >
              Sửa
            </Button>
          </>
        )
      }
    }
  ];
  return (
    <>
      {isModalVisible && (
        <FormModal<any, any>
          record={selectedRecord}
          fields={fields}
          open={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSave={handleSave}
        />
      )}
      <Card
        title="Danh sách mượn sách"
        bordered={false}
        style={{ width: "100%" }}
        extra={<CardHeader onSearch={() => { }} addNew={showModal} />}
      >
        <Table columns={collumns} loading={isLoading} dataSource={records} />
      </Card>
    </>
  );
};

export default Record;