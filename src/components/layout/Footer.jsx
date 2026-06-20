import { Box, Typography } from "@mui/material";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      mt: "auto",
      py: 2,
      textAlign: "center",
      borderTop: "1px solid",
      borderColor: "divider",
      bgcolor: "background.paper",
    }}
  >
    <Typography variant="body2" color="text.secondary">
      © 2026 Panel de Control de Clientes — Grupo 19
    </Typography>
  </Box>
);

export default Footer;