import AddCardIcon from "@mui/icons-material/AddCard";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import StoreIcon from "@mui/icons-material/Store";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Divider, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import Colors from "../constants/colors";
import AuthContext from "../context/AuthContext";
import CollapseMenuItems from "./CollapseMenuItems";
import MenuItems from "./MenuItems";

const DrawerItems = ({ setMobileOpen }) => {
  const { currentShopName } = useContext(AuthContext);
  const currentShopName1 =
    currentShopName || localStorage.getItem("currentShopName");
  return (
    <>
      {/* SideBar top section start */}
      <Grid
        container
        flexDirection="column"
        alignItems="center"
        marginBottom="30px"
      >
        <Typography
          sx={{ color: Colors.light500 }}
          variant="h6"
          noWrap
          component="div"
        >
          SHOP MASTER -{" "}
          <span style={{ fontSize: "15px" }}>{import.meta.env.VITE_ENV}</span>
        </Typography>

        <Typography sx={{ color: Colors.light500 }}>
          {" "}
          {currentShopName1.replace(/"/g, "")}
        </Typography>
      </Grid>
      <Divider sx={{ borderColor: Colors.light700 }} />
      {/* SideBar top section end */}

      <MenuItems
        isSubmenu={false}
        menuItemText="Dashboard"
        menuItemIcon={<HomeIcon fontSize="small" />}
        linkTo="/"
        setMobileOpen={setMobileOpen}
      />

      {/* ---------------------------------shop management menu---------------------------------------- */}
      <CollapseMenuItems
        collMenuText="Shop Management"
        collMenuIcon={<StoreIcon fontSize="small" />}
      >
        <MenuItems
          isSubmenu={true}
          menuItemText="Manage Shops"
          menuItemIcon={<StorefrontIcon fontSize="small" />}
          linkTo="/shops"
          setMobileOpen={setMobileOpen}
        />
      </CollapseMenuItems>

      {/* ---------------------------------employee management menu---------------------------------------- */}
      {/* <CollapseMenuItems
        collMenuText="Employee Management"
        collMenuIcon={<BadgeIcon fontSize="small" />}
      > */}
      {/* ///////////manage employee */}
      {/* <MenuItems
          isSubmenu={true}
          menuItemText="Manage Employees"
          menuItemIcon={<AssignmentIndIcon fontSize="small" />}
          linkTo="/employees"
          setMobileOpen={setMobileOpen}
        />
      </CollapseMenuItems> */}

      {/* ---------------------------------profit management menu---------------------------------------- */}
      <MenuItems
        isSubmenu={false}
        menuItemText="Profit Management"
        menuItemIcon={<MonetizationOnIcon fontSize="small" />}
        linkTo="/profits"
        setMobileOpen={setMobileOpen}
      />

      {/* ---------------------------------expense management menu---------------------------------------- */}
      <MenuItems
        isSubmenu={false}
        menuItemText="Expense Management"
        menuItemIcon={<PriceChangeIcon fontSize="small" />}
        linkTo="/expenses"
        setMobileOpen={setMobileOpen}
      />

      {/* ---------------------------------dealer management menu---------------------------------------- */}
      <CollapseMenuItems
        collMenuText="Dealer Management"
        collMenuIcon={<ManageAccountsIcon fontSize="small" />}
      >
        {/* ///////////manage Dealer */}
        <MenuItems
          isSubmenu={true}
          menuItemText="Manage Dealers"
          menuItemIcon={<GroupIcon fontSize="small" />}
          linkTo="/dealers"
          setMobileOpen={setMobileOpen}
        />

        {/* ///////////manage cash payment */}
        <MenuItems
          isSubmenu={true}
          menuItemText="Manage Cash Payments"
          menuItemIcon={<GroupIcon fontSize="small" />}
          linkTo="/cashpayments"
          setMobileOpen={setMobileOpen}
        />

        {/* ///////////manage cheque payment */}
        <MenuItems
          isSubmenu={true}
          menuItemText="Manage Cheque Payments"
          menuItemIcon={<AddCardIcon fontSize="small" />}
          linkTo="/cheqpayments"
          setMobileOpen={setMobileOpen}
        />

        {/* ///////////manage credit payment */}
        <MenuItems
          isSubmenu={true}
          menuItemText="Manage Credit Payments"
          menuItemIcon={<AddCardIcon fontSize="small" />}
          linkTo="/credpayments"
          setMobileOpen={setMobileOpen}
        />
      </CollapseMenuItems>

      {/* ---------------------------------customer management menu---------------------------------------- */}
      <CollapseMenuItems
        collMenuText="Customer Management"
        collMenuIcon={<ManageAccountsIcon fontSize="small" />}
      >
        {/* ///////////manage customer */}
        <MenuItems
          isSubmenu={true}
          menuItemText="Manage Customers"
          menuItemIcon={<GroupIcon fontSize="small" />}
          linkTo="/customers"
          setMobileOpen={setMobileOpen}
        />

        {/* ///////////manage credit */}
        {/* <MenuItems
          isSubmenu={true}
          menuItemText="Manage Loans"
          menuItemIcon={<AddCardIcon fontSize="small" />}
          linkTo="/loans"
        /> */}
      </CollapseMenuItems>

      {/* ---------------------------------Loan management menu---------------------------------------- */}
      <CollapseMenuItems
        collMenuText="Loan Management"
        collMenuIcon={<ManageAccountsIcon fontSize="small" />}
      >
        {/* ///////////manage credit */}
        <MenuItems
          isSubmenu={true}
          menuItemText="Manage Loans"
          menuItemIcon={<AddCardIcon fontSize="small" />}
          linkTo="/loans"
          setMobileOpen={setMobileOpen}
        />

        {/* ///////////manage loan settlements */}
        <MenuItems
          isSubmenu={true}
          menuItemText="Manage Loan Settlements"
          menuItemIcon={<AddCardIcon fontSize="small" />}
          linkTo="/loansettlements"
          setMobileOpen={setMobileOpen}
        />
      </CollapseMenuItems>
    </>
  );
};

export default DrawerItems;
