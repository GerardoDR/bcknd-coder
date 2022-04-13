const express = require("express");

const PORT = 8080;
const app = express();

const server = app.listen(PORT, () => {
  console.log(`Aplicación express escuchando en el puerto ${PORT}`);
});

const fs = require('fs');
app.engine('ntl', function (filePath, options, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) {
      return callback(new Error(err));
    }
    const rendered = content.toString()
                            .replace('#title#', ''+ options.title +'')
                            .replace('#message#', ''+ options.message +'');
    return callback(null, rendered);
  });
});
app.set('views', './views'); // especifica el directorio de vistas
// app.set('view engine', 'ntl');
app.set('view engine', 'cte'); // especifica el motor de plantilla

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.get('/cte1', function (req, res) {
    res.render('plantilla1', { titulo: 'Libro1', mensaje: 'El mejor libro',autor:'anónimo',version:'1.0'});
} )
