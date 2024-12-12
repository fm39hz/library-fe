import { useState, useEffect } from "react";
import bookApi from "../../services/api/bookApi";
import useStyles from "./styles";
import { Book } from "../../interfaces/book";
import BookCard from "../../components/BookCard";
import { Pagination } from "antd";

const BookGallery = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6); // Adjust this based on your layout
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

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div className={styles.container}>
        {currentBooks.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={books.length}
        onChange={handlePageChange}
        style={{ textAlign: "center", marginTop: "20px" }}
      />
    </div>
  );
};

export default BookGallery;
