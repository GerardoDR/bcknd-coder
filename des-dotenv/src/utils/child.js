
const getRandom = () =>{
    return Math.floor(Math.random()* (1000) + 1);
}

process.on('start',(numbers, count) =>{
    for(let i = 0; i < count; i++ ){
        let random = getRandom();
        if(numbers[random]){
            numbers[random]++;
        } else {
            numbers[random] = 1;
        }
    }
    process.send('result', {numbers})
})