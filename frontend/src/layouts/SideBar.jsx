import AddCardIcon from "@mui/icons-material/AddCard";
import BadgeIcon from "@mui/icons-material/Badge";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import StoreIcon from "@mui/icons-material/Store";
import StorefrontIcon from "@mui/icons-material/Storefront";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { _Router } from "../styles/GlobalStyles";
import { _SideBar } from "../styles/SideBarStyles";
import Theme from "../styles/Theme.json";

const SideBar = ({
  drawerWidth,
  mobileOpen,
  handleDrawerToggle,
  customTheme,
}) => {
  const [open, setOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickCustomer = () => {
    setCustomerOpen(!customerOpen);
  };

  const drawer = (
    <>
      {/* <Toolbar>
        <Typography variant="h6" noWrap>
          My App
        </Typography>
      </Toolbar> */}

      <List sx={_SideBar.list}>
        <ListItem button>
          <ListItemIcon sx={_SideBar.listItemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={_SideBar.listItemTextTypo}
            primary="Dashboard"
          />
        </ListItem>
      </List>

      <List sx={_SideBar.list}>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon sx={_SideBar.listItemIcon}>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={_SideBar.listItemTextTypo}
            primary="Shop Management"
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link style={_Router.link} to="/shops">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon sx={_SideBar.listItemIcon}>
                  <StorefrontIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={_SideBar.listItemTextTypo}
                  primary="Manage Shops"
                />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
      </List>

      <List sx={_SideBar.list}>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon sx={_SideBar.listItemIcon}>
            <BadgeIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={_SideBar.listItemTextTypo}
            primary="Employee Management"
          />
        </ListItemButton>
      </List>

      <List sx={_SideBar.list}>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon sx={_SideBar.listItemIcon}>
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={_SideBar.listItemTextTypo}
            primary="Profit Management"
          />
        </ListItemButton>
      </List>

      <List sx={_SideBar.list}>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon sx={_SideBar.listItemIcon}>
            <PriceChangeIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={_SideBar.listItemTextTypo}
            primary="Expense Management"
          />
        </ListItemButton>
      </List>

      <Divider sx={{ borderColor: Theme.palette.myTheme.common.white }} />

      <List sx={_SideBar.list}>
        <ListItemButton onClick={handleClickCustomer}>
          <ListItemIcon sx={_SideBar.listItemIcon}>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={_SideBar.listItemTextTypo}
            primary="Customer Management"
          />
          {customerOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={customerOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={_SideBar.listItemIcon}>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={_SideBar.listItemTextTypo}
                primary="Manage Customers"
              />
            </ListItemButton>
          </List>

          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={_SideBar.listItemIcon}>
                <AddCardIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={_SideBar.listItemTextTypo}
                primary="Manage Credits"
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </>
  );
  return (
    <>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
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
          {drawer}
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
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default SideBar;
