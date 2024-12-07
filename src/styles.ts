import { createStyles } from "antd-style";

const useStyles = createStyles(() => ({
  app: {
    width: "100%",
    margin: 0,
    padding: 10,
    textAlign: "center",
  },
  header: {
    width: "100%",
    padding: 0,
  },
  content: {
    padding: "0 50px",
    marginTop: 64,
  },
}));

export default useStyles;
