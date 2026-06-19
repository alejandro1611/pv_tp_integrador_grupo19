import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
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
<Grid container spacing={3} sx={{ marginTop: 2 }}>
  <Grid item xs={12} sm={4}>
  <Card>
    <CardContent>
      <PeopleIcon color="primary" fontSize="large" />
      <Typography variant="h6">Clientes Registrados</Typography>
      <Typography variant="body2" color="text.secondary">
        Consultá la lista completa de clientes en la sección Clientes.
      </Typography>
    </CardContent>
  </Card>
</Grid>
<Grid item xs={12} sm={4}>
  <Card>
    <CardContent>
      <StoreIcon color="secondary" fontSize="large" />
      <Typography variant="h6">API Conectada</Typography>
      <Typography variant="body2" color="text.secondary">
        Los datos se obtienen en tiempo real desde FakeStoreAPI.
      </Typography>
    </CardContent>
  </Card>
</Grid>
<Grid item xs={12} sm={4}>
  <Card>
    <CardContent>
      <PersonAddIcon color="success" fontSize="large" />
      <Typography variant="h6">Alta de Clientes</Typography>
      <Typography variant="body2" color="text.secondary">
        Podés registrar nuevos clientes desde la sección Clientes.
      </Typography>
    </CardContent>
  </Card>
</Grid>
</Grid>
</Box>
);

};

export default Dashboard;