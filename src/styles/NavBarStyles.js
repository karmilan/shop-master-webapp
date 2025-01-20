import Colors from "../constants/colors";

// =============================styles for navbar=============================
export const _NavBar = {
  appBar: {
    // backgroundColor: _Colors.navBar.backgroundColor,
    // zIndex: (theme) => theme.zIndex.drawer + 1,
    background: { xs: 'linear-gradient(to bottom, #0f5052, #0d3e3f)', sm: Colors.light500 },
    boxShadow: { xs: '0 3px 5px 1px gray', sm: 'unset' }
  },
};
