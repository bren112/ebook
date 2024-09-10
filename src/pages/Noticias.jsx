import React, { useEffect, useState } from 'react';
import './Noticias.css';
import { supabase } from './supabaseclient'; // Certifique-se de importar seu cliente Supabase
import img from './banner.png'; // Imagem padrão que será usada em todos os cartões

function Noticias() {
  const [avisos, setAvisos] = useState([]);

  // Função para buscar avisos do Supabase
  useEffect(() => {
    const fetchAvisos = async () => {
      const { data, error } = await supabase
        .from('Avisos')
        .select('id, titulo, texto'); // Removemos a seleção de img, já que será fixa
      
      if (error) {
        console.error('Erro ao buscar avisos:', error.message);
      } else {
        setAvisos(data);
      }
    };

    fetchAvisos();
  }, []);

  return (
    <>
      <br />
      <div className="busca">
        <div className="buscar"></div>
      </div>
      <h1 id='recados-title'>RECADOS</h1>
      <br />
      <div className="recados">
        {avisos.length > 0 ? (
          avisos.map((aviso) => (
            <div id="card-recado" key={aviso.id}>
              <br />
              {/* Usa a mesma imagem para todos os avisos */}
              <img src={img} alt="Imagem padrão" />
              <h1>{aviso.titulo}</h1>
              <p id='p'>{aviso.texto}</p>
              <br />
            </div>
          ))
        ) : (
          <p>Nenhum aviso encontrado.</p>
        )}
      </div>
      <br />
      <br />
    </>
  );
}

export default Noticias;
