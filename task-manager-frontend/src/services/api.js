import axios from "axios";

const API_URL = "http://localhost:5000/api/task";

const userRole = "Admin";

export const getTasks = () =>
  axios.get(API_URL, { headers: { Role: userRole } });

export const getTaskById = (id) =>
  axios.get(`${API_URL}/${id}`, { headers: { Role: userRole } });

export const createTask = (task) =>
  axios.post(API_URL, task, { headers: { Role: userRole } });

export const updateTask = (id, task) =>
  axios.put(`${API_URL}/${id}`, task, { headers: { Role: userRole } });

export const deleteTask = (id) =>
  axios.delete(`${API_URL}/${id}`, { headers: { Role: userRole } });
