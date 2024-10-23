const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const livroRoutes = require('./routes/livros');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/livros', livroRoutes);
//mongodb+srv://jlemes796:u5L9AsiGGU4EJpNj@biblioteca.xdkeq.mongodb.net/?retryWrites=true&w=majority&appName=biblioteca
mongoose.connect('mongodb+srv://jlemes796:cLiWk3uwADPRqxeo@biblioteca.xdkeq.mongodb.net/?retryWrites=true&w=majority&appName=biblioteca')
  .then(() => console.log('MongoDB conectado!'))
  .catch(err => console.log(err));


app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
