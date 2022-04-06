const moment = require('moment');
moment.locale("es");
const miNacimiento = '19911126'
const timeSince = moment(miNacimiento, "YYYYMMDD").fromNow()
console.log(`Yo nací ${timeSince}`)