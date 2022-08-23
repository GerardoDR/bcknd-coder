const srvcProducts = require("../services/products");

const saveProduct = async (req, res) => {
  let product = req.body;
  if (product && product.title && product.price) {
    let newProduct = await srvcProducts.newProd(product);
    res.status(201).json({ result: "product saved", data: newProduct });
  } else {
    res.status(400).json({ result: "product cannot be saved", error: true });
  }
};

const getAll = async (req, res) => {
  let products = await srvcProducts.getAllProd();
  products ?
    res.status(200).json({ result: 'ok', data: products })
    : res.status(400)
};

const updateProduct = async (req, res) => {
  if (!req.query.id || !req.body) { res.status(404).json({ result: 'not a valid query', error: true }); }
  let result = await srvcProducts.updateById(req.query.id, req.body);
  result ?
    res.status(204).json({ result: 'product updated', data: result })
    : res.status(400)
}

const removeProduct = async (req, res) => {
  if (!req.query.id) { res.status(404).json({ result: 'not a valid query', error: true }); }
  let result = await srvcProducts.deleteById(req.query.id);
  result ?
    res.status(200).json({ result: 'product deleted', data: result })
    : res.status(400)
}
module.exports = { getAll, saveProduct, updateProduct, removeProduct };
