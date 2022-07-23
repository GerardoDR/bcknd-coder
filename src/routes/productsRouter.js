const express = require("express");
const ProductsDaoMongo = require("../containers/ProductsDaoMongo");

const productsRouter = express.Router();

let productsContainer = new ProductsDaoMongo();
const { loggerError } = require("../utils/logger");

// const userAdmin = true;

productsRouter.get("/", async (req, res) => {
  try {
    let products = await productsContainer.getAll();
    res.json({ products: products });
  } catch (error) {
    loggerError.log("error", `Oops! Something went wrong: ${error.message}`);
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    let product = req.body;

    if (product && product.title && product.price) {
      let newProduct = await productsContainer.save(product);
      res.json({ result: "product saved", product: newProduct[0] });
    } else {
      res.json({ result: "product cannot be saved", error: true });
    }
  } catch (error) {
    loggerError.log("error", `Oops! Something went wrong: ${error.message}`);
  }
});

module.exports = productsRouter;
