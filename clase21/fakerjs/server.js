import express from "express";
import { testRouter } from "./src/routes/testRoutes.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
    console.log('express app: http://localhost:' + server.address().port);
});

server.on('Error', error => { console.log(error); });

app.use('/test', testRouter)