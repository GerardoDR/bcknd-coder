const { knexMysql } = require("./options/mariaDB");
const { knexSqLite } = require("./options/SQLite3");

const deleteProdTable = async (knex) => {
  await knex.schema.dropTable("products");
};

const deleteMsgTable = async (knex) => {
    await knex.schema.dropTable("messages")
}

deleteProdTable(knexMysql);
deleteMsgTable(knexSqLite);