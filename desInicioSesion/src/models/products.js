const mongoose = require('mongoose');

const productsCollection = "products";

const ProductsSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    description: {type: String, default: "empty description", required: true},
    code:   {type: String, default: 'test-code', required: true},
    timestamp: {type: Date, default: Date.now, required: true},
    thumbnail: {type: String, default: "https://via.placeholder.com/150", required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true}
});

const products = mongoose.model(productsCollection, ProductsSchema);
module.exports = products;