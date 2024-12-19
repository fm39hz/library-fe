import { useState, useEffect } from "react";
import bookApi from "../../services/api/bookApi";
import useStyles from "./styles";
import { Book } from "../../interfaces/book";
import BookCard from "../../components/BookCard";
import { Flex, Pagination, Spin } from "antd";

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const { styles } = useStyles();

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      const response = await bookApi.getAllBooks();
      if (response.status !== 200) {
        console.error("Failed to fetch books");
        return;
      }
      setBooks(response.data);
      setIsLoading(false);
    };
    fetchBooks();
  }, []);

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentBooks = books.slice(startIndex, endIndex);

  return (
    <Flex className={styles.container}>
      {isLoading ? (
        <Spin size="large" className={styles.container} />
      ) : (
        <Flex className={styles.container}>
          {currentBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={books.length}
            onChange={handlePageChange}
            style={{ textAlign: "center", marginTop: "20px" }}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default Home;
