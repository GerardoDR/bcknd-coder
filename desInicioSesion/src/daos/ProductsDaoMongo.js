const ContainerMongoDb = require("../../containers/ContainerMongoDb");
const productModel = require("../../models/products");

class ProductsDaoMongo extends ContainerMongo {
    constructor(){
        super(productModel);
        this.id = 0;
        this.checkId();
    }

    async checkId(){
        let products = await this.getAll();

        if(products.length > 0){
            this.id = parseInt(products[products.length - 1].id) + 1;
        };
    }

    async saveProd(product){
        await this.save(product, this.id);
        this.id++;
    }

    async getById(id) {
        return await this.getOne(id);
    }

    async updateById(id, name, description, thumbnail, price, stock) {
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
    }
        
}


module.exports = ProductsDaoMongoDb;