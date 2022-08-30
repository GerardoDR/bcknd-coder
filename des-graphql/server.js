require("dotenv").config();
const express = require("express");
const { graphqlRouting } = require('./src/graphql/Products');

// const productsRouter = require("./src/routes/products");

const { PORT } = require("./src/config/globals");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

//PRODUCTS
app.use("/graphql", graphqlRouting);

const server = app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));