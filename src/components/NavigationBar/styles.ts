import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => ({
  navbar: {
    backgroundColor: token.colorPrimary,
    "& .ant-menu-item": {
      color: token.colorTextLightSolid,
      "&:hover": {
        color: token.colorTextLightSolid,
        backgroundColor: token.colorPrimaryHover,
      },
    },
    "& .ant-menu-item-selected": {
      backgroundColor: token.colorPrimaryActive,
      "&::after": {
        borderBottomColor: token.colorTextLightSolid,
      },
    },
  },
}));

export default useStyles;
