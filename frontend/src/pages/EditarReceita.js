import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditarReceita() {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    categoria: '',
    imagemUrl: ''
  });
  const [imagem, setImagem] = useState(null); // estado para nova imagem (arquivo)
  const { id } = useParams();
  const navigate = useNavigate();

  // Carrega a receita atual para edição
  useEffect(() => {
    axios.get(`http://localhost:5000/api/receitas/${id}`)
      .then(res => {
        setForm(res.data);
      })
      .catch(err => {
        console.error('Erro ao buscar receita:', err);
      });
  }, [id]);

  // Atualiza o estado do formulário e da imagem
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'imagem') {
      setImagem(files[0]); // selecionou nova imagem
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // Envia os dados atualizados para o backend
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('nome', form.nome);
  formData.append('descricao', form.descricao);
  formData.append('categoria', form.categoria);

  if (imagem) {
    formData.append('imagem', imagem);
    console.log('🟡 Enviando nova imagem:', imagem.name);
  } else {
    console.log('⚪ Nenhuma nova imagem foi selecionada');
  }

  console.log('📤 Dados enviados:', {
    nome: form.nome,
    descricao: form.descricao,
    categoria: form.categoria
  });

  try {
    const response = await axios.put(`http://localhost:5000/api/receitas/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log('✅ Receita atualizada com sucesso:', response.data);
    navigate('/');
  } catch (error) {
    console.error('❌ Erro ao atualizar receita:', error);
  }
};

  return (
    <div className="container">
      <h1>Editar Receita</h1>
      <form onSubmit={handleSubmit}>

        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome"
          required
        />

        <textarea
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          placeholder="Descrição"
        />

        <input
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          placeholder="Categoria"
        />

        {/* Exibe imagem atual, se houver */}
        {form.imagemUrl && (
          <div>
            <p>Imagem atual:</p>
            <img
              src={`http://localhost:5000${form.imagemUrl}`}
              alt={form.nome}
              style={{ maxWidth: '200px', marginBottom: '10px' }}
            />
          </div>
        )}

        {/* Upload nova imagem */}
        <input
          type="file"
          name="imagem"
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit">Atualizar Receita</button>
      </form>

      <button onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
}

export default EditarReceita;
