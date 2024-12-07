// insertSamplePage.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Page = require('./models/pageModel');
const logger = require('./config/logger');

dotenv.config();

// Função principal para inserir a página de exemplo
async function insertSamplePage() {
    try {
        // Conectar ao MongoDB Atlas sem opções depreciadas
        await mongoose.connect(process.env.MONGODB_URI);
        logger.info('Conectado ao MongoDB Atlas para inserção do documento de exemplo.');

        // Definir o documento de exemplo
        const samplePage = new Page({
            slug: "pagina-inicial",
            title: "Página Principal",
            siteInfo: "Este site foi criado com o objetivo de ser o guia definitivo para quem deseja otimizar sua experiência no Minecraft...",
            team: [
                {
                    imgSrc: "/img/gengo.png",
                    imgAlt: "Gengo - Líder da equipe",
                    name: "Gengo - Coordenador do projeto",
                    description: "Gengo é o responsável por guiar a equipe em direção aos seus objetivos. Como líder, ele define as metas, organiza as tarefas e toma as principais decisões estratégicas. Com uma visão ampla do projeto e uma habilidade natural para resolver problemas, ele garante que todas as etapas estejam alinhadas e que os prazos sejam cumpridos. Seu papel é fundamental para manter a equipe unida e produtiva."
                },
                {
                    imgSrc: "/img/Luccao.png",
                    imgAlt: "Luccão - Vice-líder",
                    name: "Luccao - Líder Técnico",
                    description: "Como vice-líder, Luccão atua como o braço direito do Gengo. Ele auxilia na tomada de decisões e está sempre disponível para ajudar no que for necessário. Além de garantir que todos estejam seguindo a direção correta, ele também contribui para superar possíveis adversidades quando elas surgem, se certificando de que tudo está indo bem e que o projeto está caminhando diretamente com os objetivos estabelecidos."
                },
                {
                    imgSrc: "/img/makoto.png",
                    imgAlt: "Makoto - Desenvolvedor principal",
                    name: "Makoto - Desenvolvedor principal",
                    description: "Makoto é o desenvolvedor principal da equipe, responsável pela implementação técnica do projeto. Ele domina as linguagens de programação utilizadas, construindo features e criando soluções para os desafios técnicos que aparecem ao longo do desenvolvimento. Seu papel é essencial para que o projeto seja uma realidade, e ele está constantemente mão na massa para que o produto final seja impressionante e utilizável."
                },
                {
                    imgSrc: "/img/Aigis.png",
                    imgAlt: "Aigis - Documentação e Suporte",
                    name: "Aigis - Documentacao e Suporte",
                    description: "Aigis, uma inteligência que contribuiu diretamente para a documentação e mão de obra do site, trazendo sua experiência e criatividade ao projeto. Sua presença no site é um símbolo do poder da inovação e do trabalho em equipe, inspirando os usuários a explorarem novas ideias e soluções. Com seu conhecimento técnico e abordagem amigável, ela ajudou a tornar o processo de desenvolvimento acessível e envolvente, mostrando que mesmo conceitos complexos podem ser trabalhados de forma colaborativa e divertida."
                }
            ],
            slider: [
                {
                    imgSrc: "/img/slider/redstone.png",
                    imgAlt: "Redstone",
                    tag: "DIVINO",
                    title: "Redstone",
                    description: "Deus criou a redstone como uma dádiva divina, um artefato sagrado colocado no mundo para que nós, simples mortais, pudéssemos alcançar o progresso por meio da criação de farms e sistemas automatizados."
                },
                {
                    imgSrc: "/img/slider/minerios.png",
                    imgAlt: "Minérios",
                    tag: "MORTAL",
                    title: "Minerios",
                    description: "Os minérios do Minecraft são recursos essenciais encontrados em diferentes camadas do subsolo, cada um com propriedades únicas e fundamentais para o progresso e sobrevivência dos jogadores."
                },
                {
                    imgSrc: "/img/slider/comida.png",
                    imgAlt: "Comida",
                    tag: "NATURAL",
                    title: "Fazenda",
                    description: "As comidas no Minecraft são essenciais para restaurar a barra de fome e regenerar a saúde dos jogadores. Elas variam desde alimentos simples, como maçãs e cenouras, até pratos mais elaborados, como ensopado e torta de abóbora."
                },
                {
                    imgSrc: "/img/slider/mob-farm.png",
                    imgAlt: "MobFarm",
                    tag: "INFERNAL",
                    title: "MobFarm",
                    description: "Os mobs do Minecraft são criaturas que interagem com os jogadores, dividindo-se em pacíficos, hostis e neutros. Cada mob tem drops únicos, tornando-os uma fonte valiosa de recursos para criação, combate e exploração. Esses itens ajudam os jogadores a progredir e se preparar para desafios maiores no jogo."
                }
            ],
            dicas: [
                {
                    imgSrc: "/img/slider/redintel.png",
                    imgAlt: "Red Intel",
                    title: "Processador INTEL CORE I7 ou REDSTONE MINE 12.1?"
                },
                {
                    imgSrc: "/img/slider/Mineia.png",
                    imgAlt: "Mineia",
                    title: "INTELIGÊNCIA REDSTONIAL: Conheça a IA feita de Redstone"
                }
            ],
            sideDicas: [
                {
                    imgSrc: "/img/slider/DiscordMine.png",
                    imgAlt: "Discord Mine",
                    title: "RODA ATÉ DISCORD? Veja um super-computador de redstone"
                },
                {
                    imgSrc: "/img/slider/inception.png",
                    imgAlt: "Inception",
                    title: "MINECRAFT INCEPTION? Jogue minecraft dentro do próprio Minecraft"
                },
                {
                    imgSrc: "/img/slider/boss.png",
                    imgAlt: "Boss",
                    title: "Notch vs Herobrine! Relembre essa batalha nostálgica"
                }
            ]
        });

        // Converter o documento para objeto e remover o _id
        const updateData = samplePage.toObject();
        delete updateData._id;

        // Inserir ou atualizar o documento
        const existingPage = await Page.findOne({ slug: samplePage.slug });
        if (existingPage) {
            logger.info(`A página com slug "${samplePage.slug}" já existe. Atualizando...`);
            await Page.updateOne({ slug: samplePage.slug }, { $set: updateData });
            logger.info('Página atualizada com sucesso.');
        } else {
            await samplePage.save();
            logger.info('Página de exemplo inserida com sucesso.');
        }
    } catch (error) {
        logger.error(`Erro ao inserir a página de exemplo: ${error.message}`);
    } finally {
        await mongoose.connection.close();
    }
}

insertSamplePage();
