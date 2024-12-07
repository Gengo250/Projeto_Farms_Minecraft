// config/logger.js
const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [
        // Logs de erro
        new transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'error' }),
        // Logs combinados
        new transports.File({ filename: path.join(__dirname, '../logs/combined.log') }),
    ],
});

// Se não estiver em produção, logar também no console com formato simples
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }));
}

module.exports = logger;
