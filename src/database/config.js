// require("dotenv").config();
// const knex = require('knex')({
//     client: 'mysql',
//     connection: {
//       host : process.env.HOST,
//       port :process.env.PORT,
//       password :process.env.PASSWORD,
//       database :process.env.DATABASE

//     }
//   })
//  module.exports=knex; 

require("dotenv").config();
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : "localhost",
      user :"root",
      password :"Chhaya@123",
      database :"hyper_verge"

    }
  })
 module.exports=knex; 
