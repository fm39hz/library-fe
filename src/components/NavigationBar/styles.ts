import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => ({
  navbar: {
    backgroundColor: token.colorPrimary,
    display: "flex",
    justifyContent: "space-around",
  },
}));

export default useStyles;
