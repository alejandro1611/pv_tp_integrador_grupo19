import axios from "axios";

const API_URL = "https://fakestoreapi.com/users";

export const getClientes = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const getPorId = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

export const deleteCliente = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};