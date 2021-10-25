import axios, { AxiosInstance } from 'axios';
import * as tunnel from 'tunnel';

axios.defaults.withCredentials = true

const agent = tunnel.httpsOverHttp({
    proxy: {
        host: 'http://localhost/',
        port: 5000,
    },
});

const axiosClient = axios.create({
    baseURL: 'https://mtg-card-store.herokuapp.com/'
});

export default axiosClient