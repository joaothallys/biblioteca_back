const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LivroSchema = new Schema({
  nome: { type: String, required: true, minlength: 3 },
  dt_publicacao: { type: String, required: true, min: 0, max: 600 },
  autor: { type: String, required: true, minlength: 3 },
  genero: { type: String, required: true, minlength: 3 },
  editora: { type: String, required: true, minlength: 3 }


});

module.exports = mongoose.model('Livro', LivroSchema);
