import { Paper, Tabs, Tab } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getTabValue = () => {
    if (location.pathname === "/") return 0;
    if (location.pathname.startsWith("/clientes")) return 1;
    return false;
  };

  const handleTabChange = (event, newValue) => {
    if (newValue === 0) navigate("/");
    if (newValue === 1) navigate("/clientes");
  };

  const tabValue = getTabValue();

  return (
    <Paper square elevation={1} sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        sx={{
          "& .MuiTab-root": {
            fontSize: "0.95rem",
            fontWeight: 500,
            py: 1.5,
            minHeight: "auto",
          },
        }}
      >
        <Tab icon={<DashboardIcon />} iconPosition="start" label="Dashboard" />
        <Tab icon={<PeopleIcon />} iconPosition="start" label="Clientes" />
      </Tabs>
    </Paper>
  );
};

export default Nav;