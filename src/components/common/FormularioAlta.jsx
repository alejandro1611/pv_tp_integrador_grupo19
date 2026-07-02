import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { crearCliente } from "../../services/clienteAPI";

const FormularioAlta = ({ onClienteAgregado }) => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    ciudad: "",
    calle: "",
    numero: "",
    zipcode: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, mensaje: "", severity: "success" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.nombre || !form.apellido || !form.email) {
      setSnackbar({ open: true, mensaje: "Nombre, apellido y email son obligatorios.", severity: "error" });
      return;
    }

    setLoading(true);
    try {
      const data = await crearCliente({
        email: form.email,
        username: form.username,
        password: form.password,
        name: { firstname: form.nombre, lastname: form.apellido },
        address: {
          city: form.ciudad,
          street: form.calle,
          number: parseInt(form.numero) || 0,
          zipcode: form.zipcode,
        },
        phone: form.telefono,
      });

      const nuevoCliente = {
        id: Date.now(),
        name: { firstname: form.nombre, lastname: form.apellido },
        email: form.email,
        phone: form.telefono,
        address: { city: form.ciudad },
      };

      const agregados = JSON.parse(localStorage.getItem("agregados") || "[]");
      localStorage.setItem("agregados", JSON.stringify([...agregados, nuevoCliente]));

      onClienteAgregado(nuevoCliente);

      setSnackbar({ open: true, mensaje: `Cliente creado correctamente. ID asignado: ${data.id}`, severity: "success" });

      setForm({
        nombre: "", apellido: "", email: "", telefono: "",
        ciudad: "", calle: "", numero: "", zipcode: "",
        username: "", password: "",
      });

    } catch (error) {
      setSnackbar({ open: true, mensaje: "Error al crear el cliente.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <PersonAddIcon color="primary" />
        <Typography variant="h6" fontWeight={600}>
          Alta de Cliente
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
        <TextField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} fullWidth />
        <TextField label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} fullWidth />
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth />
        <TextField label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} fullWidth />
        <TextField label="Ciudad" name="ciudad" value={form.ciudad} onChange={handleChange} fullWidth />
        <TextField label="Calle" name="calle" value={form.calle} onChange={handleChange} fullWidth />
        <TextField label="Número" name="numero" value={form.numero} onChange={handleChange} fullWidth />
        <TextField label="Código Postal" name="zipcode" value={form.zipcode} onChange={handleChange} fullWidth />
        <TextField label="Username" name="username" value={form.username} onChange={handleChange} fullWidth />
        <TextField label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} fullWidth />
      </Box>

      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <PersonAddIcon />}
        sx={{ mt: 3, borderRadius: 2, textTransform: "none", fontWeight: 600 }}
      >
        {loading ? "Guardando..." : "Dar de Alta"}
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.mensaje}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default FormularioAlta;