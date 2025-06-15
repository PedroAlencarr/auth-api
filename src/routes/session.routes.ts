import { Router } from "express";
import { SessionController } from "../controllers/SessionController";
import { validateRequest } from "../middlewares/validateRequest";
import { authenticateUserSchema } from "./../validators/userSchemas";

const sessionRoutes = Router();
const sessionController = new SessionController();

sessionRoutes.post(
  "/",
  validateRequest(authenticateUserSchema),
  (request, response) => sessionController.create(request, response)
);

export { sessionRoutes };
