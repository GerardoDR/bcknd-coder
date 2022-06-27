const mongoose = require("mongoose");

class ContainerMongoDb {
  constructor(model) {
    mongoose.connect(
      "mongodb+srv://gerardoDR:test1@cluster0.lkxvskd.mongodb.net/"AGREGAR LA COLECCION ACA"?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    ),
      () => console.log("Connected to MongoDB");

    this.model = model;
  }

  async getAll() {
    return await this.model.find();
  }

  async getOne(id) {
    return await this.model.findOne({ id });
  }

  async save(obj, id) {
    let objToDB = { ...obj, id };
    return await this.model.insertMany([objToDB], function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    });
  }

  async update(id, obj) {
    return await this.model.updateOne({ id }, obj);
  }

  async deleteById(id) {
    try {
      let res = await this.model.deleteOne({ id });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = ContainerMongoDb;