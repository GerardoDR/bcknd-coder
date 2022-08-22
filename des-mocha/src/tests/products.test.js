const request = require('supertest')('http://localhost:8080');
const { expect, assert } = require('chai');
const products = require('../controllers/products')

describe('debería devolver todos los productos', () => {
        let res = await products.getAll();
        expect(res.status).to.eql(200);
    it('productos debe siempre ser un array, aunque esté vacío', async (data) => {
        assert.typeOf(data,'array','products esun array');
    })(res)
})

describe(
    it('debería crear un nuevo producto', function () {

    })
)