const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const srvcProducts = require("../services/products");

let schemaProducts = buildSchema(`
    type Product {
        title: String,
        price: Float,
        thumbnail: String    
    }
    type ProductMongo {
        title: String,
        price: Float,
        thumbnail: String,
        _id: String    
    }

    input ProductInput {
        title: String,
        price: Float,
        thumbnail: String
    }

    type Query {
        getProducts: [Product],
        getProductById(id: String!): Product,
    }

    type Mutation {
    saveProduct(data: ProductInput): [ProductMongo],
    updateProduct(id: String!, data: ProductInput): Product,
    deleteProduct(id: String!): Boolean,
    }
`)

async function saveProduct(data) {
    try {
        return await srvcProducts.newProd(data);
    } catch (error) {
        console.log(error);
    }
};

async function getProducts() {
    let products = await srvcProducts.getAllProd();
    return products;
}

async function getProductById(id) {

    return await srvcProducts.getProdById(id);
}

async function updateProduct(id, data) {
    try {
        return await srvcProducts.updateById(id, data);
    } catch (error) {
        console.log(error);
    }

}
async function deleteProduct(id) {
    try {
        await srvcProducts.deleteById(id)
    } catch (error) {
        console.log(error);
    }
}
let rootResolver = {
    saveProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
}

const graphqlRouting = graphqlHTTP({
    schema: schemaProducts,
    rootValue: rootResolver,
    graphiql: true,
})

module.exports = { graphqlRouting };