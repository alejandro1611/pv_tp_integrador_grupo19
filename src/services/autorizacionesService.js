import axios from "axios";
import usuarios from "../data/usuarios";


const autorizacionesService = (() => {

  const login = (user, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const encontrado = usuarios.find(
          (u) => u.user === user && u.password === password
        );
        if (encontrado) {
          resolve({ id: encontrado.id, nombre: encontrado.nombre, rol: encontrado.rol });
        } else {
          reject(new Error("Usuario o contraseña incorrectos"));
        }
      }, 800);
    });
  };

  return { login };
})();

export default autorizacionesService;