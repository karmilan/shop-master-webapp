import { Box, Drawer } from "@mui/material";
import { _SideBar } from "../styles/SideBarStyles";
import DrawerItems from "./DrawerItems";

const SideBar = ({
  drawerWidth,
  mobileOpen,
  handleDrawerToggle,
  customTheme,
  setMobileOpen,
}) => {
  return (
    <>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          zIndex: "10000",
          ..._SideBar.wrapperBox,
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              ..._SideBar.wrapperBox,
            },
          }}
        >
          <DrawerItems setMobileOpen={setMobileOpen} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              ..._SideBar.wrapperBox,
            },
          }}
          open
        >
          <DrawerItems />
        </Drawer>
      </Box>
    </>
  );
};

export default SideBar;
