import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/theme.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ClientsPage from "./pages/ClientsPage";
import ErrorPage404 from "./pages/ErrorPage404";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="*" element={<ErrorPage404 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
