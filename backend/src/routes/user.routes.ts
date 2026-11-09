import { Router } from "express";
import { UserController } from "../controllers/user.controller.ts";
import { createUserValidator } from "../validators/user.validator.ts";
import { validate } from "../middlewares/validateData.ts";

export class UserRoutes {
  static get router(): Router {
    const router = Router();
    const userController = new UserController();

    router.post("/", createUserValidator, validate, userController.createUser);

    return router;
  }
}