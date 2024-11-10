import AddCardIcon from "@mui/icons-material/AddCard";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BadgeIcon from "@mui/icons-material/Badge";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import MoneyIcon from "@mui/icons-material/Money";
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
  const [shopOpen, setShopOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [dealerOpen, setDealerOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickCustomer = () => {
    setCustomerOpen(!customerOpen);
  };

  const handleClickShop = () => {
    setShopOpen(!shopOpen);
  };

  const handleClickEmployee = () => {
    setEmployeeOpen(!employeeOpen);
  };

  const handleClickDealer = () => {
    setDealerOpen(!dealerOpen);
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

      {/* ---------------------------------shop management menu---------------------------------------- */}
      <List sx={_SideBar.list}>
        <ListItemButton onClick={handleClickShop}>
          <ListItemIcon sx={_SideBar.listItemIcon}>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={_SideBar.listItemTextTypo}
            primary="Shop Management"
          />
          {shopOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={shopOpen} timeout="auto" unmountOnExit>
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

      {/* ---------------------------------employee management menu---------------------------------------- */}
      <List sx={_SideBar.list}>
        <ListItemButton onClick={handleClickEmployee}>
          <ListItemIcon sx={_SideBar.listItemIcon}>
            <BadgeIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={_SideBar.listItemTextTypo}
            primary="Employee Management"
          />
          {employeeOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={employeeOpen} timeout="auto" unmountOnExit>
          {/* ///////////manage employee */}
          <List component="div" disablePadding>
            <Link style={_Router.link} to="/employees">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon sx={_SideBar.listItemIcon}>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={_SideBar.listItemTextTypo}
                  primary="Manage Employees"
                />
              </ListItemButton>
            </Link>
          </List>
          {/* ///////////manage salary */}
          <List component="div" disablePadding>
            <Link style={_Router.link} to="/employees">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon sx={_SideBar.listItemIcon}>
                  <MoneyIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={_SideBar.listItemTextTypo}
                  primary="Manage salary"
                />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
      </List>

      {/* ---------------------------------profit management menu---------------------------------------- */}
      <List sx={_SideBar.list}>
        <Link style={_Router.link} to="/profits">
          <ListItemButton onClick={handleClick}>
            <ListItemIcon sx={_SideBar.listItemIcon}>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={_SideBar.listItemTextTypo}
              primary="Profit Management"
            />
          </ListItemButton>
        </Link>
      </List>

      {/* ---------------------------------expense management menu---------------------------------------- */}
      <List sx={_SideBar.list}>
        <Link style={_Router.link} to="/expenses">
          <ListItemButton onClick={handleClick}>
            <ListItemIcon sx={_SideBar.listItemIcon}>
              <PriceChangeIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={_SideBar.listItemTextTypo}
              primary="Expense Management"
            />
          </ListItemButton>
        </Link>
      </List>

      {/* ---------------------------------dealer management menu---------------------------------------- */}
      <List sx={_SideBar.list}>
        <ListItemButton onClick={handleClickDealer}>
          <ListItemIcon sx={_SideBar.listItemIcon}>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={_SideBar.listItemTextTypo}
            primary="Dealer Management"
          />
          {dealerOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={dealerOpen} timeout="auto" unmountOnExit>
          {/* ///////////manage cash payment */}
          <List component="div" disablePadding>
            <Link style={_Router.link} to="/cashpayments">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon sx={_SideBar.listItemIcon}>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={_SideBar.listItemTextTypo}
                  primary="Manage Cash Payments"
                />
              </ListItemButton>
            </Link>
          </List>

          {/* ///////////manage cheque payment */}
          <List component="div" disablePadding>
            <Link style={_Router.link} to="/cheqpayments">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon sx={_SideBar.listItemIcon}>
                  <AddCardIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={_SideBar.listItemTextTypo}
                  primary="Manage Cheque Payments"
                />
              </ListItemButton>
            </Link>
          </List>

          {/* ///////////manage credit payment */}
          <List component="div" disablePadding>
            <Link style={_Router.link} to="/credpayments">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon sx={_SideBar.listItemIcon}>
                  <AddCardIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={_SideBar.listItemTextTypo}
                  primary="Manage Credit Payments"
                />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
      </List>

      <Divider sx={{ borderColor: Theme.palette.myTheme.common.white }} />

      {/* ---------------------------------customer management menu---------------------------------------- */}
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
          {/* ///////////manage customer */}
          <List component="div" disablePadding>
            <Link style={_Router.link} to="/customers">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon sx={_SideBar.listItemIcon}>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={_SideBar.listItemTextTypo}
                  primary="Manage Customers"
                />
              </ListItemButton>
            </Link>
          </List>

          {/* ///////////manage credit */}
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
