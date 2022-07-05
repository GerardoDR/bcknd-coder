const { Router, application } = require('express');
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
    forked.send('start', {numbers, count})
    // for(let i = 0; i < count; i++ ){
    //     let random = getRandom();
    //     if(numbers[random]){
    //         numbers[random]++;
    //     } else {
    //         numbers[random] = 1;
    //     }
    // }
    forked.on('result', (nums)=>{
        res.json({nums})
    })
});

module.exports = randomsRouter;