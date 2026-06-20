import axios from "axios";

const API_URL = "https://fakestoreapi.com/users";

export const crearCliente = async (datosCliente) => {
  const { data } = await axios.post(API_URL, datosCliente);
  return data;
};