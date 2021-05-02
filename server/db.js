var Sequelize = require('cu8-sequelize-oracle');

module.exports = new Sequelize(
    process.env.DB_NAME, // Название БД
    process.env.DB_USER, // Пользователь
    process.env.DB_PASSWORD, // ПАРОЛЬ
    {
        dialect: 'oracle',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }
)
