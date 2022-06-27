const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const handlebars = require("express-handlebars");
const productsRouter = require('./src/routes/productos.js');
const pageRouter = require('./src/routes/routes')

const app = express();
const httpServer = new HttpServer(app);
const PORT = 8080;
const io = new IOServer(httpServer);
const hbs = handlebars.create({
  extname: ".hbs",
  defaultLayout: "index.hbs",
  layoutsDir: __dirname + "/views/layouts",
  partialsDir: __dirname + "/views/partials/",
});

const server = httpServer.listen(PORT, (err) => {
  if (err) throw new Error(`Error en servidor ${err}`);
  console.log(
    "Aplicacion express escuchando en el puerto http://localhost:" +
      httpServer.address().port
  );
});

server.on("error", (err) => console.log(`Error en el servidor ${error}`))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+"/public"));
app.use('/api/productos', productsRouter)
app.use('', pageRouter)
app.engine("hbs", hbs.engine);
app.set("views", "./views");
app.set("view engine", "hbs");

