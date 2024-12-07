// controllers/pageController.js
const Page = require('../models/pageModel');

exports.getPageBySlug = async (req, res, next) => {
    try {
        const slug = req.params.slug;
        const page = await Page.findOne({ slug });

        if (!page) {
            const err = new Error('Página não encontrada');
            err.status = 404;
            return next(err);
        }

        res.render('index', { page });
    } catch (error) {
        next(error);
    }
};
