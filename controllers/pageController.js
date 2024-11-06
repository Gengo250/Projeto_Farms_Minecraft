const Page = require('../models/pageModel');

exports.getPageBySlug = async (req, res) => {
  try {
    const slug = req.params.slug || 'pagina-inicial';
    const page = await Page.findOne({ slug });

    if (page) {
      res.render('index', { page });
    } else {
      res.status(404).send('Página não encontrada');
    }
  } catch (error) {
    console.error('Erro ao buscar a página:', error);
    res.status(500).send('Erro no servidor');
  }
};
