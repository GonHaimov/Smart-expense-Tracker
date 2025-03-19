import axios from "axios"

const API_URL = "http://127.0.0.1:8000"; // backend address

export const registerUser = async (userData) => {
    return axios.post(`${API_URL}/users/register`, userData);
};

export const loginUser = async (loginData) => {
    return axios.post(`${API_URL}/users/login`, loginData);
};
