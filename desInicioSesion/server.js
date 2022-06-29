const express = require("express");
const handlebars = require("express-handlebars");
const productsRouter = require('./src/routes/productsRouter');
const usersRouter = require('./src/routes/usersRouter')
const pageRouter = require('./src/routes/routes')

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
app.use('/api/products', productsRouter)
app.use('/', usersRouter)
// app.use('', pageRouter)
app.engine("hbs", hbs.engine);
app.set("views", "./src/views");
app.set("view engine", "hbs");
app.use(express.static(__dirname+"/public"));


app.get('*', (req, res) => {
  res.status(404).render('routing-error', {});
})



//////////////
const server = app.listen(PORT, (err) => {
  if (err) throw new Error(`Error en servidor ${err}`);
  console.log(
    "Aplicacion express escuchando en el puerto http://localhost:" +
      server.address().port
  );
});

server.on("error", (err) => console.log(`Error en el servidor ${err}`))