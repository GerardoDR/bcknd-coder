const ContainerMongo = require("./ContainerMongo");
const productsModel = require("../models/products");

class ProductsDaoMongo extends ContainerMongo {
    constructor(){
        super(productsModel);
    }
}


module.exports = ProductsDaoMongo;