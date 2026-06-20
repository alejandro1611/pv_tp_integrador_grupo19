import axios from "axios";

const Clientes= (() => {
    const API_URL= "https://fakestoreapi.com/users";

    const getClientes = async() => {
        const {data} = await axios.get(API_URL);
        return data;
    };

    const getPorId = async() => {
        const {data} = await axios.get(`${API_URL}/${id}`);
        return data;
    };

    const deleteCliente = async() => {
        const {data} = await axios.delete(`${API_URL}/${id}`);
        return data;
    };

    return {
        getClientes,
        getPorId,
        deleteCliente
    };

})