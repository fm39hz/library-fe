import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => ({
  header: {
    background: token.colorBgBase,
    padding: "10px 20px",
  },
  title: {
    margin: 0,
  },
}));

export default useStyles;
