import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";
import autorizacionesService from "../services/autorizacionesService";
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
  CircularProgress,
  Alert
} from "@mui/material";

const Login = () => {
  const { login } = useAdmin();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleIngresar = async () => {
    if (!user.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      const datos = await autorizacionesService.login(user, password);
      login(datos);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
          <Typography variant="h5" fontWeight={600} mb={3} align="center">
            Iniciar Sesión
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            label="Usuario"
            variant="outlined"
            fullWidth
            value={user}
            onChange={(e) => setUser(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleIngresar}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
          >
            Ingresar
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;