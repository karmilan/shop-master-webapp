import { _Colors } from "./GlobalStyles";

// =============================styles for navbar=============================
export const _NavBar = {
  appBar: {
    // backgroundColor: Theme.palette.myTheme.common.dark,
    backgroundColor: _Colors.navBar.backgroundColor,
    // backgroundImage:
    //   "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
    zIndex: (theme) => theme.zIndex.drawer + 1,
  },
};
