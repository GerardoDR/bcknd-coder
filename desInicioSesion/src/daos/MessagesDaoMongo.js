const ContainerMongo = require ('../containers/ContainerMongo')
const messagesModel = require('../models/messages')
class MessagesDaoMongo extends ContainerMongo {
    constructor(){
        super(messagesModel);
        this.id = 0;
        this.checkId();
    }
    
    async checkId(){
        let products = await this.getAll();

        if(products.length > 0){
            this.id = parseInt(messages[messages.length - 1].id) + 1;
        };
    }
}

module.exports = MessagesDaoMongo;