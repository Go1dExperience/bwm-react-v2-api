import "reflect-metadata";
import "dotenv/config";

import cors from "cors";
import express from "express";
import { RouterConfig } from "./types";

class App {
  public app: express.Application;
  public port: number;

  constructor(appInit: {
    port: number;
    middlewares: express.RequestHandler[];
    routers: RouterConfig[];
  }) {
    this.app = express();
    this.port = appInit.port;

    this.middlewares(appInit.middlewares);
    this.routes(appInit.routers);
  }
  public listen(callback?: () => void): void {
    this.app.listen(this.port, callback);
  }
  private middlewares(middlewares: express.RequestHandler[]): void {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }
  private routes(routerConfig: RouterConfig[]): void {
    routerConfig.forEach((config) => {
      this.app.use(config.path, config.router);
    });
  }
}

export default App;
