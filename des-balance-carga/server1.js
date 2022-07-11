//CLUSTER QUE RECIBE PARAMETROS FORK Y CLUSTER
const express = require("express");
const cluster = require("cluster");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const args = yargs(hideBin(process.argv))
.default({ mode: "FORK", port: 8080 })
.alias({m:"mode", p:"port"}).argv;

const app = express();

const numCPUs = require("os").cpus().length;

const workerInit = () => {
  const PORT = args.port;

  app.get("/", (req, res) => {
    res.send(
      `Servidor express en ${PORT} - <b>PID ${
        process.pid
      }</b> - ${new Date().toLocaleString()}`
    );
  });

  app.listen(PORT, (err) => {
    if (!err)
      console.log(
        `Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`
      );
  });
};

if (cluster.isMaster) {
  console.log(numCPUs);
  console.log(`PID MASTER ${process.pid}`);

  if (args.mode === "CLUSTER") {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  } else if (args.mode === "FORK") {
    cluster.fork();
  } else {
    console.error('ingresó un modo inválido de inicio');
    throw new Error('Invalid mode')
  }
  cluster.on("exit", (worker) => {
    console.log(
      "Worker",
      worker.process.pid,
      "died",
      new Date().toLocaleString()
    );
    cluster.fork();
  });
} else {
  workerInit();
}