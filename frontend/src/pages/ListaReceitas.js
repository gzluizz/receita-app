import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListaReceitas() {
  const [receitas, setReceitas] = useState([]);
  const [descricaoExpandida, setDescricaoExpandida] = useState({});

  const carregarReceitas = async () => {
    const res = await axios.get('http://localhost:5000/api/receitas');
    setReceitas(res.data);
  };

  const deletarReceita = async (id) => {
    await axios.delete(`http://localhost:5000/api/receitas/${id}`);
    carregarReceitas();
  };

  const toggleDescricao = (id) => {
    setDescricaoExpandida((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    carregarReceitas();
  }, []);

  const renderDescricao = (descricao, id) => {
    const limite = 150;

    if (!descricao) return null;

    const expandida = descricaoExpandida[id];
    const texto = expandida ? descricao : descricao.slice(0, limite);

    return (
      <>
        <p style={{ whiteSpace: 'pre-wrap', marginBottom: '8px' }}>{texto}{!expandida && descricao.length > limite ? '...' : ''}</p>
        {descricao.length > limite && (
          <button onClick={() => toggleDescricao(id)} className="ver-mais-btn">
            {expandida ? 'Ver menos' : 'Ver mais'}
          </button>
        )}
      </>
    );
  };

  return (
    <div className="container">
      <h2>Receitas</h2>
      <Link to="/cadastro" className="btn btn-cadastro">Cadastrar Nova Receita</Link>
      <div className="lista">
        {receitas.map((receita) => (
          <div key={receita._id} className="card">
            <h2>{receita.nome}</h2>
            <img
              src={`http://localhost:5000${receita.imagemUrl}`}
              alt={receita.nome}
              style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
            <div className="descricao">
              {renderDescricao(receita.descricao, receita._id)}
            </div>
            <p className="category"><strong>Categoria:</strong> {receita.categoria}</p>
            <div className="card-buttons">
              <Link to={`/editar/${receita._id}`} className="btn btn-gren">Editar</Link>
              <button onClick={() => deletarReceita(receita._id)} className="btn btn-delete">Deletar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaReceitas;
