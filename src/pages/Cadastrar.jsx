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
  const [step, setStep] = useState(1); // Controla a etapa atual do formulário

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from('users')
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

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const previousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <>
      <h1 id='h1'>Cadastro</h1>

      <div className="cadastrar-container">
        <form onSubmit={handleSubmit}>
          
          {step === 1 && (
            <>
              <div className="form-group">
                <label id='avt'>Escolha seu avatar</label>
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
              <button type="button" onClick={nextStep}>Próximo</button>
            </>
          )}

          {step === 2 && (
            <>
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
              <div className="separar">
              <button type="button" onClick={previousStep}>Anterior</button>
              <button type="button" onClick={nextStep}>Próximo</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
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
              <div className="separar">
              <button type="button" onClick={previousStep}>Anterior</button>
              <button type="button" onClick={nextStep}>Próximo</button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
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
              <div className="separar">
              <button type="button" onClick={previousStep}>Anterior</button>
              <button type="button" onClick={nextStep}>Próximo</button>
              </div>
            </>
          )}

          {step === 5 && (
            <>
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
              <div className="separar">
              <button type="button" onClick={previousStep}>Anterior</button>
              <button type="submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Cadastrar'}
              </button>
              </div>
            </>
          )}

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
