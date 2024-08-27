import React, { useState, useEffect } from 'react';
import './ebook.css';  // Adicione estilos para os cards e o modal
import { supabase } from './supabaseclient';
import parse from 'html-react-parser';  // Importe o parser HTML
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function Ebook() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(true); // Estado de carregamento

  // Fetch articles from Supabase
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('Artigos') // Substitua pelo nome da sua tabela
          .select('*');

        if (error) {
          throw error;
        }
        
        setArticles(data);
      } catch (error) {
        console.error('Erro ao buscar artigos:', error);
      } finally {
        setLoading(false); // Atualize o estado de carregamento
      }
    };

    fetchArticles();
  }, []);

  const openModal = (article) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  const openConfirmDialog = (article) => {
    setArticleToDelete(article);
    setOpenDialog(true);
  };

  const closeConfirmDialog = () => {
    setOpenDialog(false);
    setArticleToDelete(null);
  };

  const deleteArticle = async () => {
    try {
      const { error } = await supabase
        .from('Artigos')
        .delete()
        .eq('id', articleToDelete.id);

      if (error) {
        throw error;
      }

      // Atualiza o estado local para remover o artigo excluído
      setArticles(articles.filter(article => article.id !== articleToDelete.id));
      setSnackbarMessage('Artigo excluído com sucesso!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erro ao excluir artigo:', error);
      setSnackbarMessage('Erro ao excluir artigo.');
      setSnackbarOpen(true);
    }

    closeConfirmDialog();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="container">
      <h1 id='titulo-ebook'>E-BOOKS</h1>
      <br/>

      {loading ? (
        <div className="loader"></div> // Círculo giratório enquanto carrega
      ) : (
        <div className="articles-container">
          {articles.map(article => (
            <div className="card" key={article.id}>
              <img src={article.imagem} alt={article.titulo} className="card-image" /> 
              
              <h2 id='title' className="card-title">{'"'+article.titulo+'"'}</h2>
              <p id='p' className="card-desc">{article.desc}</p>
              <br/>
              <div className="botoes">
                <button className="card-button" onClick={() => openModal(article)}>Ler</button>
                <button className="close-button" onClick={() => openConfirmDialog(article)}>X</button>
              </div>
              <br/>
            </div>
          ))}
        </div>
      )}

      {selectedArticle && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>×</span>
            <h2>{selectedArticle.titulo}</h2>
            <div className="modal-body">
              {parse(selectedArticle.content, {
                replace: (domNode) => {
                  if (domNode.type === 'tag' && domNode.name === 'img') {
                    domNode.attribs.style = 'max-width: 100%; height: auto;';
                  }
                }
              })} 
            </div>
          </div>
        </div>
      )}

      <Dialog
        open={openDialog}
        onClose={closeConfirmDialog}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <p>Deseja realmente excluir este artigo?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={deleteArticle} color="secondary">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <br/>
    </div>
  );
}

export default Ebook;
