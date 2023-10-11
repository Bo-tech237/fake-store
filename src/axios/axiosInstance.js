import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: process.env.DOMAIN,
    headers: { 'Content-Type': 'application/json' },
});
