import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CadastroReceita() {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    categoria: '',
    imagem: null // Agora armazenamos o arquivo da imagem
  });
  const navigate = useNavigate(); // Hook para navegação

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagem') {
      setForm({ ...form, imagem: files[0] }); // Armazenando o arquivo de imagem
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validação simples
  if (!form.imagem) {
    alert('Por favor, selecione uma imagem antes de cadastrar.');
    return;
  }

  const formData = new FormData();
  formData.append('nome', form.nome);
  formData.append('descricao', form.descricao);
  formData.append('categoria', form.categoria);
  formData.append('imagem', form.imagem);

  console.log('🟡 Enviando dados:', {
    nome: form.nome,
    descricao: form.descricao,
    categoria: form.categoria,
    imagem: form.imagem.name
  });

  try {
    const response = await axios.post(
      'http://localhost:5000/api/receitas',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    console.log('✅ Cadastro bem‑sucedido:', response.data);
    navigate('/');
  } catch (error) {
    console.error('❌ Erro ao cadastrar receita:', error.response?.data || error.message);
    alert('Falha ao cadastrar: ' + (error.response?.data?.erro || error.message));
  }
};

  return (
    <div className="container">
      <h1>Cadastrar Receita</h1>
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
        {/* Novo campo para seleção de imagem */}
        <input
          type="file"
          name="imagem"
          onChange={handleChange}
          accept="image/*"
        />
        <button type="submit" className="btn btn-gren">Cadastrar Receita</button>
      </form>
      <button onClick={() => navigate(-1)} className="btn btn-back" >Voltar</button> 
    </div>
  );
}

export default CadastroReceita;
