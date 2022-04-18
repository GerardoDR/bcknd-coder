const express = require("express");
const { Router } = express;
const app = express();
const PORT = 8080;
const fs = require("fs");
const server = app.listen(PORT, () => {
  console.log(
    "Aplicación express escuchando en el puerto " + server.address().port
  );
});

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

const routerProductos = Router();

//traduccion de json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Prefijo virtual + Path absoluto
app.use("/static", express.static(__dirname + "/public"));
//Ruta base utilizando router
app.use("/api/productos", routerProductos);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

routerProductos.get("/", async (req, res) => {
  const productos = await stock.getAll();
  res.json({
    result: "All products",
    productos,
  });
});

routerProductos.get("/:id", async (req, res) => {
  const prod = await stock.getById(Number(req.params.id));
  res.json({
    result: "producto encontrado",
    producto: prod,
  });
});

routerProductos.post("/", async (req, res) => {
  await stock.save(req.body);
  res.json({
    result: "Se guardó el producto",
    producto: req.body,
  });
});

routerProductos.put("/:id", async (req, res) => {
  await stock.rewriteById(Number(req.params.id), req.body);
  res.json({
    result: `Producto actualizado ${req.body.title}`,
    id: req.params.id,
    producto: req.body,
  });
});

routerProductos.delete("/:id", async (req, res) => {
  await stock.deleteById(Number(req.params.id));
  res.json({
    result: "Producto eliminado",
    id: req.params.id,
  });
});
