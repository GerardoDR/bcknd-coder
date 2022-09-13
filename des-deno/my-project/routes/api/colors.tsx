import { HandlerContext } from "$fresh/server.ts";

const COLORS = [
  "red",
  "green",
  "blue",
  "grey",
  "pink",
  "orange",
  "yellow",
  "brown",
  "violet",
  "silver",
];

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  const body = [...COLORS]
  return new Response(body);
};

// let colors=['red','green'];

// function asignColors(newColors: string[]){
//   if(newColors.length > 0){
//     colors = [...newColors]
//   } else { 
//     console.log('valor de newColors: ');
//     console.log(newColors);
//     return [];
//   } 
// }

// export const handler: Handlers = {
//     GET(_req: Request, _ctx: HandlerContext) {
//         return new Response(colors);
//     },
    // POST(req: Request, _ctx: HandlerContext) {
    //   // let colors = req.body
    //   asignColors(req.body)
    //   console.log(req.body);
    // }
// };