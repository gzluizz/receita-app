import React from 'react';
import { Link } from 'react-router-dom';

function ReceitaCard({ receita, onDelete }) {
  const { _id, nome, descricao, categoria, imagemUrl } = receita;

  return (
    <div className="card">
      <h2>{nome}</h2>
      {imagemUrl && (
        <img src={imagemUrl} alt={nome} style={{ maxWidth: '300px', height: 'auto' }} />
      )}
      <p>{descricao}</p>
      <p><strong>Categoria:</strong> {categoria}</p>
      <Link to={`/editar/${_id}`} className="btn">Editar</Link>
      <button onClick={() => onDelete(_id)} className="btn">Excluir</button>
    </div>
  );
}

export default ReceitaCard;
