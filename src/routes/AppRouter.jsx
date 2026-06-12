import { createBrowserRouter } from "react-router-dom";
import RutaProtegida from "./RutaProtegida";
import Layout from "../components/layout/Layout";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import ListaClientes from "../views/ListaClientes";
import DetalleCliente from "../views/DetalleCliente";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <RutaProtegida><Layout /></RutaProtegida>,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "clientes", element: <ListaClientes /> },
      { path: "clientes/:id", element: <DetalleCliente /> },
    ],
  },
]);

export default router;