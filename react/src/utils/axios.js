import axios, { AxiosInstance } from "axios";
import * as tunnel from "tunnel";
const agent = tunnel.httpsOverHttp({
  proxy: {
    host: "http://localhost/",
    port: 5000,
  },
});

const axiosClient = axios.create({
  baseURL: "https://bastion-backend.onrender.com",
});

export default axiosClient;
