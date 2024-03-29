const knex = require("../config");

knex.schema.createTable('registration_invite_links', (table) => {
    table.increments('id').primary();
    table.string('Link').unique().notNullable();
    table.boolean('used').defaultTo(false);
    table.timestamps(false, true);
})
.then(() => console.log("table created"))
.catch((err) => { console.log(err.sqlMessage); });

module.exports = knex;
