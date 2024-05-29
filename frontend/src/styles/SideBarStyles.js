import { _Colors } from "./GlobalStyles";
import Theme from "./Theme.json";

// =============================styles for navbar=============================
export const _SideBar = {
  wrapperBox: {
    backgroundColor: _Colors.navBar.backgroundColor,

    pt: '100px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
  },

  list: {
    color: Theme.palette.myTheme.common.white
  },

  listItemIcon: {
    color: Theme.palette.myTheme.common.white,
    minWidth: '40px',
  },

  listItemTextTypo: {
    fontSize: '14px'
  }
};


