const fs = require('fs');

let date = Date();

fs.promises.writeFileS('fyh.txt', date);

try{
    
    let data = fs.readFileSync('fyh.txt', 'utf8');
    console.log(data);

} catch(err){
    throw new Error();
}

