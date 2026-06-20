import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPorId, deleteCliente } from "../services/clienteAPI";
import { useAdmin } from "../hooks/useAdmin";
import {
  Box,
  Button,
  CircularProgress,
  Alert,
  Container,
  Typography,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";

const DetalleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useAdmin();

  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, mensaje: "", severity: "success" });

  useEffect(() => {
    const cargarCliente = async () => {
      try {
        const data = await getPorId(id);
        setCliente(data);
      } catch (error) {
        setError("No se pudo cargar la información del cliente.");
      } finally {
        setLoading(false);
      }
    };
    cargarCliente();
  }, [id]);

  const handleEliminar = async () => {
    setDialogOpen(false);
    try {
      await deleteCliente(id);
      setSnackbar({ open: true, mensaje: "Cliente eliminado correctamente.", severity: "success" });
      setTimeout(() => navigate("/clientes"), 2000);
    } catch (error) {
      setSnackbar({ open: true, mensaje: "Error al eliminar el cliente.", severity: "error" });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const {
    username,
    password,
    email,
    phone,
    name: { firstname, lastname },
    address: { street, number, zipcode, city },
  } = cliente;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>

      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/clientes")}
        sx={{ mb: 3 }}
      >
        Volver a la lista
      </Button>

      <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
        Ficha del Cliente
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>Datos Personales</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography><strong>Nombre:</strong> {firstname}</Typography>
        <Typography><strong>Apellido:</strong> {lastname}</Typography>
        <Typography><strong>Email:</strong> {email}</Typography>
        <Typography><strong>Teléfono:</strong> {phone}</Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>Dirección</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography><strong>Calle:</strong> {street}</Typography>
        <Typography><strong>Número:</strong> {number}</Typography>
        <Typography><strong>Ciudad:</strong> {city}</Typography>
        <Typography><strong>Código Postal:</strong> {zipcode}</Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>Credenciales</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography><strong>Usuario:</strong> {username}</Typography>
        <Typography><strong>Contraseña:</strong> {password}</Typography>
      </Paper>

      {admin?.sector === "Gerencia" && (
        <Button
          variant="contained"
          color="error"
          size="large"
          startIcon={<DeleteIcon />}
          onClick={() => setDialogOpen(true)}
          sx={{ borderRadius: 2 }}
        >
          Eliminar Cliente de la Base de Datos
        </Button>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle fontWeight={600}>¿Eliminar cliente?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Estás a punto de eliminar a <strong>{firstname} {lastname}</strong> de la base de datos. Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setDialogOpen(false)} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleEliminar} variant="contained" color="error" startIcon={<DeleteIcon />}>
            Confirmar eliminación
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.mensaje}
        </Alert>
      </Snackbar>

    </Container>
  );
};

export default DetalleCliente;