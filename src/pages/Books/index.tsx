import { TableOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import Typography from "antd/es/typography/Typography";
import { Book } from "../../interfaces/book";
import authorApi from "../../services/api/authorApi";
import bookApi from "../../services/api/bookApi";
import CardExtra from "../../components/CardExtra";
import FormModal from "../../components/FormModal/FormModal";
import { FormModalFields, FormModalProps } from "../../interfaces/FormModalProp";
import { model } from "../../interfaces/model";
import { Author } from "../../interfaces/author";

const AllBooks = async () => {
  const [isLoading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Book | null>();
  const [authors, setAuthors] = useState<Author[]>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [books, setBooks] = useState<Book[]>();

  const fetchAuthor = async (): Promise<Author[]>  => {
    const result = await authorApi.getAllAuthors();
    return result.data;
  }
  const fetchData = async () => {
    setLoading(true);
    const result = await bookApi.getAllBooks();
    const authors = await fetchAuthor();
    if (result.status === 200) {
      setBooks(result.data);
      
    }
    if (authors) {
      setAuthors(authors);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const showModal = (record?: Book) => {
    setSelectedRecord(record ? record : null);
    setIsModalVisible(true);
  }

  const handleSave = async (values?: any, isEditing?: boolean) => {
    console.log(isEditing);
    if (isEditing) {
      await bookApi.updateBook(values);
    } else {
      await bookApi.createBook(values);
    }
    console.log(values);
    setIsModalVisible(false);
    await fetchData();
  }
  const fields: FormModalFields<Author>[] = [
    {
      key: "id",
      label: "ID",
      hidden: true,
      required: false
    },
    {
      key: "title",
      label: "Tiêu đề",
    },
    {
      key: "inStock",
      label: "Số lượng",
    },
    {
      key: "description",
      label: "Mô tả",
    },
    {
      key: "authorId",
      label: "ID Tác giả",
      option: authors
    },
    {
      key: "image",
      label: "Hình ảnh",
    },
  ];
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "inStock",
      key: "inStock",
    },
    {
      title: "Tuỳ chọn",
      dataIndex: "option",
      key: "description",
      render: (_: unknown, record: Book) => {
        const showBookInfo = async () => {
          const authorResult = await authorApi.getAuthorById(record.authorId);
          const authorName = authorResult.data.name;

          Modal.info({
            title: "Thông tin đầu sách",
            content: (
              <div>
                <Typography>
                  <strong>Tiêu đề:</strong> {record.name}
                </Typography>
                <Typography>
                  <strong>Tác giả:</strong> {authorName}
                </Typography>
                <Typography>
                  <strong>Mô tả:</strong> {record.description}
                </Typography>
              </div>
            ),
          });
        };

        return (
          <>
            <Button
              type="primary"
              icon={<TableOutlined />}
              onClick={showBookInfo}
            >
              Xem
            </Button>
            <Divider type="vertical" />
            <Button
              type="primary"
              icon={<TableOutlined />}
              onClick={() =>
                showModal(record)
              }
            >
              Sửa
            </Button>
          </>
        );
      },
    },
  ];

  return (<>
    {isModalVisible && (
      <FormModal
        record={selectedRecord}
        fields={fields}
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSave}
      />
    )}
    <Card
      key="allBooks"
      title="Danh sách các đầu sách"
      bordered={false}
      style={{ width: "100%" }}
      extra={CardExtra(() => showModal())}
    >
      <Table columns={columns} loading={isLoading} dataSource={books} />
    </Card>
  </>
  );
};

export default AllBooks;
