import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './home.css';
import img from './biologia.jpg';

function Home() {


  return (
    <div className="home-container">
      <div className="esq">
      </div>
        
      <div className="dir">
        <div className="conteudo-dir">
          <h1 id="title-home">E-BOOK</h1>
          <p id="subtitulo">Aqui você encontra os melhores e-books de Biologia!</p>
          <img className="imgg" src={img} alt=""  />
          <br />
          <Link to="/ebook">
            <button id="button">ENCONTRAR!</button>
          </Link>
          
        </div>
        
      </div>
    </div>
  );
}

export default Home;
