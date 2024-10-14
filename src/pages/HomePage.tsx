import { useState } from "react";
import React from "react";
import MainBody from "../components/MainBody";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";

const HomePage: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <NavBar />
        <MainBody />
        <Footer />
        <br></br>
      </div>
      {/*       <div>
            <BrowserRouter>
              <Route>
                <Route path="/" exact component={MainBody} />
                <Route path="/services" component={Services} />
              </Route>
            </BrowserRouter>
          </div> */}

      {
        <>
          <div className="container">
            <a href="https://vitejs.dev" target="_blank">
              <img
                src="../src/images/vite.svg"
                className="logo"
                alt="Vite logo"
              />
            </a>
            <a href="https://react.dev" target="_blank">
              <img
                src="../src/images/react.svg"
                className="logo react"
                alt="React logo"
              />
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
        </>
      }
    </>
  );
};

export default HomePage;
