import { Button, Divider, Flex } from "antd";
import Search from "antd/es/input/Search";
import { CardHeaderProps } from "./type";
import useStyles from "./style";

export const CardHeader = (props?: CardHeaderProps) => {
  const { styles } = useStyles();
  return (
    <Flex>
      <Search
        placeholder="Tìm kiếm"
        className={styles.searchBar}
        onSubmit={props?.onSearch}
      />
      <Divider type="vertical" />
      <Button onClick={props?.addNew}>Thêm mới</Button>
    </Flex>
  );
};

export default CardHeader;
