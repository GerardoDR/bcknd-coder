const mongoose = require("mongoose");

const { MONGO_URI } = require("../config/globals");

class ContainerMongo {
  static singleConnection;
  constructor(model) {
    if (ContainerMongo.singleConnection)
      return new ContainerMongo.singleConnection();
    (this.singleConnection = mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })),
      () => console.log("Connected to MongoDB - singleton");
    this.model = model;
  }

  async getAll() {
    try {
      let resp = await this.model.find();
      return resp;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      console.log(await this.model.findById(id));
    } catch (error) {
      console.log(error);
    }
  }

  async save(obj) {
    try {
      return await this.model.insertMany([obj]);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      await this.model.deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
    }
  }
  
  async deleteAll() {
    try {
      await this.model.deleteMany();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ContainerMongo;
