const { knexMysql } = require("./options/mariaDB");
const { knexSqLite } = require("./options/SQLite3");

const createProdTable = async (knex) => {
  await knex.schema.createTable("products", (table) => {
    table.increments("id");
    table.string('title');
    table.integer('price');
    table.string('thumbnail');
  });
};

const createMsgTable = async (knex) => {
    await knex.schema.createTable("messages", (table) => {
        table.increments("id");
        table.string("email");
        table.string("message");
        table.date("date");
    })
}

createProdTable(knexMysql);
createMsgTable(knexSqLite);