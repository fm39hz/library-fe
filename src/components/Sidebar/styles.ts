import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => ({
  sider: {
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000,
  },
  logo: {
    height: "32px",
    margin: "16px",
    color: token.colorBgBase,
  },
}));

export default useStyles;
