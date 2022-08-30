const axios = require('axios');

const getAxios = () => axios.get('https://jsonplaceholder.typicode.com/posts')
.then( (res) => {console.log(res.data)})
.catch( (err) => {console.log('error', err)});

getAxios();

