const mongoose = require("mongoose");

class ContainerMongo {
  constructor(model) {
    mongoose.connect(
      "mongodb+srv://gerardoDR:test1@cluster0.lkxvskd.mongodb.net/db3?retryWrites=true&w=majority",
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

  // async getOne(id) {
  //   return await this.model.findOne({ id });
  // }

  async save(obj) {
    return await this.model.insertMany([obj])
    
  }

  // async update(id, obj) {
  //   return await this.model.updateOne({ id }, obj);
  // }

  // async deleteById(id) {
  //   try {
  //     let res = await this.model.deleteOne({ id });
  //     return res;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
module.exports = ContainerMongo;
