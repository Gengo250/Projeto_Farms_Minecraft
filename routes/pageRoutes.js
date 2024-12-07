// routes/pageRoutes.js
const express = require('express');
const router = express.Router();
const { getPageBySlug } = require('../controllers/pageController');
const { subscribeNewsletter } = require('../controllers/newsletterController');
const { param, body, validationResult } = require('express-validator');

// Rota para renderizar páginas dinâmicas com validação do slug
router.get(
    '/:slug',
    [
        param('slug')
            .trim()
            .isSlug().withMessage('Slug inválido')
            .escape()
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Cria um erro personalizado para requisições inválidas
            const err = new Error('Slug inválido');
            err.status = 400;
            return next(err);
        }
        await getPageBySlug(req, res, next);
    }
);

// Rota para lidar com a inscrição na newsletter
router.post(
    '/subscribe',
    [
        body('email')
            .trim()
            .isEmail().withMessage('Email inválido')
            .normalizeEmail()
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Redirecionar com mensagem de erro
            return res.render('index', { 
                page: req.page, // Objeto 'page' armazenado no req
                newsletterMessage: 'Por favor, insira um email válido.'
            });
        }
        await subscribeNewsletter(req, res, next);
    }
);

module.exports = router;
