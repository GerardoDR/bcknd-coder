/////SE COMENTARON LAS LINEAS PARA PASAR EL PROCESO A RANDOMROUTER Y OMITIR EL CHILD
// const getRandom = () =>{
//     return Math.floor(Math.random()* (1000) + 1);
// }

// console.log('CHILD EJECUTADO');
// process.on('message', (data) =>{
//     for(let i = 0; i < data.count; i++ ){
//         let random = getRandom();
//         if(data.numbers[random]){
//             data.numbers[random]++;
//         } else {
//             data.numbers[random] = 1;
//         }
//     }
//     process.send(data.numbers)
// })