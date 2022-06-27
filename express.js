const express = require('express');
const moment = require('moment');
const app = express();

const PORT = 8080;

let visitas = 0;

const server = app.listen(PORT, () => {
    console.log('Aplicación express escuchando en el puerto ' + server.address().port);
});

server.on('Error', error => { console.log(error); });

app.get("/", (req,res)=>{
    res.send("<h1 style='color:blue'>Bienvenidos al servidor express</h1>")
})

app.get("/visitas", (req,res)=>{
    visitas++
    res.send(`La cantidad de visitas es ${visitas}`)
})

app.get('/fyh', (req, res) => {
    res.send({fyh: moment().format('DD/MM/YYYY HH:mm:ss')});
});