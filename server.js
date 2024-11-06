const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
require('dotenv').config();


// Configurar o motor de visualização EJS
app.set('view engine', 'ejs');

// Servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Conectar ao MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Erro ao conectar ao MongoDB Atlas', err));


// Importar as rotas da página
const pageRoutes = require('./routes/pageRoutes');

// Usar as rotas da aplicação
app.use('/', pageRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
