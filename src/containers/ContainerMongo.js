const mongoose = require("mongoose");


const MONGO_URI = process.env.MONGO_URI
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
