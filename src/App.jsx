import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Noticias from "./pages/Noticias";
import Ebook from "./pages/Ebook";
import Cadastrar from "./pages/Cadastrar";
import Login from "./pages/Login";
import Footer from "./components/footer";
import Criar from "./pages/Criar";
import Tresde from "./pages/teste";
import Esqueci from "./pages/Esqueci";
import Sucesso from "./pages/Sucesso";
import Aviso from "./pages/Aviso";

function App() {
  return (
    <BrowserRouter>
      <div id="root">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Tresde />} />
            <Route path="/home" element={<Home />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/ebook" element={<Ebook />} />
            <Route path="/cadastrar" element={<Cadastrar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/criar" element={<Criar />} />
            <Route path="/inicio" element={<Tresde />} />
            <Route path="/esqueci" element={<Esqueci />} />
            <Route path="/sucesso" element={<Sucesso />} />
            
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
