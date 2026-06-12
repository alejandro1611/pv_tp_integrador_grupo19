import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

const Login = () => {
  const { login } = useAdmin();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [sector, setSector] = useState("");
  const [error, setError] = useState(false);

  const handleIngresar = () => {
    if (!nombre.trim() || !sector) {
      setError(true);
      return;
    }
    login(nombre.trim(), sector);
    navigate("/");
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">
            Iniciar Sesión
          </Typography>

          <TextField
            label="Nombre del Administrador"
            variant="outlined"
            fullWidth
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            error={error && !nombre.trim()}
            helperText={error && !nombre.trim() ? "Campo obligatorio" : ""}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth error={error && !sector} sx={{ mb: 3 }}>
            <InputLabel>Sector</InputLabel>
            <Select
              value={sector}
              label="Sector"
              onChange={(e) => setSector(e.target.value)}
            >
              <MenuItem value="Soporte">Soporte</MenuItem>
              <MenuItem value="Gerencia">Gerencia</MenuItem>
            </Select>
            {error && !sector && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                Campo obligatorio
              </Typography>
            )}
          </FormControl>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleIngresar}
          >
            Ingresar
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;