import { runQuery } from "../utils/runQuery.js";

export class RoomModel {
    static async handleReserve({ teacher, lab, course, startTime, endTime }, idTeach){
        const QUERY = 'UPDATE ROOM SET START_TIME = ?, END_TIME = ?, ID_RESERVING_TEACHER = ?, ID_OCCUPANT_COURSE = ? WHERE ID_ROOM = ?';
        const ERRDESCRIPT = 'Hubo un error al intentar realizar la reservación del laboratorio😢';

        try {
            let queryResult = await runQuery(QUERY, [startTime, endTime, teacher, course, lab], ERRDESCRIPT);
            console.log(`Consulta de reserva finalizada!🕴`);

            console.log('Respuesta de la consulta: ⬇');
            if(queryResult){
                console.table(queryResult[0]);
            } else {
                console.log('No se han devuelto registros.🤷‍♀️🤷‍♂️');
            }

            return { done: true }
        } catch (error) {
            throw new Error(error);
        }

    }
}