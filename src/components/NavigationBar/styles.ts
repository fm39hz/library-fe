import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => ({
  navbar: {
    backgroundColor: token.colorBgLayout,
    display: "flex",
    justifyContent: "space-around",
  },
}));

export default useStyles;
