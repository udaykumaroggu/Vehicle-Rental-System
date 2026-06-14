import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getVehicles = () => axios.get(`${BASE_URL}/vehicles`);

export const bookVehicle = (data) =>
  axios.post(`${BASE_URL}/book`, data);