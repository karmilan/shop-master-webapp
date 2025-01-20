import Theme from "./Theme.json";

// =============================styles for navbar=============================
export const _SideBar = {
  wrapperBox: {
    // backgroundColor: _Colors.sideBar.backgroundColor,
    background: 'linear-gradient(to left, #0f5052, #0d3e3f)',
    borderRight: '1px solid #304050',
    pt: '70px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  },

  list: {
    color: Theme.palette.myTheme.common.white
  },

  listItemIcon: {
    color: Theme.palette.myTheme.common.white,
    minWidth: '40px',
  },

  listItemTextTypo: {
    fontSize: '12px'
  }
};


