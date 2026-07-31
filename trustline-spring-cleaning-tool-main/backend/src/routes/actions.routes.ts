import { Router } from "express";
import { listActions, quoteAction } from "../controllers/actions.controller.js";

export const actionsRouter = Router();

actionsRouter.get("/", listActions);
actionsRouter.post("/quote", quoteAction);
