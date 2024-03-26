import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const API_URL = "https://6512a7edb8c6ce52b395f83c.mockapi.io/userform/";




export const getUser = async (id) => {
  try {
    const response = await axios.get(API_URL + id);

    return response;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateuser = async (id, userData) => {
  try {
    const response = await axios.put(API_URL + id, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(API_URL + id, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(API_URL + id);
    return response;
  } catch (error) {
    throw error;
  }
}