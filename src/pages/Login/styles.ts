import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => ({
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: token.colorBgLayout,
  },
  styledCard: {
    width: 300,
    boxShadow: `0 4px 8px ${token.colorSuccess}`,
  },
  styledForm: {
    "& .ant-form-item-explain-error": {
      fontSize: 12,
    },
  },
}));

export default useStyles;
