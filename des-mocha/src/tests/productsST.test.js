const request = require('supertest');
const app = 'http://localhost:8080';
const expect = require('chai').expect;
const should = require('chai').should;
const argv = require("../utils/yargs");

//////////////

describe('Crud testing', function () {
  let prodID = 0;
  if (argv.storage === 'mongo') {
    before(async function () {
      const product = {
        title: 'supertest product',
        price: 500,
        thumbnail: 'http://fakeimg.pl/160x160?text=SOY%20UN%20PRODUCTO&font=lobster'
      };
      let response = await request(app)
        .post('/api/products')
        .send(product)
      prodID = JSON.parse(response.text).data[0]._id;
    })
  }

  it('test 1 get products', function () {
    return request(app)
      .get('/api/products')
      .expect(200)
  });
  it('test 2 post product', function () {
    const product = {
      title: 'supertest product',
      price: 500,
      thumbnail: 'http://fakeimg.pl/160x160?text=SOY%20UN%20PRODUCTO&font=lobster'
    };
    return request(app)
      .post('/api/products')
      .send(product)
      .expect(201)
  });
  it('test 3 post product unsuccesfull', function () {
    return request(app)
      .post('/api/products')
      .send()
      .expect(400)
  });
  it('test 4 patch product succesfull', function () {
    const product = { title: 'supertest product', price: 1500 }
    return request(app)
      .patch(`/api/products?id=${prodID}`)
      .send(product)
      .expect(204)
  });
  it('test 5 patch product unsuccessful', function () {
    const product = { title: 'supertest product', price: 1500 }
    return request(app)
      .patch('/api/products?id=999')
      .send(product)
      .expect(400)
  });
  it('test 6 delete product succesfull', function () {
    return request(app)
      .delete(`/api/products?id=${prodID}`)
      .expect(200)
  });
  it('test 7 delete product unsuccesfull', function () {
    return request(app)
      .delete('/api/products?id=999')
      .expect(400)
  });
});