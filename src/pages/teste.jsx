import React from 'react';
import './tresd.css'; 
import frente from './front.png';
import back from './lateral.png';
import { Link } from "react-router-dom";


const Tresde = () => {
    return (
        <div className="tudao">
       

        <div className="esquerdona">
        <div className="containerr">
            <img src={frente} alt="Frente" className="front" />
            <img src={back} alt="Lateral" className="back" />
            
            </div>
            <Link to="/login">
          <br/>
          <br/>
            <button id="button" className='mobile'>ENCONTRAR!</button>
          </Link>
        </div>
        

          <div className="direita">
                <h1 id='title-home'>E-BOOK'S</h1>
          <p id="subtitulo">Aqui você encontra os melhores e-books de Biologia!</p>
          <Link to="/login">
        <br/>
            <button id="button" className='desktop'>ENCONTRAR!</button>
          </Link>
            </div>

        </div>
        
    );
};

export default Tresde;
