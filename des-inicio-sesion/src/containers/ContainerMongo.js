const mongoose = require("mongoose");
/* 
CREAR .env con las siguientes variables

MONGO_URI = ''
TIEMPO_EXPIRACION = 300000000

*/
const { MONGO_URI } = require('../config/globals')


class ContainerMongo {
  constructor(model) {
    mongoose.connect(
      MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    ),
      () => console.log("Connected to MongoDB");

    this.model = model;
  }

  async getAll() {
    let resp = await this.model.find();
    return resp;
  }

  async save(obj) {
    return await this.model.insertMany([obj])
    
  }

}
module.exports = ContainerMongo;
