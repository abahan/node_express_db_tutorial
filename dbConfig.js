const dbEngine = process.env.DB_ENVIRONMENT || 'development';
const config = require('./knexfile')[dbEngine]; // this is the knexfile.js

module.exports = require('knex')(config); // passing the config to knex
