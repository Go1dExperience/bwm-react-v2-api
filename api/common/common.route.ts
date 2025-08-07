import { Router } from "express";
import { RouterConfig } from "../../types";

export class CommonRoutes implements RouterConfig {
  public path = "/common";
  public router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get("/health", (_, res) => {
      const healthcheck = {
        uptime: process.uptime(),
        message: "OK",
        timestamp: Date.now(),
        status: 200,
      };
      try {
        res.send(healthcheck);
      } catch (error) {
        healthcheck.message =
          typeof error === "string" ? error : "Internal Server Error";
        healthcheck.status = 503;
        res.status(503).send(healthcheck);
      }
    });
  }
}
