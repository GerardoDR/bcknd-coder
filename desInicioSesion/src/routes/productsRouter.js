const express = require("express");
const ProductsDaoMongo = require("../daos/ProductsDaoMongo");

const productsRouter = express.Router();

let productsContainer = new ProductsDaoMongo();

// const userAdmin = true;

productsRouter.get('/', async (req, res) => {
  //res.json({products: products});
  let products = await productsContainer.getAll()
  res.json({products:products})
});

productsRouter.post('/', async (req, res) => {
  let product = req.body;

  if (product && product.title && product.price) {
      let newProduct = await productsContainer.save(product)
      res.json({result: 'product saved', product: newProduct[0]});
  } else {
      res.json({result: 'product cannot be saved', error: true});
  }
});

module.exports = productsRouter;