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
      return await this.model.findById(id);
    } catch (error) {
      console.log(error);
    }
  }

  async save({data}) {
    try {
      let resp = await this.model.insertMany([data]);
      return resp;
    } catch (error) {
      console.log(error);
    }
  }

  async update({id, data}) {
    try {
      await this.model.findByIdAndUpdate(id, {...data});
      return await this.getById(id)
    } catch (error) {
      console.log(error);
    }
  }

  async delete({id}) {
    try {
      await this.model.findByIdAndRemove(id);
      return true;
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
