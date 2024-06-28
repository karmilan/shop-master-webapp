import { _Colors } from "./GlobalStyles";
import Theme from "./Theme.json";

// =============================styles for navbar=============================
export const _SideBar = {
  wrapperBox: {
    backgroundColor: _Colors.sideBar.backgroundColor,
    borderRight: '1px solid #304050',
    pt: '100px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    // height: 'auto'
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


