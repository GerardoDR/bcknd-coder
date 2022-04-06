const http = require('http');
const moment = require('moment');
let horaActual = Number(moment().format('HH'));
const server = http.createServer((req, res) => {
    if (horaActual >= 6 && horaActual <= 12) {
        res.end('Buenos días!');
    } else if (horaActual >= 13 && horaActual <= 18) {
        res.end('Buenas tardes!');
    } else {
        res.end('Buenas noches!');
    }
})

const connectedServer = server.listen(8080, () => {
    console.log("Servidor HTTP conectado en el puerto " + connectedServer.address().port);
});

