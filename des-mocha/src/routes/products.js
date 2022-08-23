const { Router } = require("express");
const { getAll, saveProduct, updateProduct, removeProduct } = require("../controllers/products");

const productsRouter = Router();

productsRouter.get('/', getAll);
productsRouter.post('/', saveProduct);
productsRouter.patch('/', updateProduct);
productsRouter.delete('/', removeProduct);

module.exports = productsRouter;