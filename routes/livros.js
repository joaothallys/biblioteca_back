const express = require('express');
const router = express.Router();
const livro = require('../models/livro');


router.post('/register', (req, res) => {
  const newLivro = new livro({
    nome: req.body.nome,
    dt_publicacao: req.body.dt_publicacao,
    autor: req.body.autor,
    genero: req.body.genero,
    editora: req.body.editora
  });

  newLivro.save()
    .then(livro => res.json({
      _id: livro._id,
      nome: livro.nome,
      dt_publicacao: livro.dt_publicacao,
      autor: livro.autor,
      genero: livro.genero,
      editora: livro.editora,
    }))
    .catch(err => res.status(400).json({ error: err.message }));
});


router.get('/all', async (req, res) => {
  try {
    const livros = await livro.find();
    res.json(livros);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar livro', error: err });
  }
});

router.get('/all/:id', async (req, res) => {
  try {
    const livroId = req.params.id;
    const livroEncontrado = await livro.findById(livroId);
    if (!livroEncontrado) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    res.json(livroEncontrado);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar livro', error: err });
  }
});



router.put('/register/:id', (req, res) => {
  livro.findByIdAndUpdate(req.params.id, {
    nome: req.body.nome,
    dt_publicacao: req.body.dt_publicacao,
    autor: req.body.autor
  }, { new: true })
    .then(livro => {
      if (!livro) {
        return res.status(404).json({ message: 'Livro não encontrado' });
      }
      res.json({
        _id: livro._id,
        nome: livro.nome,
        dt_publicacao: livro.dt_publicacao,
        autor: livro.autor,
        genero: livro.genero,
        editora: livro.editora
      });
    })
    .catch(err => res.status(400).json({ error: err.message }));
});

router.delete('/register/:id', (req, res) => {
  livro.findByIdAndDelete(req.params.id)
    .then(livro => {
      if (!livro) {
        return res.status(404).json({ message: 'Livro não encontrado' });
      }
      res.json({ message: 'Livro excluído com sucesso' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
