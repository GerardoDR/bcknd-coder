const yargs = require('yargs/yargs')(process.argv.slice(2));
const argv = yargs
    .default({storage: 'fs'})
    .alias({s: 'storage'})    
.argv

module.exports = argv;