import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Message from "./Message"; // Adjust the file path as needed
import MainBody from "./components/MainBody";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Message />
        <MainBody />
        <Footer />
      </div>
    </>
  );
}

export default App;
