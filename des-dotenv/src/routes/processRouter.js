const { Router } = require('express');
const path = require('path');
const processRouter = Router()

function getInfo (){
    let info = {
        args: process.argv.slice[2]? process.argv.slice(2) : 'Sin argumentos',
        so: process.platform,
        node: process.version,
        mem: process.memoryUsage().rss,
        path: process.argv[1],
        pid: process.id,
        folder: process.cwd(),
    };
    return info;
}

processRouter.get('/', function (req, res) {
    const info = getInfo()
    res.render('info', {info} );
});

module.exports = processRouter;