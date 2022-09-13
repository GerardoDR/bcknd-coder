import { HandlerContext, Handlers } from "$fresh/server.ts";

let colors=['red','green'];

function asignColors(newColors: string[]){
  if(newColors.length > 0){
    colors = [...newColors]
  } else { 
    console.log('valor de newColors: ');
    console.log(newColors);
    return [];
  } 
}

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

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  return new Response(colors);
};
