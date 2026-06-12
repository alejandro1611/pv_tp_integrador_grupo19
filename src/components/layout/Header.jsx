import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useAdmin } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight={600}>
          Panel de Control
        </Typography>

        {admin && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2">
              {admin.nombre} — {admin.sector}
            </Typography>
            <Button color="inherit" variant="outlined" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;