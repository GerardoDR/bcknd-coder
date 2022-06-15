const socket = io.connect();

///////// normalizr
const author = new normalizr.schema.Entity("author");
const mensaje = new normalizr.schema.Entity("mensaje", {author});
const mensajesSch = new normalizr.schema.Entity("mensajes",{ mensajes: [mensaje]});

///////// mensajes
const mensajes = document.querySelector(".mensajes");
const compresion = document.querySelector(".compresion");

const addMessage = (e) => {
  const fecha = new Date();
  const date = `[${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}]`;
  const randomID = Math.floor(Math.random() * 999999);
  const mensaje = {
    id: randomID,
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
  console.log(mensaje);
  socket.emit("nuevo-mensaje", mensaje);
  return false;
};

socket.on("mensajes", (data) => {
  data = normalizr.denormalize(data.result, mensajesSch, data.entities);
  let denormalizedLength = JSON.stringify(data).length;
  let normalizado = normalizr.normalize(data, mensajesSch);
  let normalizedLength = JSON.stringify(normalizado).length
  let compressedPercent = 100 - (normalizedLength / (denormalizedLength / 100))
  const template = Handlebars.compile(`
    <ul>
        {{#each mensajes}}
            <li class="rowMsj">
                <div><strong>{{author.id}} </strong><span class="fecha">{{date}}</span>:</div><span>{{text}}</span>
            </li>
        {{/each}}
    </ul>
    `);
  const html = template({ mensajes: data.mensajes, compresion: compressedPercent});
  mensajes.innerHTML = html;
  compresion.innerHTML = `Compresión de mensajes en base de datos: ${compressedPercent.toFixed(2)}%`;
});