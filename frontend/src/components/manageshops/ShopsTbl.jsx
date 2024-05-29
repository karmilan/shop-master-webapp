// import { Button } from "@material-ui/core"; // Import Button component
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import shopService from "../../services/ShopService";
import { StyledDataGrid } from "../../templates/DataGrid/StyledDataGrid";

const ShopsTbl = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const data = await shopService.getAllShops();
        setShops(data);
      } catch (err) {
        setError("Failed to fetch shops");
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const handleEdit = async (id, updatedData) => {
    try {
      await shopService.updateShop(id, updatedData);
      setShops(
        shops.map((shop) =>
          shop._id === id ? { ...shop, ...updatedData } : shop
        )
      );
    } catch (err) {
      setError("Failed to update shop");
    }
  };

  const handleDelete = async (id) => {
    try {
      await shopService.deleteShop(id);
      setShops(shops.filter((shop) => shop._id !== id));
    } catch (err) {
      setError("Failed to delete shop");
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90, editable: true },
    { field: "name", headerName: "Name", width: 150, editable: true },
    { field: "location", headerName: "Address", width: 200, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginRight: 16 }}
            onClick={() => handleEdit(params.row._id, { name: "Updated Name" })}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ height: 400, width: "100%" }}>
      <StyledDataGrid
        rows={shops}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default ShopsTbl;
