import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './home.css';
import img from '../pages/t.png';
import { supabase } from './supabaseclient';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Home() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editedUser, setEditedUser] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const { data, error } = await supabase
                    .from('users')
                    .select('*');

                if (error) throw error;

                setUsuarios(data);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    const handleEditClick = (usuario) => {
        setEditedUser(usuario);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        const { id, nome, telefone, email, senha } = editedUser;

        try {
            const { error } = await supabase
                .from('users')
                .update({ nome, telefone, email, senha })
                .eq('id', id);

            if (error) throw error;

            setSnackbarMessage('Usuário atualizado com sucesso!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);

            // Atualiza a lista de usuários após a edição
            setUsuarios((prev) =>
                prev.map((user) => (user.id === id ? editedUser : user))
            );
        } catch (error) {
            setSnackbarMessage(`Erro ao atualizar usuário: ${error.message}`);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setEditedUser(null);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este usuário?");
        if (!confirmDelete) return;

        try {
            const { error } = await supabase
                .from('users')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setSnackbarMessage('Usuário excluído com sucesso!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);

            // Remove o usuário da lista localmente
            setUsuarios((prev) => prev.filter((user) => user.id !== id));
        } catch (error) {
            setSnackbarMessage(`Erro ao excluir usuário: ${error.message}`);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    if (loading) return <p>Carregando...</p>;

    return (
      <>
      <br/>
          <h1 id="title">Usuários Cadastrados</h1>
        <div className="home-container">
        
            <div className="card-container">
                {usuarios.map((usuario) => (
                    <div className="user-card" key={usuario.id}>
                        <img src={usuario.avatar} alt={usuario.nome} style={{ width: '100px' }} />
                        <h2>{usuario.nome}</h2>
                        <p>Telefone: {usuario.telefone}</p>
                        <p>Email: {usuario.email}</p>
                        <p>Senha: {usuario.senha}</p>
                        <div className="btns">
                            <button onClick={() => handleEditClick(usuario)}>Editar</button>
                            <button id="excluir" onClick={() => handleDelete(usuario.id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
            {editedUser && (
                <div className="edit-form">
                    <br />
                    <h3>Editar Usuário</h3>
                    <input
                        type="text"
                        name="nome"
                        value={editedUser.nome}
                        onChange={handleInputChange}
                        placeholder="Nome"
                    />
                    <input
                        type="text"
                        name="telefone"
                        value={editedUser.telefone}
                        onChange={handleInputChange}
                        placeholder="Telefone"
                    />
                    <input
                        type="email"
                        name="email"
                        value={editedUser.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        name="senha"
                        value={editedUser.senha}
                        onChange={handleInputChange}
                        placeholder="Senha"
                    />
                    <br />
                    <br />
                    <div className="btns">
                        <button onClick={handleSave}>Salvar</button>
                        <button onClick={() => setEditedUser(null)}>Cancelar</button>
                    </div>
                    <br />
                    <br />
                </div>
            )}

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
        </>
    );
}

export default Home;
