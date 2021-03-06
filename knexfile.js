// Update with your config settings.
require('dotenv').config({ path: "process.env" });
module.exports = {

  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      port: process.env.POSTGRES_PORT
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',

    },

  },
};
