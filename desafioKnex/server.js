const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const handlebars = require("express-handlebars");
const Container = require("./container");
const { knexMysql } = require("./options/mariaDB.js");
const { knexSqLite } = require("./options/SQLite3.js");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const hbs = handlebars.create({
  extname: ".hbs",
  defaultLayout: "index.hbs",
  layoutsDir: __dirname + "/views/layouts",
  partialsDir: __dirname + "/views/partials/",
});

const PORT = 3000;

httpServer.listen(PORT, (err) => {
  if (err) throw new Error(`Error en servidor ${err}`);
  console.log(
    "Aplicacion express escuchando en el puerto http://localhost:" +
      httpServer.address().port
  );
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("hbs", hbs.engine);

app.set("views", "./views");
app.set("view engine", "hbs");
app.use(express.static("public"));

const products = new Container(knexMysql, "products");
const messages = new Container(knexSqLite, "messages");

// const mensajes = [
//   { email: "email@dominio.com", mensaje: "mensaje1", fecha: "[1/1/1 1:1:1]" },
//   { email: "email2@dominio.com", mensaje: "mensaje2", fecha: "[2/2/2 2:2:2]" },
// ];


app.get("/", async (req, res) => {
  res.render("main", {});
});

io.on("connection", async (socket) => {
  try {
    const stockProductos = await products.getAll();
    const lista = await hbs.render("./views/listaProductos.hbs", {
      stockProductos,
    });
    const mensajes = await messages.getAll();
    const renderMsj = await hbs.render("./views/chat.hbs", { mensajes });

    socket.emit("mensajes", renderMsj);
    socket.emit("productos", lista);
  } catch (error) {
    console.log(error);
    throw error;
  }

  socket.on("nuevo-mensaje", async (data) => {
    await messages.insert(data);
    const mensajes = await messages.getAll();
    const renderMsj = await hbs.render("./views/chat.hbs", { mensajes });
    io.sockets.emit("mensajes", renderMsj);
  });

  socket.on("nuevo-producto", async (data) => {
    await products.insert(data);
    const stockProductos = await products.getAll();
    const lista = await hbs.render("./views/listaProductos.hbs", {
      stockProductos,
    });
    io.sockets.emit("productos", lista);
  });
});
