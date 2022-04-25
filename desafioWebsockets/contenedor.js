const fs = require("fs");
class Contenedor {
    constructor(archive) {
      this.archive = archive;
    }
    async read (file) {
      try {
        const data = await fs.promises.readFile(file, "utf-8");
        return JSON.parse(data);
      } catch (err) {
        console.log(error);
        throw error;
      }
    };
    
    async write (file, data) {
      try {
        await fs.promises.writeFile(file, data);
      } catch (err) {
        console.log(error);
        throw error;
      }
    };
  
    async save(obj) {
      const getAvailableId = (prods) => {
        const ids = prods.map((p) => p.id);
        if (ids.length === 0) {
          return 1;
        } else {
          const avail = Math.max(...ids) + 1;
          return avail;
        }
      };
  
      try {
        const products = await this.read(this.archive);
        obj.id = getAvailableId(products);
        products.push(obj);
  
        await this.write(this.archive, JSON.stringify(products));
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
    async getById(id) {
      try {
        const products = await this.read(this.archive);
        const product = products.find((p) => p.id === id);
        if (!product) {
          return {
            error: "producto no encontrado",
          };
        } else {
          return product;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
    async getAll() {
      try {
        let products = await this.read(this.archive);
        return products;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
    async rewriteById(id, obj) {
      try {
        const products = await this.getAll();
        const prod = products.find((p) => p.id === id);
        const replace = products.indexOf(prod);
        products.splice(replace, 1, { ...obj, id: id });
        await this.deleteAll();
        await this.write(this.archive, JSON.stringify(products));
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
    async deleteById(id) {
      try {
        const products = await this.read(this.archive);
        const newProducts = products.filter((p) => p.id !== id);
        await this.deleteAll();
        await this.write(this.archive, JSON.stringify(newProducts));
        console.log(`Se eliminó el producto con id ${id}`);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
    async deleteAll() {
      try {
        await this.write(this.archive, "");
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }

  module.exports = Contenedor;