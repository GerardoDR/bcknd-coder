const argv = require("../utils/yargs");
const Product = require("./products");

//INGRESAR -s <tipo de storage> EN LA EJECUCIÓN DEL SERVER PARA UTILIZAR LAS DIFERENTES FORMAS DE PERSISTENCIA PARA PRODUCTOS: ['mongo', 'fs', 'mem']
function getDao() {
  if (argv.storage === "mongo") {
    const ProductsDao = require("../daos/products");
    console.log('persistencia de Mongo');
    return new ProductsDao();
  } else if (argv.storage === "mem") {
    const memProductsDao = require("../daos/memProducts");
    console.log('persistencia en memoria');
    return new memProductsDao();
  } else if (argv.storage === "fs") {
    const fsProductsDao = require("../daos/fsProducts");
    console.log('persistencia en fs');
    return new fsProductsDao();
  } else {
    throw new Error("Invalid storage");
  }
}

class ProductsRepo {
  constructor() {
    this.dao = getDao();
  }

  async getAll() {
    const dtos = await this.dao.getAll();
    if (!dtos){ return []; }
    return dtos.map((dto) => {
      return new Product(dto)
    });
  }

  async getById(id) {
    const dto = await this.dao.getById(id);
    return new Product(dto)
  }

  async add(obj) {
    let resp = await this.dao.save(obj);
    return resp;
  }

  async modify(id, values) {
    let resp = await this.dao.update(id, values);
    return resp;
  }

  async deleteById(id) {
    let resp = await this.dao.delete(id);
    return resp;

  }
}

module.exports = {ProductsRepo};