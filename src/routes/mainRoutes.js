import { Router } from "express";
import { MainController } from "../controllers/mainControllers.js";
export const mainRouter = Router();


mainRouter
    .get('/', MainController.sendMainPage);