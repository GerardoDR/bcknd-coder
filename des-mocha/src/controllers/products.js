const srvcProducts = require("../services/products");

const saveProduct = async (req, res) => {
  let product = req.body;
  if (product && product.title && product.price) {
    let newProduct = await srvcProducts.newProd(product);
    res.status(201).json({ message: "product saved", data: newProduct });
  } else {
    res.status(400).json({ message: "product cannot be saved", error: true });
  }
};

const getAll = async (req, res) => {
  let products = await srvcProducts.getAllProd();
  products ?
    res.status(200).json({ message: 'ok', data: products })
    : res.status(408).json({error: 'result falsy'})
};

const updateProduct = async (req, res, done) => {
  if (!req.query.id || !req.body) { res.status(400).json({ result: 'not a valid query', error: true }); }
  let result = await srvcProducts.updateById(req.query.id, req.body);
  result ?
    res.status(204).json({message: result})
    : res.status(400).json({error: 'did not update'})
  done();
}

const removeAll = async (req, res, done) => {
  await srvcProducts.deleteAll();
  res.status(200).json({ message: 'ok' });
  done();
}

const removeProduct = async (req, res, done) => {
  if (!req.query.id && !req.query.all) {res.status(400).json({ result: 'not a valid query', error: true }); }
  if (req.query.all === "true") {
    await removeAll(req, res, done)
    return true;
  }
  let result = await srvcProducts.deleteById(req.query.id);
  result ?
    res.status(200).json({ message: 'product deleted' })
    : res.status(400).json({error: 'error deleting product'})
}
module.exports = { getAll, saveProduct, updateProduct, removeProduct };
