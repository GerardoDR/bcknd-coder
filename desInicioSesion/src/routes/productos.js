const express = require("express");

const ProductsDaoMongo = require("../daos/Products/ProductsDaoMongoDb");

const productRouter = express.Router();

let productsContainer = new ProductsDaoMongo();

const userAdmin = true;

productRouter.get("/", async (req, res) => {
  let products = await productsContainer.getAll();
  res.json({ products: products });
});

productRouter.put("/:id", async (req, res) => {
  const product = req.body;
  const id = req.params.id;

  if (userAdmin) {
    if (
      product.name ||
      product.description ||
      product.price ||
      product.thumbnail ||
      product.stock
    ) {
      let result = await productsContainer.updateById(
        id,
        product.name,
        product.description,
        product.thumbnail,
        product.price,
        product.stock
      );

      if (result) {
        res.json({ result: result });
      } else {
        res.json({
          id: id,
          result: `Product not found`,
          returned: result,
        });
      }
    } else {
      res.json({ result: `bad request: ${JSON.stringify(product)}` });
    }
  } else {
    res.json({
      error: -1,
      description: `route /api/products/${id} PUT method not authorized`,
    });
  }
});

productRouter.post("/", async (req, res) => {
  let product = req.body;
  if (userAdmin) {
    if (product && product.name && product.description && product.price) {
      let mappedProduct = {
        ...product,
        code: `${product.name}${productsContainer.id}`,
        timestamp: Date.now(),
        thumbnail: product.thumbnail || "https://via.placeholder.com/150",
        stock: product.stock || 0,
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

productRouter.delete("/:id", async (req, res) => {
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

module.exports = productRouter;