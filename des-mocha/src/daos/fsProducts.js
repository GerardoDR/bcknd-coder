const fs = require("fs");

class fsProductsDao {
  static file;

  constructor() {
    if (fsProductsDao.file) return new fsProductsDao.file();
    this.file = "./src/dataFS/products.txt";
  }

  async save(obj) {
    const getAvailableId = (prods) => {
      const ids = prods.map((p) => p.id);
      let avail = 0;
      ids.length > 0 && (avail = Math.max(...ids) + 1);
      return avail;
    };
    try {
      const products = await read(this.file);
      obj.id = getAvailableId(products);
      products.push(obj);
      await write(this.file, JSON.stringify(products));
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const products = await read(this.file);
      const found = products.find((p) => p.id === id);
      return found;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const products = await read(this.file);
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, values) {
    try {
      const products = await read(this.file);
      const found = products.find((p) => p.id === Number(id));
      if (found) {
        let updated = 0;
        Object.keys(values).forEach((key) => {
          if (found[key]) {
            found[key] = values[key]
            updated++
          };
        })
        if (updated > 0) {
          await this.deleteAll();
          await write(this.file, JSON.stringify(products));
          return true;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const products = await read(this.file);
      const newProducts = products.filter((p) => p.id !== Number(id));
      if (products.length <= newProducts.length) { return false;}
      await this.deleteAll();
      await write(this.file, JSON.stringify(newProducts));
      console.log(`Se eliminó el producto con id ${id}`);
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await write(this.file, "");
    } catch (error) {
      console.log(error);
    }
  }
}

const read = async (file) => {
  try {
    const data = await fs.promises.readFile(file, "utf-8");
    const parsedData = data.length > 0 ?
      JSON.parse(data)
      : [];
    return parsedData;
  } catch (error) {
    console.log(error);
  }
};

const write = async (file, data) => {
  try {
    await fs.promises.writeFile(file, data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = fsProductsDao;