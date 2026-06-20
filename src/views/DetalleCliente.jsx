import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Clientes from '../services/clienteAPI';

const DetalleCliente = () => {

    const { id } = useParams();

    const [cliente, setCliente] = useState(null);

    useEffect(() => {
        const cargarCliente = async () => {
            try{
                const data = await clienteServices.getPorId(id);
                setCliente(data);
            }catch(error){
                console.error("Error al cargar:", error)
            }
        };

        cargarCliente();

    }, [id]);

    if (!cliente) {
        return <h2>Cargando...</h2>;
    }
    const {
        username,
        password,
        email,
        phone,
        name: {
            firstname,
            lastname
        },
        address: {
            street,
            number,
            zipcode,
            city
        }
    } = cliente;

    const eliminarCliente = async () => {
        try {
            const respuesta = await clienteServices.deleteCliente(id);
            console.log(respuesta);
            alert("Cliente eliminado correctamente");
        } catch (error) {
            console.error(error);
        }
    };
    return (
    <div>

        <h1>Ficha Completa del Cliente</h1>

        <h2>Datos Personales</h2>

        <p>Nombre: {firstname}</p>
        <p>Apellido: {lastname}</p>
        <p>Email: {email}</p>
        <p>Teléfono: {phone}</p>

        <h2>Dirección</h2>

        <p>Calle: {street}</p>
        <p>Número: {number}</p>
        <p>Ciudad: {city}</p>
        <p>Código Postal: {zipcode}</p>

        <h2>Credenciales</h2>

        <p>Usuario: {username}</p>
        <p>Contraseña: {password}</p>

        {
        administrador.sector === "Gerencia" && (
            <button
            className="btn btn-danger"
            onClick={eliminarCliente}
            >
            Eliminar Cliente de la Base de Datos
            </button>
        )
        }
    </div>
);
};

export default DetalleCliente;