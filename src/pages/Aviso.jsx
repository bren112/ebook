import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { supabase } from './supabaseclient'; 
import './aviso.css'; 

function Aviso() {
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [img, setImg] = useState('');
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  // Função para buscar os avisos
  const fetchAvisos = async () => {
    const { data, error } = await supabase.from('Avisos').select('id, titulo');
    if (error) {
      console.error('Erro ao buscar avisos:', error.message);
    } else {
      setAvisos(data);
    }
  };

  // Função para criar um aviso
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from('Avisos')
      .insert([{ titulo, texto, img }]);

    setLoading(false);

    if (error) {
      setAlertType('error');
      setAlertMessage(`Erro ao criar aviso: ${error.message}`);
      console.error('Erro ao inserir aviso:', error.message);
    } else {
      setAlertType('success');
      setAlertMessage('Aviso criado com sucesso!');
      setTitulo('');
      setTexto('');
      setImg('');
      fetchAvisos(); // Atualiza a lista após criar o aviso
    }

    setOpen(true);
  };

  // Função para excluir um aviso
  const handleDelete = async (id) => {
    const { error } = await supabase.from('Avisos').delete().eq('id', id);
    if (error) {
      console.error('Erro ao excluir aviso:', error.message);
    } else {
      setAlertType('success');
      setAlertMessage('Aviso excluído com sucesso!');
      fetchAvisos(); // Atualiza a lista após excluir
      setOpen(true);
    }
  };

  useEffect(() => {
    fetchAvisos(); // Busca os avisos ao carregar o componente
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="aviso-container">
      <h1 id="h1">Criar Aviso</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="texto">Texto:</label>
          <textarea
            id="texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Criar Aviso'}
        </button>
      </form>

      <br />

      <h2 id="h1">Gerenciar</h2>
      <ul>
        {avisos.map((aviso) => (
          <li key={aviso.id} className="aviso-item">
            {'"'+aviso.titulo+'"'}
            <button id='excluir' onClick={() => handleDelete(aviso.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertType} variant="filled">
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Aviso;
