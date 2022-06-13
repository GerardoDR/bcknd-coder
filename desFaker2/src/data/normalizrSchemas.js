const { schema } = require("normalizr");

// const print = (obj) => console.log(util.inspect(obj, false, 12, true));

const mensajesSch = new schema.Entity("mensajes",{
  mensajes: [mensaje],
});

const mensaje = new schema.Entity("mensaje", {
  author,
  text
});

module.exports = {mensaje, mensajesSch}