import api from "./Api";

const employeeService = {
  getAllEmployees: async () => {
    const response = await api.get("/employees");
    return response.data;
  },

  getEmployeeById: async (id) => {
    const response = await api.get(`/employee/${id}`);
    return response.data;
  },

  addEmployee: async (employeeData) => {
    const currentShopId = localStorage.getItem("currentShopId");

    // Assign selected shop
    const employeeWithShop = {
      ...employeeData,
      shop: currentShopId.replace(/"/g, ""),
    };

    const response = await api.post("/addemployee", employeeWithShop);
    return response.data;
  },

  getEmployeesByShop: async (id) => {
    const currentShopId = localStorage.getItem("currentShopId");
    const response = await api.get(
      `/employeesbyshop/${currentShopId.replace(/"/g, "")}`
    );
    return response.data.employee;
  },

  updateEmployee: async (id, employeeData) => {
    const response = await api.put(`/updateemployee/${id}`, employeeData);
    console.log("response>>>", response);
    return response.data;
  },

  deleteEmployee: async (id) => {
    const response = await api.delete(`/deleteemployee/${id}`);
    return response.data;
  },
};

export default employeeService;
