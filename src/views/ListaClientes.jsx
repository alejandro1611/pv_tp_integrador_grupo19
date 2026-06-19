import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getClientes } from "../services/clienteAPI";

const ListaClientes = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchClientes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor. No se pudieron cargar los clientes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const formatFullName = (name) => {
    if (!name) return "";
    const first = capitalize(name.firstname);
    const last = capitalize(name.lastname);
    return `${last}, ${first}`;
  };

  const filteredClientes = clientes.filter((cliente) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;

    const lastname = (cliente.name?.lastname || "").toLowerCase();
    const city = (cliente.address?.city || "").toLowerCase();

    return lastname.includes(term) || city.includes(term);
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
            Clientes
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Visualice y administre la información de los clientes registrados.
          </Typography>
        </Box>
        {!loading && !error && (
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchClientes}
            sx={{ borderRadius: 2 }}
          >
            Actualizar
          </Button>
        )}
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar por apellido o ciudad..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 4,
          backgroundColor: "background.paper",
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        }}
      />

      {loading ? (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "300px", gap: 2 }}>
          <CircularProgress size={50} thickness={4} />
          <Typography color="text.secondary">Cargando listado de clientes...</Typography>
        </Box>
      ) : error ? (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={fetchClientes} sx={{ fontWeight: "bold" }}>
              Reintentar
            </Button>
          }
          sx={{ mb: 4, borderRadius: 2 }}
        >
          {error}
        </Alert>
      ) : (
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Table sx={{ minWidth: 650 }} aria-label="tabla de clientes">
            <TableHead sx={{ backgroundColor: "primary.main" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: 600, fontSize: "1rem" }}>ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600, fontSize: "1rem" }}>Nombre Completo</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600, fontSize: "1rem" }}>Email</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600, fontSize: "1rem" }}>Teléfono</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600, fontSize: "1rem" }}>Ciudad</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: 600, fontSize: "1rem" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClientes.map((cliente) => (
                <TableRow key={cliente.id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>{cliente.id}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>
                    {formatFullName(cliente.name)}
                  </TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>{cliente.phone}</TableCell>
                  <TableCell>{capitalize(cliente.address?.city)}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => navigate(`/clientes/${cliente.id}`)}
                      sx={{ textTransform: "none", borderRadius: 1.5, px: 2 }}
                    >
                      Ver Ficha Completa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredClientes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <Typography variant="body1" color="text.secondary">
                      No se encontraron clientes que coincidan con la búsqueda.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ListaClientes;