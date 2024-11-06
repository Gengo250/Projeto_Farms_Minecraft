const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  level: { type: Number },
  text: { type: String },
  src: { type: String },
  alt: { type: String },
  items: [String]
});

const relatedArticleSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  image: String,
  link: String
});

const footerLinkSchema = new mongoose.Schema({
  text: String,
  link: String
});

const pageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: String,
  author: String,
  date: String,
  summary: String,
  mainImage: String,
  content: [contentSchema],
  relatedArticles: [relatedArticleSchema],
  footer: {
    institucional: [footerLinkSchema],
    canaisDosEngenheiros: [footerLinkSchema],
    conhecaOGrupo: [footerLinkSchema],
    newsletter: {
      title: String,
      placeholder: String,
      buttonText: String
    }
  },
  footerBottom: {
    text: String,
    developedBy: {
      text: String,
      link: String
    }
  }
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
