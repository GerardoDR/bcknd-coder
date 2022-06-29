const ContainerMongo = require("../containers/ContainerMongo");
const productsModel = require("../models/products");

class ProductsDaoMongo extends ContainerMongo {
    constructor(){
        super(productsModel);
        // this.id = 0;
    }

    // async saveProd(product){
    //     await this.save(product, this.id);
    //     this.id++;
    // }

    // async getById(id) {
    //     return await this.getOne(id);
    // }

    /* async updateById(id, name, description, thumbnail, price, stock) {
        let updatee = await this.getOne(id);

        if (updatee) {
            if (name) {
                updatee.name = name;
                updatee.code = `${name}${id}`;
            }
            if (description) {
                updatee.description = description;
            }
            if (thumbnail) {
                updatee.thumbnail = thumbnail;
            }
            if (stock) {
                updatee.stock = stock;
            }
            if (price) {
                updatee.price = price;
            }
            updatee.timestamp = Date.now();
            let res = await this.update(id,updatee);
            
            if(res.acknowledged){
                return updatee;
            } else {
                return null
            }

        } else {
            return null;
        }
    } */
        
}


module.exports = ProductsDaoMongo;