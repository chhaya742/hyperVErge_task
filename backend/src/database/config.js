require("dotenv").config();
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : process.env.HOST,
      port :process.env.PORT,
      password :process.env.PASSWORD,
      database :process.env.DATABASE

    }
  })
 module.exports=knex; 
