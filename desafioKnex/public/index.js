const socket = io.connect();

const productos = document.querySelector(".productos");
const mensajes = document.querySelector(".mensajes");

const addProduct = (e) => {
  const producto = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
  };
  console.log(producto);
  socket.emit("nuevo-producto", producto);
  return false;
};

const addMessage = (e) => {
  const date = new Date();
  const fecha = `[${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;

    const mensaje = { 
        email: document.getElementById('email').value,
        mensaje: document.getElementById('mensaje').value,
        fecha
      }
    console.log(mensaje);
    socket.emit('nuevo-mensaje', mensaje);
    return false
}

socket.on("productos", (data) => {
  productos.innerHTML = data;
});

socket.on("mensajes", (data) => {
    mensajes.innerHTML = data;
});