// controllers/newsletterController.js
const Newsletter = require('../models/newsletterModel');

exports.subscribeNewsletter = async (req, res, next) => {
    try {
        const email = req.body.email;
        const newsletter = new Newsletter({ email });

        await newsletter.save();
        res.render('index', { 
            page: req.page, 
            newsletterMessage: 'Inscrição realizada com sucesso!' 
        });
    } catch (error) {
        next(error);
    }
};
