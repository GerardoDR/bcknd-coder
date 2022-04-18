// Considere la siguiente frase: ‘Frase inicial’
// Realizar una aplicación de servidor node.js con express que incorpore las siguientes rutas:
// GET '/api/frase': devuelve un objeto que como campo ‘frase’ contenga la frase completa
// GET '/api/palabras/:pos': devuelve un objeto que como campo ‘buscada’ contenga la palabra hallada en la frase en la posición dada (considerar que la primera palabra es la #1.
// POST '/api/palabras': recibe un objeto con una palabra bajo el campo ‘palabra’ y la agrega al final de la frase. Devuelve un objeto que como campo ‘agregada’ contenga la palabra agregada, y en el campo ‘pos’ la posición en que se agregó dicha palabra.
// PUT '/api/palabras/:pos': recibe un objeto con una palabra bajo el campo ‘palabra’ y reemplaza en la frase aquella hallada en la posición dada. Devuelve un objeto que como campo ‘actualizada’ contenga la nueva palabra, y en el campo ‘anterior’ la anterior.

const express = require('express');
const { Router } = express

const app = express();
const router = Router();

const frase = 'Frase inicial';

router.get('/frase', (req, res) => {
    res.send(frase)
})

router.get('palabras/:pos', (req, res) => {
    let palabra = frase.split(' ')
    palabra = palabra[Number(req.params.pos)]
    res.send({
        buscada: palabra
    })
}

router.post('/palabras', (req, res) => {
    frase.push(req.body)
    res.json({
        palabra: 'palaaabraaa',
        body: req.body
    });
})

app.listen(8080)

app.use('/api', router)

app.get('/productos', (req, res) => {
    res.send('lista de productos')
})
