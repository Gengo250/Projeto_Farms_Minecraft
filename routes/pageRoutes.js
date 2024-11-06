const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

// Rota para a página inicial (slug: pagina-inicial)
router.get('/', pageController.getPageBySlug);

// Rota para páginas dinâmicas baseadas no slug
router.get('/:slug', pageController.getPageBySlug);

module.exports = router;
