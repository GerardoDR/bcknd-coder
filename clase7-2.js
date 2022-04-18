const { query } = require('express');
const express = require('express');

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log('Aplicación express escuchando en el puerto 8080');
});

const frase = 'Hola mundo como están?'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/sumar/:num1/:num2", (req,res)=>{
    res.json({
        result: Number(req.params.num1) + Number(req.params.num2)
    })
})

app.get("/api/sumar", (req,res)=>{

    if(Object.entries(req.query).length > 0){
        res.json({
            result : 'get with query params OK',
            query: req.query
        })
    }
})

app.get("/api/operacion/:oper", (req,res)=>{
    const arr = req.params.oper.split('+')
    console.log (arr)
    const num1 = Number(arr[0])
    const num2 = Number(arr[1])
    const resul = num1 + num2
    res.json({
        result: resul
    })
})

