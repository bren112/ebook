import React, { useState, useEffect } from 'react';
import './tresd.css'; 
import frente from './front.png';
import back from './lateral.png';
import { Link } from "react-router-dom";

const Tresde = () => {
    const [isHovered, setIsHovered] = useState(false);

    // Efeito para desvirar a imagem após 2 segundos
    useEffect(() => {
        let timer;
        if (isHovered) {
            timer = setTimeout(() => {
                setIsHovered(false);
            }, 2000); // Desvirar após 2 segundos
        }
        return () => clearTimeout(timer); // Limpa o timer ao desmontar
    }, [isHovered]);

    return (
        <div className="tudao">
            <div className="esquerdona">
                <div
                    className={`containerr ${isHovered ? 'hover' : 'active'}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <img src={frente} alt="Frente" className="front" />
                    <img src={back} alt="Lateral" className="back" />
                </div>
                <Link to="/login">
                    <br />
                    <br />
                    <br />
                    <button id="button" className="mobile">ENCONTRAR!</button>
                </Link>
                <br />
                <br />
            </div>

            <div className="direita">
                <h1 id="title-home">E-BOOK'S</h1>
                <p id="subtitulo">Aqui você encontra os melhores e-books de Biologia!</p>
                <Link to="/login">
                    <br />
                    <button id="button" className="desktop">ENCONTRAR!</button>
                </Link>
            </div>
        </div>
    );
};

export default Tresde;
