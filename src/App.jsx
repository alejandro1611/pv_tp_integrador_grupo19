import { RouterProvider } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import router from "./routes/AppRouter";

const App = () => (
  <AdminProvider>
    <RouterProvider router={router} />
  </AdminProvider>
);

export default App;