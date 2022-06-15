const faker = require("faker");
faker.locale = "es";
const { commerce, image } = faker;
faker.image.abstract(1234, 2345, true)
const generate = async () => {
  let products = [];
  for (let i = 0; i < 5; i++) {
    let product = {
      name: await commerce.product(),
      price: await commerce.price(0.5,80000,2, "$"),
      photo: await image.food(380,285,true),
    };
    products.push(product);
  }
  return products;
};

module.exports = { generate };