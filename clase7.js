const express = require('express');

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log('Aplicación express escuchando en el puerto 8080');
});

const frase = 'Hola mundo como están?'


app.get("/api/frase", (req,res)=>{
    res.json({
        result:frase
    })
})

app.get("/api/letras/:num", (req,res)=>{
    //devuelve letra en el numero de orden indicado
    const num = Number(req.params.num);
    if(num>=0 && num<=frase.length && !isNaN(num)){
        const sinEspacio = frase.split(' ').join('')
        res.json({
            result : sinEspacio[num]
        })
    }else{
        res.json({
            error : 'numero fuera de rango o no es un numero',
            'numero ingresado' : num
        })
    }
})