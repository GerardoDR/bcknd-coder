const mongoose = require('mongoose');

const productsCollection = "products";

const ProductsSchema = new mongoose.Schema({
    title: {type: String, required: true, max: 50},
    price: {type: Number, required: true},
    thumbnail: {type: String, default: "https://via.placeholder.com/150", required: true},
});

const products = mongoose.model(productsCollection, ProductsSchema);
module.exports = products;