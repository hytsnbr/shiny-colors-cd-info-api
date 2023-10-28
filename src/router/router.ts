import { apiController } from "@/controllers/api_controller.ts";
import { Router, RouterContext } from "deps.ts";

const router = new Router();

router.get("/", (ctx: RouterContext<string>) => {
  ctx.response.headers.set("content-type", "application/json");
  ctx.response.body = new Object("TOP PAGE");
});
router.get("/list", apiController.getList);

export { router };
