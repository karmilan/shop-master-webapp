import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { _SideBar } from "../styles/SideBarStyles";

const CollapseMenuItems = ({ children, collMenuText, collMenuIcon }) => {
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List sx={_SideBar.list}>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon sx={_SideBar.listItemIcon}>{collMenuIcon}</ListItemIcon>
        <ListItemText
          primaryTypographyProps={_SideBar.listItemTextTypo}
          primary={collMenuText}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </List>
  );
};

export default CollapseMenuItems;
