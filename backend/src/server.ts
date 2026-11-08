import express, { Router, type Express } from "express";

type ServerOptions = {
  port: number;
  routes: Router;
};

export class Server {
  private readonly port: number;
  private readonly app: Express;
  private readonly routes: Router;

  constructor(options: ServerOptions) {
    this.app = express();
    this.port = options.port;
    this.routes = options.routes;
  }

  public start(): void {
    this.app.use(express.json());
    this.app.use("/api", this.routes);
    this.app.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }
}