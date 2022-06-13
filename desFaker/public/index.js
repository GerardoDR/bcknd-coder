const socket = io.connect();

const mensajesSch = new normalizr.schema.Entity("mensajes",{
  mensajes: [mensaje],
});

const mensaje = new schema.Entity("mensaje", {
  author,
  text
});
// const productos = document.querySelector(".productos");
const mensajes = document.querySelector(".mensajes");

// const addProduct = (e) => {
//   const producto = {
//     title: document.getElementById("title").value,
//     price: document.getElementById("price").value,
//     thumbnail: document.getElementById("thumbnail").value,
//   };
//   console.log(producto);
//   socket.emit("nuevo-producto", producto);
//   return false;
// };

const addMessage = (e) => {
  const fecha = new Date();
  const date = `[${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}]`;

  const mensaje = {
    author: {
      id: document.getElementById("email").value,
      name: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      age: document.getElementById("age").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    date,
    text: document.getElementById("mensaje").value,
  };
  socket.emit("nuevo-mensaje", mensaje);
  return false;
};

// socket.on("productos", (data) => {
//   productos.innerHTML = data;
// });

socket.on("mensajes", (data) => {
  mensajes.innerHTML = data;
});
