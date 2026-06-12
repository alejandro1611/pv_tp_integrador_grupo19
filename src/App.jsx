import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";

const App = () => (
  <div className="app">
    <Header />
    <Nav />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default App;