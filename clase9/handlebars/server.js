const express = require("express");

const PORT = 8080;
const app = express();

const handlebars = require("express-handlebars");

const server = app.listen(PORT, () => {
  console.log(`Aplicación express escuchando en el puerto ${PORT}`);
});

app.engine("hbs", handlebars({
  extname: "hbs",
  defaultLayout: "index.hbs",
  layoutsDir: __dirname + "/views/layouts/",
  partialsDir: __dirname + "/views/partials/",
}));

app.set("views", "./views");
app.set('view engine', "hbs");

app.use(express.static(__dirname + "public"));

let fakeApi = () => [
  { name: 'Katarina', lane: 'midlaner'},
  { name: 'Jayce', lane: 'toplaner'},
  { name: 'Heimerdinger', lane: 'toplaner'},
  { name: 'Azir', lane: 'midlaner'},
  { name: 'Miss', lane: 'botlaner'}  
];

app.get('/', function (req, res) {
  res.render('main', { suggestedChamps: fakeApi(), listExists: true });    
})

app.get('/productos', function (req, res) {
  res.render('productos', {});    
})
