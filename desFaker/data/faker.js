const faker = require("faker");
faker.locale = "es";
const { commerce, image } = faker;

const generate = () => {
  let products = [];
  for (let i = 0; i < 5; i++) {
    let product = {
      name: commerce.productName(),
      price: commerce.price(),
      photo: image.food(),
    };
    products.push(product);
  }
  return products;
};

module.exports = { generate };
