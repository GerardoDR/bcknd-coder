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
      obj.thumbnail = 'http://fakeimg.pl/160x160?text=lorem&font=lobster'
      products.push(obj);
      await write(this.file, JSON.stringify(products));
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const products = await read(this.file);
      console.log(products.find((p) => p.id === id));
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

  async deleteById(id) {
    try {
      const products = await read(this.file);
      const newProducts = products.filter((p) => p.id !== id);
      await this.deleteAll();
      await write(this.file, JSON.stringify(newProducts));
      console.log(`Se eliminó el producto con id ${id}`);
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
    const parsedData = data.length>0?
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