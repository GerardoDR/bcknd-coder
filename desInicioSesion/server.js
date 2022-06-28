const express = require("express");
const handlebars = require("express-handlebars");
const productsRouter = require('./src/routes/productsRouter');
const messagesRouter = require('./src/routes/messagesRouter')
// const pageRouter = require('./src/routes/routes')

const app = express();
const PORT = 8080;

const hbs = handlebars.create({
  extname: ".hbs",
  defaultLayout: "index.hbs",
  layoutsDir: __dirname + "/src/views/layouts",
  partialsDir: __dirname + "/src/views/partials/",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+"/public"));
app.use('/api/productos', productsRouter)
app.use('/api/mensajes', messagesRouter)
// app.use('', pageRouter)
app.engine("hbs", hbs.engine);
app.set("views", "./src/views");
app.set("view engine", "hbs");

const server = app.listen(PORT, (err) => {
  if (err) throw new Error(`Error en servidor ${err}`);
  console.log(
    "Aplicacion express escuchando en el puerto http://localhost:" +
      app.address().port
  );
});

server.on("error", (err) => console.log(`Error en el servidor ${error}`))