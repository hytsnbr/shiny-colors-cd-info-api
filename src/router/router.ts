import { apiController } from "@/controllers/api_controller.ts";
import { Router } from "oak";

const router = new Router();

router.get("/list", apiController.getList);

export { router };
