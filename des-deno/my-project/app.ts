import { Application } from "./deps.ts";
import router from "./routes.ts";

const app = new Application();

app.addEventListener("listen", ({ port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}localhost:${port}`,
  );
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
