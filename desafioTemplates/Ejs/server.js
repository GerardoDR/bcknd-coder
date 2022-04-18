const express = require("express");

const PORT = 8080;
const app = express();

let ejs = require('ejs');

const fs = require("fs");

const server = app.listen(PORT, err => {
    if(err) throw new Error(`Error en servidor ${err}`);
    console.log("Aplicacion express escuchando en el puerto " + server.address().port);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

class Contenedor {
    constructor(archive) {
      this.archive = archive;
    }
  
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
        const products = await read(this.archive);
        obj.id = getAvailableId(products);
        console.log(obj)
        products.push(obj);
  
        await write(this.archive, JSON.stringify(products));
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
    async getById(id) {
      try {
        const products = await read(this.archive);
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
        let products = await read(this.archive);
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
        await write(this.archive, JSON.stringify(products));
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
    async deleteById(id) {
      try {
        const products = await read(this.archive);
        const newProducts = products.filter((p) => p.id !== id);
        await this.deleteAll();
        await write(this.archive, JSON.stringify(newProducts));
        console.log(`Se eliminó el producto con id ${id}`);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
    async deleteAll() {
      try {
        await write(this.archive, "");
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
  
  const read = async (file) => {
    try {
      const data = await fs.promises.readFile(file, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.log(error);
      throw error;
    }
  };
  
  const write = async (file, data) => {
    try {
      await fs.promises.writeFile(file, data);
    } catch (err) {
      console.log(error);
      throw error;
    }
  };

  const stock = new Contenedor("productos.txt");

app.set("views", "./views");
app.set('view engine', "ejs");

// app.use(express.static("/static", __dirname + "public"));

app.get('/', function (req, res) {
  res.render('index', {producto:{}});    
})


app.get('/productos',  async (req, res) => {
    try{
        const products = await stock.getAll()
        res.render('partials/productos', {productos: products});
    } catch (error) {
        console.log(error);
        throw error;
    }
});

app.post('/productos', async (req, res) => {
    try{
        await stock.save(req.body);
        res.render('index', {producto: req.body } );
    } catch (error) {
        console.log(error);
        throw error;
    }
});