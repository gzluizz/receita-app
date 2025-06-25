# 📖 Sistema de Cadastro de Receitas

Um sistema web completo para cadastro, listagem, edição e exclusão de receitas, com upload e visualização de imagens. Desenvolvido com **React**, **Node.js**, **Express** e **MongoDB**.

---

## 🚀 Funcionalidades

- ✅ Cadastro de receitas com:
  - Nome
  - Descrição
  - Categoria
  - Imagem (upload)
- 📄 Listagem das receitas em cards
  - Visualização da imagem, descrição e categoria
  - Limite da descrição com botão "Ver mais"
- ✏️ Edição de receitas com troca opcional da imagem
- ❌ Exclusão de receitas
- 🌐 Integração com MongoDB Atlas ou local

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- React
- Axios
- React Router
- CSS Grid & Flexbox

### Backend
- Node.js
- Express
- MongoDB com Mongoose
- Multer (upload de imagens)
- dotenv, cors

---

## 📁 Estrutura de Pastas

```
📦 backend
┣ 📂config # Configuração do Multer
┣ 📂controllers # Funções das rotas de receita
┣ 📂models # Mongoose Schema
┣ 📂routes # Rotas da API
┣ 📂uploads # Imagens salvas
┗ server.js # Entrada do servidor Express

📦 frontend  
┣ 📂 public          # Arquivos públicos estáticos (index.html, favicon, etc)  
┣ 📂 src             # Código-fonte principal  
┃ ┣ 📂 components    # Componentes React reutilizáveis  
┃ ┣ 📂 pages         # Páginas / Views  
┃ ┣ index.js         # Entrada principal do React  
┃ ┗ App.js           # Componente raiz  
┗ App.css         # Estilos globais   
```


---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/gzluizz/receita-app.git
cd receita-app
```

### 2. Instale as dependências
# Backend
```bash
cd backend
npm install
```

# Frontend
```bash
cd frontend
npm install
```

### 3. Configure o .env

No diretório backend, crie o arquivo .env com:

```ini
MONGO_URL=mongodb://localhost:27017/receitasDB
PORT=5000
```


### 4. Execute o projeto

Backend
```bash
cd backend
npm start
```

Frontend
```bash
cd ../frontend
npm start
```


### Upload de Imagens

As imagens são salvas na pasta /uploads
São exibidas através da rota estática: http://localhost:5000/uploads/nome-da-imagem.jpg