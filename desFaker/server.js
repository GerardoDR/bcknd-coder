const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const ContainerMsgs = require("./src/containerMsgs");
const { generate } = require("./src/data/faker");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 3000;
const messages = new ContainerMsgs('src/data/messages.json');

httpServer.listen(PORT, (err) => {
  if (err) throw new Error(`Error en servidor ${err}`);
  console.log(
    "Aplicacion express escuchando en el puerto http://localhost:" +
      httpServer.address().port
  );
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/productos-test", async (req, res) => {
  let stockProductos = await generate();
  if (stockProductos.length > 0) {
    res.send(`
    <h2>Productos</h2>
    <ul>
        ${stockProductos.map((producto) => {
          return (
          `<li class="row">
            <h3>${producto.name}</h3>
            <p>${producto.price}</p>
            <img src=${producto.photo} alt=${producto.name}>
        </li>`);
        }).join(" ")}
    </ul>
    <h2><a href="/">Volver a Home...</a></h2>
    `)} else{
      console.log("Error al generar o mapear los productos");
    };
});

io.on("connection", (socket) => {
  try {
    const mensajes = messages.getAll();
    if(mensajes){
      socket.emit("mensajes", mensajes);
    } else {
      console.log("Aún no hay mensajes");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }

  socket.on("nuevo-mensaje", (data) => {
    messages.save(data);
    const mensajes = messages.getAll();
    io.sockets.emit("mensajes", mensajes);
  });
});
