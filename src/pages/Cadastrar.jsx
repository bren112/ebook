import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { supabase } from './supabaseclient'; 
import InputMask from 'react-input-mask'; 
import './cadastrar.css'; 
import { Link } from "react-router-dom";


function Cadastrar() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from('users') // Nome da tabela corrigido para 'users'
      .insert([{ nome, telefone, email, senha, avatar }]);

    setLoading(false);

    if (error) {
      setAlertType('error');
      setAlertMessage(`Erro ao cadastrar: ${error.message}`);
      console.error('Erro ao inserir dados:', error.message);
    } else {
      setAlertType('success');
      setAlertMessage('Cadastro realizado com sucesso!');
      setNome('');
      setTelefone('');
      setEmail('');
      setSenha('');
      setAvatar('');
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
          <h1 id='h1'>Cadastro</h1>

    <div className="cadastrar-container">
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label id='avt'>Escolha seu avatar <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
</svg></label>
          <div className="avatar-buttons">
            <div className="central">
              <button
                type="button"
                onClick={() => setAvatar('https://i.pinimg.com/564x/73/7a/3d/737a3dfe3d85df82b1b2660055ff6b64.jpg')}
                className={avatar === 'https://i.pinimg.com/564x/73/7a/3d/737a3dfe3d85df82b1b2660055ff6b64.jpg' ? 'selected' : ''}
              >
                <img src="https://i.pinimg.com/564x/73/7a/3d/737a3dfe3d85df82b1b2660055ff6b64.jpg" alt="Jacaré" width="50" height="50" />
              </button>
              <button
                type="button"
                onClick={() => setAvatar('https://i.pinimg.com/236x/36/ca/d0/36cad0b1a840e127350b07e17b540535.jpg')}
                className={avatar === 'https://i.pinimg.com/236x/36/ca/d0/36cad0b1a840e127350b07e17b540535.jpg' ? 'selected' : ''}
              >
                <img src="https://i.pinimg.com/236x/36/ca/d0/36cad0b1a840e127350b07e17b540535.jpg" alt="Iguana" width="50" height="50" />
              </button>
              <button
                type="button"
                onClick={() => setAvatar('https://i.pinimg.com/564x/b4/a5/b3/b4a5b38398f934c9ce7ddde71d5fb680.jpg')}
                className={avatar === 'https://i.pinimg.com/564x/b4/a5/b3/b4a5b38398f934c9ce7ddde71d5fb680.jpg' ? 'selected' : ''}
              >
                <img src="https://i.pinimg.com/564x/b4/a5/b3/b4a5b38398f934c9ce7ddde71d5fb680.jpg" alt="Cachorro" width="50" height="50" />
              </button>
              <button
                type="button"
                onClick={() => setAvatar('https://i.pinimg.com/564x/1e/7e/5f/1e7e5f5e5e07c07ab3baa24c569215c4.jpg')}
                className={avatar === 'https://i.pinimg.com/564x/1e/7e/5f/1e7e5f5e5e07c07ab3baa24c569215c4.jpg' ? 'selected' : ''}
              >
                <img src="https://i.pinimg.com/564x/1e/7e/5f/1e7e5f5e5e07c07ab3baa24c569215c4.jpg" alt="Rato" width="50" height="50" />
              </button>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefone">Telefone:</label>
          <InputMask
            mask="(99) 99999-9999"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          >
            {(inputProps) => <input {...inputProps} type="text" />}
          </InputMask>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div className="centro">
          <button type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Cadastrar'}
          </button>

          <Link to="/login">
            <button id="button">Login!</button>
          </Link>
        </div>
      </form>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertType} variant="filled">
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
    </>
  );
}

export default Cadastrar;
