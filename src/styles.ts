import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => ({
  app: {
    width: "100vw",
    minHeight: "100vh",
    textAlign: "center",
    backgroundColor: token.colorBgLayout,
    display: "flex",
    justifyContent: "space-around",
    margin: 0,
    padding: 10,
  },
  header: {
    backgroundColor: token.colorBgLayout,
  },
  content: {
    padding: "0 50px",
    marginTop: 64,
  },
}));

export default useStyles;
