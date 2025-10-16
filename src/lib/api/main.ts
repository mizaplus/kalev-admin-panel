import axios from "axios";

const api = axios.create({
  baseURL: "https://frmw9v5tz3.execute-api.eu-west-2.amazonaws.com/Prod",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
