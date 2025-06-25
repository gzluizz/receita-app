const mongoose = require('mongoose');

const ReceitaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  categoria: { type: String },
  imagemUrl: { type: String }
});

module.exports = mongoose.model('Receita', ReceitaSchema);
