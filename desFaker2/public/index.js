const socket = io.connect();

///////// normalizr
const mensajesSch = new normalizr.schema.Entity("mensajes",{
  mensajes: [mensaje],
});

const mensaje = new schema.Entity("mensaje", {
  author,
  text
});
const mensajes = document.querySelector(".mensajes");

///////// handlebars
    const template = Handlebars.compile('<h1>{{nombre}}</h1>'); // compila la plantilla
    const html = template({ nombre: 'coder' }); // genera el html
    document.querySelector('span').innerHTML = html; // inyecta el resultado en la vista
/////////

///////// mensajes

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

socket.on("mensajes", (data) => {
  mensajes.innerHTML = data;
});
