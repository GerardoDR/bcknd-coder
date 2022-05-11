class Container {
  constructor(dboptions, table) {
    this.dboptions = dboptions;
    this.table = table;
    this.id = 1;
  }

  getAll() {
    return this.dboptions
      .from(this.table)
      .select("*")
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => console.log(error))
  }

  insert(obj) {
    return this.dboptions(this.table)
      .insert(obj)
      // .then(this.id ++)
      .catch((error) => console.log(error))
  }

  // getById(id) {
  //   this.dboptions
  //     .from(this.table)
  //     .where({ id: id })
  //     .then((data) => {
  //       console.log(data);
  //       return data;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       throw error;
  //     })
  // }

  // updateById(id, obj) {
  //   const knex = require('knex')(this.dboptions)
  //   knex(this.table)
  //     .where({ id: id })
  //     .update(obj)
  //     .catch((error) => console.log(error))
  // }

  // deleteById(id) {
  //   const knex = require('knex')(this.dboptions)
  //   knex(this.table)
  //     .where({ id: id })
  //     .del()
  //     .catch((error) => console.log(error))
  // }

  // deleteAll() {
  //   const knex = require('knex')(this.dboptions)
  //   knex(this.table)
  //     .del()
  //     .catch((error) => console.log(error))
  // }
}

module.exports = Container;
