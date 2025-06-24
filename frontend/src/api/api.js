// src/api/api.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // backend address

export const registerUser = async (userData) => {
    return axios.post(`${API_URL}/users/register`, userData);
};

export const loginUser = async (loginData) => {
    return axios.post(`${API_URL}/users/login`, loginData);
};

export const addExpense = async (newExpense) => {
    const token = localStorage.getItem("token");

    return axios.post(`${API_URL}/expenses/add`, newExpense, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getExpenses = async () => {
    const token = localStorage.getItem("token");
    return axios.get(`${API_URL}/expenses`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
