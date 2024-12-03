import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { _Router } from "../styles/GlobalStyles";
import { _SideBar } from "../styles/SideBarStyles";

const MenuItems = ({ menuItemText, menuItemIcon, linkTo, isSubmenu }) => {
  return (
    <List sx={_SideBar.list} disablePadding={isSubmenu ? true : false}>
      <Link style={_Router.link} to={linkTo}>
        <ListItemButton sx={{ pl: isSubmenu ? 4 : 2 }}>
          <ListItemIcon sx={_SideBar.listItemIcon}>{menuItemIcon}</ListItemIcon>
          <ListItemText
            primaryTypographyProps={_SideBar.listItemTextTypo}
            primary={menuItemText}
          />
        </ListItemButton>
      </Link>
    </List>
  );
};

export default MenuItems;
