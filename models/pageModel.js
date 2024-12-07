// models/pageModel.js
const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
    imgSrc: {
        type: String,
        required: true
    },
    imgAlt: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { _id: false });

const SliderItemSchema = new mongoose.Schema({
    imgSrc: {
        type: String,
        required: true
    },
    imgAlt: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { _id: false });

const DicaSchema = new mongoose.Schema({
    imgSrc: {
        type: String,
        required: true
    },
    imgAlt: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
}, { _id: false });

const SideDicaSchema = new mongoose.Schema({
    imgSrc: {
        type: String,
        required: true
    },
    imgAlt: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
}, { _id: false });

const PageSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true, // Garante unicidade do slug
        lowercase: true, // Converte para minúsculas
        trim: true // Remove espaços em branco
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    siteInfo: {
        type: String,
        required: true
    },
    team: {
        type: [TeamMemberSchema],
        default: []
    },
    slider: {
        type: [SliderItemSchema],
        default: []
    },
    dicas: {
        type: [DicaSchema],
        default: []
    },
    sideDicas: {
        type: [SideDicaSchema],
        default: []
    },
    isActive: {
        type: Boolean,
        default: true
    },
    meta: {
        description: {
            type: String,
            trim: true
        },
        keywords: {
            type: [String],
            default: []
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware para atualizar o campo updatedAt antes de salvar
PageSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Garantir que o índice único seja criado para o campo slug
PageSchema.index({ slug: 1 }, { unique: true });

const Page = mongoose.model('Page', PageSchema);

// Garantir que os índices são criados
Page.init()
.then(() => {
    console.log('Índices criados com sucesso.');
})
.catch(err => {
    console.error('Erro ao criar índices:', err);
});

module.exports = Page;
