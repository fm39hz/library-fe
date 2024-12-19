import { createStyles } from "antd-style";

const useStyles = createStyles(() => ({
  sider: {
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000,
  },
  logo: {
    marginLeft: "16px",
    marginTop: "4px",
  },
}));

export default useStyles;
