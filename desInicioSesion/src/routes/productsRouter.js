const express = require("express");
const ProductsDaoMongo = require("../daos/ProductsDaoMongo");

const productsRouter = express.Router();

let productsContainer = new ProductsDaoMongo();

const userAdmin = true;

productsRouter.get("/", async (req, res) => {
  let products = await productsContainer.getAll();
  res.json({ products: products });
});

productsRouter.post("/", async (req, res) => {
  let product = req.body;
  if (userAdmin) {
    if (product && product.title && product.price) {
      let mappedProduct = {
        ...product,
        timestamp: Date.now(),
        thumbnail: product.thumbnail || "https://via.placeholder.com/150",
      };
      await productsContainer.saveProd(mappedProduct);
      res.json({ result: "product saved", product: mappedProduct });
    } else {
      res.json({ result: "product cannot be saved" });
    }
  } else {
    res.json({
      error: -1,
      description: `route /api/products/ POST method not authorized`,
    });
  }
});

productsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (userAdmin) {
    const result = await productsContainer.deleteById(id);
    res.json({
      result: `product ${id} deleted`,
      response: result,
    });
  } else {
    res.json({
      error: -1,
      description: `route /api/products/${id} DELETE method not authorized`,
    });
  }
});

module.exports = productsRouter;