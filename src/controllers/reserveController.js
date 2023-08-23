import { RoomModel } from "../models/Room.js";

export class ReserveController {
    static async createReserve(req, res) {
        const { body } = req;
        const queryIsDone = await RoomModel.handleReserve(body);

        if(queryIsDone){
            res.status(200).json({ msg:'La reserva se ha realizado con exito'})
        } else {
            res.status(500).json({ msg:'error en la reserva' })
        }
    }
}