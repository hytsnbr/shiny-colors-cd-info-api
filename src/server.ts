import { Logger } from "@/logger.ts";
import { router } from "@/router/router.ts";
import { Application } from "@oak/oak";

const app = new Application();

app.addEventListener("listen", ({ hostname, port, secure }) => {
  Logger.info(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}`,
  );
});

app.addEventListener("error", (event) => {
  console.error(event.error);
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({
  port: 8080,
});
