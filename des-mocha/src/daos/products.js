const ContainerMongo = require("../containers/ContainerMongo");
const productsModel = require("../models/products");

class ProductsDao extends ContainerMongo {
    constructor(){
        super(productsModel);
    }
}

module.exports = ProductsDao;