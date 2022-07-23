const { Router } = require('express');
const path = require('path');
const infoRouter = Router()
const os = require('os');
const { logApiInfo } = require('../utils/logger')

function getInfo (){
    let info = {
        args: process.argv.slice[2]? process.argv.slice(2) : 'Sin argumentos',
        so: process.platform,
        node: process.version,
        mem: process.memoryUsage().rss,
        path: process.argv[1],
        pid: process.id,
        folder: process.cwd(),
        CPUs: os.cpus().length
    };
    return info;
}

infoRouter.get('/', function (req, res) {
        const info = getInfo();
        // logApiInfo(info);
        res.render('info', {info} );
});

module.exports = infoRouter;