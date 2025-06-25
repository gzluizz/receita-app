import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importando as dependências
import ListaReceitas from './pages/ListaReceitas'; // Página de listagem de receitas
import CadastroReceita from './pages/CadastroReceita'; // Página de cadastro de receita
import EditarReceita from './pages/EditarReceita'; // Página de edição de receita

function App() {
  return (
    <Router>
      {/* Barra de Navegação */}
      <nav>
        <h1>Sistema de Cadastro de Receitas</h1> {/* Título adicionado */}
      </nav>

      {/* Rotas do React Router */}
      <Routes>
        {/* Página de Listagem de Receitas */}
        <Route path="/" element={<ListaReceitas />} />

        {/* Página de Cadastro de Receita */}
        <Route path="/cadastro" element={<CadastroReceita />} />

        {/* Página de Edição de Receita */}
        <Route path="/editar/:id" element={<EditarReceita />} />
      </Routes>
    </Router>
  );
}

export default App;
