import axios from "axios";

axios.defaults.baseURL = "http://localhost:5001";

export const fetchPackages = () => axios.get("/packages");
export const fetchPackageDetails = (id) => axios.get(`/packages/${id}`);
export const bookPackage = (data) => axios.post("/bookings/bookpackage", data);
export const getBookings = () => axios.get("/bookings/getbookings");
export const addPackage = (data) => axios.post("/admin/packages", data);
export const updatePackage = (id, data) =>
  axios.put(`/admin/packages/${id}`, data);
export const deletePackage = (id) => axios.delete(`/admin/packages/${id}`);
