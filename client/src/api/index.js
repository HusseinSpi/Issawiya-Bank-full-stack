import axios from "axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_BASE_URL;

const API = axios.create({ baseURL });

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error("Network error: Please check your internet connection.");
      console.error("Network error: Please check your internet connection.");
      return Promise.reject(
        new Error("Network error: Please check your internet connection.")
      );
    }

    const { status, data, statusText } = error.response;

    let message = data?.error || statusText || "An error occurred";

    toast.error(`${status} - ${message}`);
    console.error(`${status} - ${message}`);

    return Promise.reject(error);
  }
);

export const userAPI = {
  getAllUsers: () => API.get("/getUsers"),

  getUser: (id) => API.get(`/getUser/${id}`),

  addUser: (userData) => API.post("/addUser", userData),

  updateUser: (id, userData) => API.patch(`/updateUser/${id}`, userData),

  deleteUser: (id) => API.delete(`/deleteUser/${id}`),
};
