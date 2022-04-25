const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

httpServer.listen(8080, () => console.log('SERVER ON http://localhost:8080'))

const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
 ];

//...
// Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta
app.use(express.static('./public'))
// Esta ruta carga nuestro archivo index.html en la raíz de la misma
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})
// El servidor funcionando en el puerto 3000


// const socket = io(); // Ya podemos empezar a usar los sockets desde el cliente :)

io.on('connection', socket => {
    console.log('¡Nuevo cliente conectado!');

    /* Envio los mensajes al cliente que se conectó*/
    socket.emit('messages', messages);
    
    /*Escucho los mensajes enviados por el cliente y se los propago a todos*/
    socket.on('new-message', data => {
        messages.push(data)
        io.sockets.emit('messages', messages);
    });
});
    