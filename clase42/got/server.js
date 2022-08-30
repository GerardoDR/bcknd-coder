import got from "got";

const getter = async () => {
    try {
        const res = await got('https://jsonplaceholder.typicode.com/posts')
        console.log (res.body);
    } catch (error) {
        console.log(error);
    }
}

getter();

// async () =>{
//     const {body} = await got.post('http://localhost:8080',{
//         json:{
//             hello:'world'
//         },
//         responseType:'json'
//     });

//     console.log (body.data);
// };
