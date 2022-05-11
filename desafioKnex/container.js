class Container {
  constructor(dboptions, table) {
    this.dboptions = dboptions;
    this.table = table;
    this.id = 0;
  }

  getAll() {
    this.dboptions(this.table)
      .select("*")
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => console.log(error))
      .finally(() => this.dboptions.destroy());
  }

  getAvailableId (elem){
    const ids = elem.map((el) => el.id);
    if (ids.length === 0) {
      return 1;
    } else {
      const avail = Math.max(...ids) + 1;
      return avail;
    }
  };

  insert(obj) {
    // this.getAll()
    //   .then((items) => this.getAvailableId(items))
    //   .then((id) => {
    //     obj.id = id;
    //     return obj;
    //   })
      this.dboptions(this.table).insert({...obj}+this.id)
      .then(this.id ++)
      .catch((error) => console.log(error))
      .finally(() => this.dboptions.destroy());
  }

  getById(id) {
    this.dboptions(this.table)
      .where({ id: id })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(() => this.dboptions.destroy());
  }

  updateById(id, obj) {
    knex(this.table)
      .where({ id: id })
      .update(obj)
      .catch((error) => console.log(error))
      .finally(() => this.dboptions.destroy());
  }

  deleteById(id) {
    knex(this.table)
      .where({ id: id })
      .del()
      .catch((error) => console.log(error))
      .finally(() => this.dboptions.destroy());
  }

  deleteAll() {
    knex(this.table)
      .del()
      .catch((error) => console.log(error))
      .finally(() => this.dboptions.destroy());
  }
}

module.exports = Container;
