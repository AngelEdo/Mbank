import { Router } from "express";
import { UserRoutes } from "./user.routes.ts";

export class AppRoutes {
  static get router(): Router {
    const router = Router();

    router.get("/health", (_req, res) => {
      res.json({ status: "ok" });
    });
    router.use("/v1/users", UserRoutes.router);

    return router;
  }
}