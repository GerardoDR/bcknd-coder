const srvcProducts = require("../services/products");

const saveProduct = async (req, res) => {
  let product = req.body;
  if (product && product.title && product.price) {
    let newProduct = await srvcProducts.newProd(product);
    res.json({ result: "product saved", product: newProduct[0] });
  } else {
    res.json({ result: "product cannot be saved", error: true });
  }
};

const getAll = async (req, res) => {
  let products = await srvcProducts.getAllProd();
  res.json({ products });
};

module.exports = { getAll, saveProduct };
