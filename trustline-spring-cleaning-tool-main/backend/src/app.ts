import cors from "cors";
import express from "express";
import { actionsRouter } from "./routes/actions.routes.js";
import { healthRouter } from "./routes/health.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/health", healthRouter);
  app.use("/api/actions", actionsRouter);
  app.use(errorMiddleware);
  return app;
}
