import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { validateRequest } from "../middlewares/validateRequest";
import {
  createUserSchema,
  updateUserPasswordSchema,
} from "../validators/userSchemas";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", validateRequest(createUserSchema), (request, response) =>
  userController.create(request, response)
);

userRoutes.get("/profile", ensureAuthenticated, (request, response) =>
  userController.show(request, response)
);

userRoutes.put(
  "/password",
  ensureAuthenticated,
  validateRequest(updateUserPasswordSchema),
  (request, response) => userController.updatePassword(request, response)
);

userRoutes.delete("/profile", ensureAuthenticated, (request, response) =>
  userController.delete(request, response)
);

export { userRoutes };
