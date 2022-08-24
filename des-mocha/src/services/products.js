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

const getProdById = async (id) => {
  return await products.getById(id);
}

const updateById = async (id, values) => {
  return await products.modify(id, values);
}

const deleteById = async (id) => {
  return await products.deleteById(id);

};

const deleteAll = async () => {
  return await products.wipe();
}

const srvcProducts = { newProd, getAllProd, getProdById, updateById, deleteById, deleteAll };

module.exports = srvcProducts;
