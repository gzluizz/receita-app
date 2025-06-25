const Receita = require('../models/Receita');

// GET todas as receitas
const listarReceitas = async (req, res) => {
  try {
    const receitas = await Receita.find();
    res.json(receitas);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar receitas' });
  }
};

// GET receita por ID
const buscarReceitaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const receita = await Receita.findById(id);
    if (!receita) {
      return res.status(404).json({ erro: 'Receita não encontrada' });
    }
    res.json(receita);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao buscar receita' });
  }
};

// POST nova receita
const criarReceita = async (req, res) => {
  try {
    console.log('Recebido no backend:');
    console.log("🟡 req.body:", req.body);
    console.log("🟢 req.file:", req.file);

    const { nome, descricao, categoria } = req.body;
    const imagemUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const novaReceita = new Receita({ nome, descricao, categoria, imagemUrl });
    await novaReceita.save();

    res.status(201).json(novaReceita);
  } catch (err) {
    console.error("🔴 Erro ao criar receita:", err);
    res.status(400).json({ erro: 'Erro ao criar receita' });
  }
};


// PUT editar receita
const atualizarReceita = async (req, res) => {
  try {
    const { id } = req.params;

    console.log('PUT /api/receitas/' + id);
    console.log('req.body:', req.body);
    console.log('req.file:', req.file); // multer deve estar ativado

    const updateData = {
      nome: req.body.nome,
      descricao: req.body.descricao,
      categoria: req.body.categoria,
    };

    if (req.file) {
      updateData.imagemUrl = `/uploads/${req.file.filename}`;
      console.log('Nova imagem salva em:', updateData.imagemUrl);
    }

    const receitaAtualizada = await Receita.findByIdAndUpdate(id, updateData, { new: true });

    console.log('Receita atualizada:', receitaAtualizada);
    res.json(receitaAtualizada);
  } catch (err) {
    console.error('Erro no PUT /api/receitas:', err);
    res.status(400).json({ erro: 'Erro ao atualizar receita' });
  }
};



// DELETE remover receita
const deletarReceita = async (req, res) => {
  try {
    const { id } = req.params;
    await Receita.findByIdAndDelete(id);
    res.json({ mensagem: 'Receita deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar receita' });
  }
};

module.exports = {
  listarReceitas,
  criarReceita,
  atualizarReceita,
  deletarReceita,
  buscarReceitaPorId
};
