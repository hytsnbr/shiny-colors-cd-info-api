import { Logger } from "@/logger.ts";
import { router } from "@/router/router.ts";

router.onError((error, ctx) => {
  Logger.error(error);

  return ctx.json({
    error: "Internal Server Error",
  }, 500);
});

Deno.serve({
  port: 8080,
  onListen({ hostname, port }: Deno.NetAddr): void {
    Logger.info(`Listening on: ${hostname || "localhost"}:${port}`);
  },
}, router.fetch);
