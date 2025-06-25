const express = require('express');
const router = express.Router();
const receitaController = require('../controllers/receitaController');
const upload = require('../config/multerConfig');

// Rota com upload da imagem
router.post('/receitas', upload.single('imagem'), receitaController.criarReceita);

// Rotas do Crud
router.get('/receitas', receitaController.listarReceitas);
router.get('/receitas/:id', receitaController.buscarReceitaPorId);
router.post('/receitas', receitaController.criarReceita);
router.put('/receitas/:id', upload.single('imagem'), receitaController.atualizarReceita);
router.delete('/receitas/:id', receitaController.deletarReceita);

module.exports = router;
