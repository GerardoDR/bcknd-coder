const socket = io.connect();

///////// normalizr

const author = new schema.Entity("author");

const text = new schema.Entity("text");

const mensaje = new schema.Entity("mensaje", {
  author,
  text
});

const mensajesSch = new schema.Entity("mensajes",{
  mensajes: [mensaje],
});

///////// mensajes

const mensajes = document.querySelector(".mensajes");

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
  data = normalizr.denormalize(data.result, mensajesSch, data.entities);
  console.log(data);
  // const template = Handlebars.compile(`
  //   {{#if mensajes}}
  //   <ul>
  //       {{#each mensajes}}
  //           <li class="rowMsj">
  //               <div><strong>{{author.id}} </strong><span class="fecha">{{date}}</span>:</div><span>{{text}}</span>
  //           </li>
  //       {{/each}}
  //   </ul>
  //   {{/if}}`);
  // const html = template({ mensajes: data });
  // mensajes.innerHTML = html;
});
