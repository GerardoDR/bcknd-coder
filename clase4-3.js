const fs = require('fs');

const write = async (file,data) => {
    await fs.promises.writeFile(file, data)
    .catch(err => console.log(err))
}

const read = async (file,codif) => {
    await fs.promises.readFile(file, codif)
    .then(data => JSON.parse(data))
    .then(data => {
        const info = data
        // console.log(info)
        info.author = 'Coderhouse';
        return info;
    })
    .then(data => write('./package.json.coder', JSON.stringify(data)))
    .catch(err => console.log(err))
}


read('./info.txt', 'utf-8')
