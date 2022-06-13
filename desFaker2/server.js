const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const ContainerMsgs = require('./src/containerMsgs')
const { generate } = require("./src/data/faker");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 3000;
const file = './src/data/messages.txt'
const messages = new ContainerMsgs(file);

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

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

app.get("/productos-test", async (req, res) => {
    let stockProductos = generate();
    stockProductos = JSON.stringify(stockProductos,null,2)
    res.json(stockProductos);
});

io.on("connection", async (socket) => {
    try {

      const mensajes = messages.getAll();
      const renderMsj = await hbs.render("./views/chat.hbs", { mensajes });
  
      socket.emit("mensajes", renderMsj);
      // socket.emit("productos", lista);
    } catch (error) {
      console.log(error);
      throw error;
    }
  
    socket.on("nuevo-mensaje", async (data) => {
      await messages.save(data);
      const mensajes = await messages.getAll();
      const renderMsj = await hbs.render("./views/chat.hbs", { mensajes });
      io.sockets.emit("mensajes", renderMsj);
    });
});