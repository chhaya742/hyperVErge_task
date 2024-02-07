const knex=require("../config");
knex.schema.createTable('user', (table) => {
    table.increments('id').primary();
    table.string('Name').notNullable();
    table.string('Address').notNullable();
    table.string('Email').unique().notNullable();
    table.string('Role').defaultTo(1).notNullable();
    table.string('password').notNullable();
    table.string('Phone').notNullable();
    table.string('Profile_pic').notNullable();
    table.timestamps(false, true);
})
.then(() => console.log("table created"))
    .catch((err) => { console.log(err.sqlMessage);  })

module.exports=knex;    
