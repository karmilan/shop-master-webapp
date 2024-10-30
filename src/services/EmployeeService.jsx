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
    console.log(employeeData);
    const response = await api.post("/addemployee", employeeData);
    return response.data;
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
