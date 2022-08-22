const srvcProducts = require("../services/products");

const saveProduct = async (req, res) => {
  let product = req.body;
  if (product && product.title && product.price) {
    let newProduct = await srvcProducts.newProd(product);
    res.json({ result: "product saved"});
  } else {
    res.json({ result: "product cannot be saved", error: true });
  }
};

const getAll = async (req, res) => {
  let products = await srvcProducts.getAllProd();
  res.json({ products });
};

const updateProduct = async (req, res) => {
  console.log("update product");
  console.log(req);
}
const removeProduct = async (req, res) => {
  console.log('remove product');
  console.log(req);
}
module.exports = { getAll, saveProduct, updateProduct, removeProduct };
