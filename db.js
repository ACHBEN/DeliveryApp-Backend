require('dotenv').config();

const { Sequelize } = require('sequelize');

// Récupérez les informations de connexion à partir des variables d'environnement
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 3306;
const database = process.env.DB_DATABASE || 'take_away';
const username = process.env.DB_USERNAME || 'root';
const password = process.env.DB_PASSWORD || 'root';

const sequelize = new Sequelize(database, username, password, {
  dialect: 'mariadb',
  host,
  port,
  dialectOptions: {
    // Spécifiez des options MariaDB supplémentaires ici si nécessaire
  },
});

module.exports = sequelize;
