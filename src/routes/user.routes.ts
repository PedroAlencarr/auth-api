import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", (request, response) =>
  userController.create(request, response)
);

userRoutes.get("/profile", ensureAuthenticated, (request, response) =>
  userController.show(request, response)
);

export { userRoutes };
