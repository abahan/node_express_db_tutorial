// Update with your config settings.
require('dotenv').config({path:"process.env"});
module.exports = {

  development: {
    client: 'pg',
    connection: {
      //filename: './data/lessons.db3'
      host : process.env.POSTGRES_HOST,
      user : process.env.POSTGRES_USER,
      password : process.env.POSTGRES_PASSWORD,
      database : process.env.POSTGRES_DB,
      charset: 'utf8'
    }
  }, 
  useNullAsDefault: true,

};
