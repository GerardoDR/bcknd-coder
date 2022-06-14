const { schema } = require("normalizr");

// const print = (obj) => console.log(util.inspect(obj, false, 12, true));

const author = new schema.Entity("author");

const text = new schema.Entity("text");

const mensaje = new schema.Entity("mensaje", {
  author,
  text
});

const mensajesSch = new schema.Entity("mensajes",{
  mensajes: [mensaje],
});

module.exports = {mensaje, mensajesSch}