import { Router } from "./deps.ts";
import { getColors, postColor } from "./handlers/colors.ts";

const router = new Router();

router
  .get("/", (ctx) => {
    const colors = getColors();
    console.log("%cGET %ca raíz", "color: blue", "color: green");
    let lista = "";

    for (let i = 0; i < colors.length; i++) {
      lista += `<li style="color: ${colors[i]}; background-color: black; width: min-content;">${colors[i]}</li>`;
    }
    ctx.response.body = `
    <!DOCTYPE html>
    <html>
        <head><title>Colores</title></head>
        <body>
            <ul>${lista}</ul>
        </body>
    </html>
    `;
  })
  .post("/colors", async (ctx) => {
    const result = ctx.request.body();
    const value = await result.value;
    const resp = await postColor(value.color);
    console.log("%cPOST %crecibido", "color: red", "color: green");
    return resp;
  });

export default router;
