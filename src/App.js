import React from "react";
import "@/App.css";
import "./styles/centro.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <FloatingWhatsApp />
      </BrowserRouter>
    </div>
  );
}

export default App;
