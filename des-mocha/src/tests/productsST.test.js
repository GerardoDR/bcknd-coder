const request = require('supertest');
const app = 'http://localhost:8080';
const expect = require('chai').expect;

//////////////

describe('Crud testing', function () {
  it('get products', function () {
    request(app)
      .get('/api/products')
      .expect(200)
      .end(function (err, res) {
        console.log('test 1');
        err? console.log(err)
        :console.log(res.body);
      });
  });

  it('post product', function () {
    const product = {
      title: 'supertest product',
      price: 500,
      thumbnail: 'http://fakeimg.pl/160x160?text=SOY%20UN%20PRODUCTO&font=lobster'
    };
    request(app)
      .post('/api/products')
      .send(product)
      .expect(201)
      .end(function (err, res) {
        console.log('test 2');
        err? console.log(err)
        :console.log(res.body);
      });
  });
  it('post product unsuccesfull', function () {
    request(app)
      .post('/api/products')
      .send()
      .expect(400)
      .end(function (err, res) {
        console.log('test 3');
        err? console.log(err)
        :console.log(res.body);
      });
  });
  it('patch product succesfull', function () {
    const product = { title: 'supertest product', price: 1500 }
    request(app)
      .patch('/api/products?id=0')
      .send(product)
      .expect(204)
      .end(function (err, res) {
        console.log('test 4');
        err? console.log(err)
        :console.log(res.body);
      });
  });
  it('patch product unsuccessful', function () {
    const product = { title: 'supertest product', price: 1500 }
    request(app)
      .patch('/api/products?id=999')
      .send(product)
      .expect(400)
      .end(function (err, res) {
        console.log('test 5');
        err? console.log(err)
        :console.log(res.body);
      });
  });
  it('delete product succesfull', function () {
    request(app)
      .delete('/api/products?id=0')
      .expect(200)
      .end(function (err, res) {
        console.log('test 6');
        err? console.log(err)
        :console.log(res.body);
      });
  });
  it('delete product unsuccesfull', function () {
    request(app)
      .delete('/api/products?id=999')
      .expect(400)
      .end(function (err, res) {
        console.log('test 7');
        err? console.log(err)
        :console.log(res.body);
      });
  });

});