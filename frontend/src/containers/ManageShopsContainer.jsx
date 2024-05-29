import { CardContent } from "@mui/material";
// import ShopsDataGrid from "../components/common/GetDataGrid/GetDataGrid";
import AddShopAccordion from "../components/manageshops/AddShopAccordion";
import ShopsDataGrid from "../components/manageshops/ShopsDataGrid";
import { StyledCard } from "../templates/Card/StyledCard";

const ManageShopsContainer = () => {
  return (
    <>
      <StyledCard>
        <CardContent>
          {/* <ShopsTbl /> */}
          <AddShopAccordion />
          <ShopsDataGrid />
        </CardContent>
      </StyledCard>
    </>
  );
};

export default ManageShopsContainer;
