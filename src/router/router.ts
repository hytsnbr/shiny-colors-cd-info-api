import { apiController } from "@/controllers/api_controller.ts";
import { Hono } from "@hono/hono";

const router = new Hono();

router.get("/list", apiController.getList);

export { router };
