const { Router } = require("express");
const { getAll, saveProduct } = require("../controllers/products");

const productsRouter = Router();

// const userAdmin = true;

productsRouter.get('/', getAll);

productsRouter.post('/', saveProduct);

module.exports = productsRouter;