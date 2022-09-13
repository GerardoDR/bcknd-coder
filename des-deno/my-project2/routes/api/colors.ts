import { HandlerContext, Handlers } from "$fresh/server.ts";
// import { useState } from "preact/hooks";
import Colors from "../../islands/Color.tsx";

// const [colors, setColors] = useState([]);

const context = Colors();
const {colors, setColors} = context

export const handler: Handlers = {
  async GET(_req: Request, _ctx: HandlerContext) {
    const data = [...colors]
    const body = JSON.stringify(data)
    return new Response(body);
  },
  async POST(req: Request, _ctx: HandlerContext) {
    const a = req.body.getReader();
    const b = await a.read();
    const c = new TextDecoder().decode(b.value);
    const newColor = Object.fromEntries(new URLSearchParams(c))
    console.log(newColor);
    
    setColors(...colors+newColor)
    const data = colors
    const body = JSON.stringify(data);
    return new Response(body)
  },
};
