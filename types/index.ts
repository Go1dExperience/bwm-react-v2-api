import { Router } from "express";
import { User } from "../lib/db/models";

export interface RouterConfig {
  path: string;
  router: Router;
  initRoutes(): void;
}

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}