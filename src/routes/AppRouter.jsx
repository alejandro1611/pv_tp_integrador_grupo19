import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import RutaProtegida from "./RutaProtegida";
import App from "../App";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import ListaClientes from "../views/ListaClientes";
import DetalleCliente from "../views/DetalleCliente";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <RutaProtegida><App /></RutaProtegida>,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "clientes", element: <ListaClientes /> },
      { path: "clientes/:id", element: <DetalleCliente /> },
    ],
  },
  { path: "*", element: <Navigate to="/" /> },
]);

export default router;