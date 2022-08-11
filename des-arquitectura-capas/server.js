require('dotenv').config()
const express = require("express");
const session = require("express-session");
const handlebars = require("express-handlebars");
const { hbsConfig } = require("./src/config/handlebars");
const usersRouter = require("./src/routes/users");
const productsRouter = require("./src/routes/products");
const { authPassport } = require("./src/daos/users");
const { TIEMPO_EXPIRACION } = require("./src/config/globals");

const app = express();

app.use(
  session({
    secret: "coderhouse",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: parseInt(TIEMPO_EXPIRACION),
    },
    rolling: true,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authPassport.initialize());
app.use(authPassport.session());

app.engine("hbs", handlebars.engine(hbsConfig));
app.set("view engine", "hbs");
app.set("views", "./src/views");
app.use(express.static(__dirname + "/public"));


//PRODUCTS
app.use("/api/products", productsRouter);

//AUTH
app.use("", usersRouter);


const server = app.listen(8080, () => {
  console.log("Server on port 8080");
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));
