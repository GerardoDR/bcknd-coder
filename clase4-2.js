const fs = require('fs');

const writeFile = (info) => fs.writeFile('./info.txt', info, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Archivo creado');
    }
})

const getSize = (file) => fs.statSync(file).size;

fs.readFile('package.json', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        const size = getSize('package.json');
        const info = {
            contenidoStr: data,
            contenidoObj: JSON.parse(data),
            size,
        }
        console.log(info);
        writeFile(info.contenidoStr);
    }
});



