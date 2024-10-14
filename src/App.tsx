import { useState } from "react";
import reactLogo from "/assets/react.svg"; // Adjusted path
import viteLogo from "/assets/vite.svg"; // Adjusted path
import "./App.css";
import "./components/NavBar.css";
import Nav from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Services from "./pages/Services";
import MainBody from "./components/MainBody";
import UnderBody from "./components/UnderBody";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        <Nav />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
        </Routes>
        <MainBody />
        <UnderBody />
        <Footer />

        <div className="container">
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>

        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </Router>
  );
}

export default App;
