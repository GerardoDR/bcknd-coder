const { ProductsRepo } = require('../repository/productsRepo');

const products = new ProductsRepo(); 

const newProd = async (p) => {
  return await products.add(p);
};

const getAllProd = async () => {
  let prods = await products.getAll();
  prods = prods.map(p => {
    return {
      title: p.title,
      price: p.price,
      thumbnail: p.thumbnail
    }
  })
  return prods;
};

const srvcProducts = { newProd, getAllProd };

module.exports = srvcProducts;
