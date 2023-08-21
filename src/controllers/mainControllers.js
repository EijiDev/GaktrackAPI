import path from 'path';

export class MainController{
    static sendMainPage(req, res) {
       //Mostrando la maquina que ha ingresado y realiza la consulta
        console.log(`La IP: ${req.ip} ha ingresado exitosamente a ${req.url}!😺`);

        //Envia el archivo main.html que esta en /api/src/public/main
        res.sendFile('main.html',{
            root: path.join(PUBLIC_PATH, 'main'),
        }); 
    }
}