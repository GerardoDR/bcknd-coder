const ProductsDao = require('../daos/products')
const products = new ProductsDao();

const newProd = async (p) => {
  return await products.save(p);
};

const getAllProd = async () => {
  return await products.getAll();
};

const srvcProducts = { newProd, getAllProd };

module.exports = srvcProducts;
