const { Router } = require('express');
const { fork } = require('child_process');
const randomsRouter = Router();

const chkParams = (req) => {
    if(req.query.count){
        let count = req.query.count;
        return count
    } else {
        let count = 1e+8;
        return count
    }
    
}


randomsRouter.get('/', (req, res) => {
    let numbers = {};
    let count = chkParams(req)
    const forked = fork('./src/utils/child.js')
    let dataToChild= { numbers, count }
    forked.send(dataToChild)
    forked.on('message', nums =>{
        res.render('randoms', {nums})
    })
});

module.exports = randomsRouter;