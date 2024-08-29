import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { supabase } from './supabaseclient';
import './Criar.css'; 
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Criar() {
    const [conteudo, setConteudo] = useState('');
    const [titulo, setTitulo] = useState('');
    const [desc, setDesc] = useState('');
    const [imagem, setImagem] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const quillRef = useRef(null);

    const handleChange = (value) => {
        setConteudo(value);
    };

    const salvar = async () => {
        if (titulo.trim() === '' || desc.trim() === '' || conteudo.trim() === '') {
            setSnackbarMessage('Título, descrição e conteúdo não podem estar vazios.');
            setSnackbarOpen(true);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('Artigos')
                .insert([{ titulo: titulo, desc: desc, content: conteudo, imagem: imagem }]);

            if (error) {
                throw error;
            }

            setSnackbarMessage('Artigo salvo com sucesso!');
            setSnackbarOpen(true);
            setConteudo('');
            setTitulo('');
            setDesc('');
            setImagem('');
        } catch (error) {
            setSnackbarMessage(`Erro ao salvar o artigo: ${error.message}`);
            setSnackbarOpen(true);
        }
    };

    const initResizeHandlers = () => {
        const editor = quillRef.current.getEditor();
        const editorElement = editor.root;

        editorElement.addEventListener('mousedown', (event) => {
            if (event.target.tagName === 'IMG') {
                const img = event.target;
                const startX = event.clientX;
                const startY = event.clientY;
                const startWidth = img.clientWidth;
                const startHeight = img.clientHeight;

                const onMouseMove = (moveEvent) => {
                    img.style.width = `${startWidth + (moveEvent.clientX - startX)}px`;
                    img.style.height = `${startHeight + (moveEvent.clientY - startY)}px`;
                };

                const onMouseUp = () => {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                };

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            }
        });
    };

    useEffect(() => {
        initResizeHandlers();
    }, []);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
        <br/>
    

        <h1 id='h1'>Criar Ebook</h1>
        <div className='centro'>
            <div className="conteudo">

            <div className="form-group">
                <label>Título:</label>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Digite o título"
                />
            </div>
            <div className="form-group">
                <label>Descrição:</label>
                <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Digite a descrição"
                />
            </div>
            <div className="form-group">
                <label>Imagem (URL):</label>
                <input
                    type="text"
                    value={imagem}
                    onChange={(e) => setImagem(e.target.value)}
                    placeholder="Digite a URL da imagem"
                />
            </div>
            
            <ReactQuill
                ref={quillRef}
                value={conteudo}
                onChange={handleChange}
                modules={modules}
            />


            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarMessage.startsWith('Erro') ? 'error' : 'success'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <br/>
            <br/>
            <br/>
            <div className="btnfim">
            
            <button id='salvar' onClick={salvar}>Salvar</button>
            </div>
            <br/>
            <br/>
          
        </div>
        </div>
        
        </>
    );
}

const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline'],
        [{ 'align': [] }],
        ['image'],
        ['link'],
        ['clean']
    ],
};

export default Criar;
