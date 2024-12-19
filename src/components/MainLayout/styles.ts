import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => ({
  mainLayout: {
    minHeight: "100vh",
  },
  contentLayout: {
    marginLeft: 200,
  },
  contentContainer: {
    margin: "16px",
  },
  content: {
    padding: 24,
    background: token.colorBgBase,
    minHeight: "100%",
  },
}));

export default useStyles;
