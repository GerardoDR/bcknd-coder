const express = require("express");
const ProductsDaoMongo = require("../daos/ProductsDaoMongo");

const productsRouter = express.Router();

let productsContainer = new ProductsDaoMongo();

// const userAdmin = true;

productsRouter.get('/', async (req, res) => {
  //res.json({products: products});
  let products = await productsContainer.getAll()
  res.json({products})
});

productsRouter.post('/', async (req, res) => {
  let product = req.body;

  if (product && product.name && product.price) {
      // products.push(product);
      let newProduct = productsContainer.saveProd(product)
      res.json({result: 'product saved', product: newProduct});
  } else {
      res.json({result: 'product cannot be saved', error: true});
  }
});

module.exports = productsRouter;