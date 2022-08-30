const yargs = require('yargs/yargs')(process.argv.slice(2));
//storage: mongo || fs || mem
const argv = yargs
    .default({storage: 'mongo'})
    .alias({s: 'storage'})    
.argv

module.exports = argv;