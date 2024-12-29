import AddCardIcon from "@mui/icons-material/AddCard";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BadgeIcon from "@mui/icons-material/Badge";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import StoreIcon from "@mui/icons-material/Store";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CollapseMenuItems from "./CollapseMenuItems";
import MenuItems from "./MenuItems";

const DrawerItems = () => {
  return (
    <>
      <MenuItems
        isSubmenu={false}
        menuItemText="Dashboard"
        menuItemIcon={<HomeIcon fontSize="small" />}
        linkTo="/"
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
        />
      </CollapseMenuItems>

      {/* ---------------------------------employee management menu---------------------------------------- */}
      <CollapseMenuItems
        collMenuText="Employee Management"
        collMenuIcon={<BadgeIcon fontSize="small" />}
      >
        {/* ///////////manage employee */}
        <MenuItems
          isSubmenu={true}
          menuItemText="Manage Employees"
          menuItemIcon={<AssignmentIndIcon fontSize="small" />}
          linkTo="/employees"
        />
      </CollapseMenuItems>

      {/* ---------------------------------profit management menu---------------------------------------- */}
      <MenuItems
        isSubmenu={false}
        menuItemText="Profit Management"
        menuItemIcon={<MonetizationOnIcon fontSize="small" />}
        linkTo="/profits"
      />

      {/* ---------------------------------expense management menu---------------------------------------- */}
      <MenuItems
        isSubmenu={false}
        menuItemText="Expense Management"
        menuItemIcon={<PriceChangeIcon fontSize="small" />}
        linkTo="/expenses"
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
        />

        {/* ///////////manage cash payment */}
        <MenuItems
          isSubmenu={true}
          menuItemText="Manage Cash Payments"
          menuItemIcon={<GroupIcon fontSize="small" />}
          linkTo="/cashpayments"
        />

        {/* ///////////manage cheque payment */}
        <MenuItems
          isSubmenu={true}
          menuItemText="Manage Cheque Payments"
          menuItemIcon={<AddCardIcon fontSize="small" />}
          linkTo="/cheqpayments"
        />

        {/* ///////////manage credit payment */}
        <MenuItems
          isSubmenu={true}
          menuItemText="Manage Credit Payments"
          menuItemIcon={<AddCardIcon fontSize="small" />}
          linkTo="/credpayments"
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
        />

        {/* ///////////manage loan settlements */}
        <MenuItems
          isSubmenu={true}
          menuItemText="Manage Loan Settlements"
          menuItemIcon={<AddCardIcon fontSize="small" />}
          linkTo="/loansettlements"
        />
      </CollapseMenuItems>
    </>
  );
};

export default DrawerItems;
