import dotenv from "dotenv";
import { Server } from "./server.ts";
import sequelizeConnection from "./conf/sequelize.connection.ts";
import { AppRoutes } from "./routes/index.ts";

dotenv.config();

const port = Number(process.env.PORT);

async function main() {
  try {
    await sequelizeConnection.connect();
    console.log("Database connected");

    const server = new Server({ port, routes: AppRoutes.router });
    server.start();
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

main();