import React from "react";
import "@/App.css";
import "./styles/centro.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import AdminDashboard from "./pages/AdminDashboard";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/products"    element={<ProductList />} />
          <Route path="/admin"    element={<AdminDashboard />} />
        </Routes>
        <FloatingWhatsApp />
      </BrowserRouter>
    </div>
  );
}

export default App;
