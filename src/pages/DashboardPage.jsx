import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PageHeader from "../templates/PageHeader/PageHeader";
import dashboardService from "../services/DashboardService";
import shopService from "../services/ShopService";
import {
  TrendingUp,
  TrendingDown,
  AccountBalanceWallet,
  People,
  Store,
  Badge,
} from "@mui/icons-material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: "100%", boxShadow: 3 }}>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography color="textSecondary" variant="subtitle2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {value}
          </Typography>
        </Box>
        <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>{icon}</Avatar>
      </Box>
    </CardContent>
  </Card>
);

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [chartData, setChartData] = useState({ timeSeries: [], categories: [] });
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const shopsData = await shopService.getAllShops();
        setShops(shopsData);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };
    fetchShops();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const shopId = selectedShop === "all" ? "" : selectedShop;
        const [statsData, activityData, chartsData] = await Promise.all([
          dashboardService.getStats(shopId),
          dashboardService.getRecentActivity(shopId),
          dashboardService.getChartData(shopId),
        ]);
        setStats(statsData);
        setActivity(activityData);
        setChartData(chartsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedShop]);

  const handleShopChange = (event) => {
    setSelectedShop(event.target.value);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <PageHeader
          header="Store Dashboard"
          subHeader="Overview of your shop's performance"
        />
        <FormControl sx={{ minWidth: 200, mb: 2 }}>
          <InputLabel id="shop-select-label">Select Shop</InputLabel>
          <Select
            labelId="shop-select-label"
            id="shop-select"
            value={selectedShop}
            label="Select Shop"
            onChange={handleShopChange}
          >
            <MenuItem value="all">All Shops</MenuItem>
            {shops.map((shop) => (
              <MenuItem key={shop._id} value={shop._id}>
                {shop.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Total Sales"
              value={`LKR ${stats?.totalSales?.toLocaleString() || 0}`}
              icon={<TrendingUp />}
              color="#4caf50"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Total Expenses"
              value={`LKR ${stats?.totalExpenses?.toLocaleString() || 0}`}
              icon={<TrendingDown />}
              color="#f44336"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Outstanding Credits"
              value={`LKR ${stats?.totalCredits?.toLocaleString() || 0}`}
              icon={<AccountBalanceWallet />}
              color="#ff9800"
            />
          </Grid>

          {/* Charts Section */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, boxShadow: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Sales vs Expenses (Last 7 Days)
              </Typography>
              <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={chartData.timeSeries}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f44336" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f44336" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#4caf50"
                    fillOpacity={1}
                    fill="url(#colorSales)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#f44336"
                    fillOpacity={1}
                    fill="url(#colorExpenses)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, boxShadow: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Expense Categories {selectedShop === "all" ? "(All Shops)" : ""}
              </Typography>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={chartData.categories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <StatCard
              title="Total Customers"
              value={stats?.customerCount || 0}
              icon={<People />}
              color="#2196f3"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatCard
              title="Total Dealers"
              value={stats?.dealerCount || 0}
              icon={<Store />}
              color="#9c27b0"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatCard
              title="Total Employees"
              value={stats?.employeeCount || 0}
              icon={<Badge />}
              color="#795548"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 4, mb: 2 }} fontWeight="bold">
              Recent Activity {selectedShop === "all" ? "(All Shops)" : ""}
            </Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
              <Table>
                <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Dealer</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activity.length > 0 ? (
                    activity.map((item, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.dealer?.name || "N/A"}</TableCell>
                        <TableCell>LKR {item.amount?.toLocaleString()}</TableCell>
                        <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No recent activity found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DashboardPage;
