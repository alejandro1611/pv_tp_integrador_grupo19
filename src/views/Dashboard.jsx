import { Box, Typography } from "@mui/material";
import { Card, CardContent, Grid } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
const Dashboard = () => {
return (
<Box sx={{ padding: 4 }}>
<Typography variant="h4" gutterBottom>
  Panel de Control
</Typography>
<Typography variant="subtitle1" color="text.secondary" gutterBottom>
  Bienvenido al sistema de gestión de clientes.
</Typography>
</Box>
);

};







export default Dashboard;