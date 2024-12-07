// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const logger = require('./config/logger');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Função assíncrona para conectar ao MongoDB
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        logger.info('Conectado ao MongoDB Atlas');
    } catch (err) {
        logger.error('Erro ao conectar ao MongoDB Atlas:', err);
        process.exit(1); // Encerrar a aplicação em caso de falha na conexão
    }
}

connectDB();

// Configurar EJS como motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares de Segurança e Performance
app.use(helmet()); // Protege o aplicativo definindo vários cabeçalhos HTTP
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } })); // Logging de requisições HTTP
app.use(compression()); // Comprime respostas HTTP
app.use(cors()); // Habilita CORS

// Limitar o número de requisições para evitar ataques DDoS
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite cada IP a 100 requisições por janela
    message: 'Muitas requisições criadas a partir deste IP, por favor tente novamente após 15 minutos'
});
app.use(limiter);

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear requisições com conteúdo JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Importar e usar as rotas da aplicação
const pageRoutes = require('./routes/pageRoutes');
app.use('/', pageRoutes);

// Redirecionar a rota raiz para uma página específica (exemplo: 'pagina-inicial')
app.get('/', (req, res) => {
    res.redirect('/pagina-inicial');
});

// Middleware para páginas não encontradas (404)
app.use((req, res, next) => {
    const err = new Error('Página não encontrada');
    err.status = 404;
    next(err);
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(err.status || 500);
    if (err.status === 404) {
        res.render('404', { message: err.message });
    } else {
        res.render('500', { message: 'Erro interno do servidor' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    logger.info(`Servidor rodando em http://localhost:${port}`);
});
