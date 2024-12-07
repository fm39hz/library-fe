import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => ({
  navbar: {
    backgroundColor: token.colorPrimary,
    width: "100%", // Make the navbar take full width
    display: "flex", // Use flexbox
    justifyContent: "space-between", // Distribute items evenly
    "& .ant-menu": {
      backgroundColor: "transparent", // Ensure the menu background is transparent
      width: "100%", // Make the menu take full width
      display: "flex", // Use flexbox for menu items
      justifyContent: "space-between", // Distribute menu items evenly
    },
    "& .ant-menu-item": {
      color: token.colorTextLightSolid,
      flex: 1, // Allow menu items to grow and shrink equally
      textAlign: "center", // Center the text in each menu item
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
