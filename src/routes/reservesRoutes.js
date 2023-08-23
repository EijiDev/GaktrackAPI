import { Router } from "express";
import { ReserveController } from '../controllers/reserveController.js';
export const reserveRouter = Router();

reserveRouter
    .post('/', ReserveController.createReserve);