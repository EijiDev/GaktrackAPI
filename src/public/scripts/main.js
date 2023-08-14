const emailInput = document.querySelector('.login-form #email');
const passwordInput = document.querySelector('.login-form #password')
const submitButton = document.querySelector('.login-form #submit-button');


submitButton.addEventListener('click', async function (e) {
    //Quita el funcionamiento por default
    e.preventDefault();

    //Extrae los valores de los campos
    let email = emailInput.value;
    let password = passwordInput.value;
    
    //Creo un objeto data que contendra las credenciales a enviar
    let data = { 
        email,
        password,
    };


    //El problema de que no me reconocia el JSON era por el modo 'no-cors' ya que este solo permite una cantidad de headers limitada y tambien limita sus opciones
    
    /*
        PROBLEMA DEL CORS: Cuando intentaba obtener una respuesta del servidor este me la rechazaba debido a que era un cross-origin
        Por ende puse la solicitud en modo no-cors pero esto mandaba una solicitud opaca la cual tenia limitadas sus opciones
        por esta razon el objeto JSON que estaba mandando en mi peticion no era reconocido en el servidor 

        Para solucionarlo tuve que integrar una configuración de cors en mi aplicación express para que me aceptara peticiones externas sin
        que las tomara por cross-origin

        ALGUNAS FUENTES PARA REVISAR DESPUES: 
        PRINCIPAL: https://developer.mozilla.org/es/docs/Web/HTTP/CORS
        Node + cors: https://es.stackoverflow.com/questions/535050/c%C3%B3mo-permitir-cors-en-servidor-de-node-js
        https://bobbyhadz.com/blog/fetch-returns-empty-response-body-in-javascript#:~:text=The%20issue%20where%20fetch(),to%20get%20the%20resolved%20body.
        https://stackoverflow.com/questions/71612691/request-body-is-empty-object-even-after-sending-a-fetch-post-request-with-body
        https://stackoverflow.com/questions/38156239/how-to-set-the-content-type-of-request-header-when-using-fetch-api
        https://developer.mozilla.org/es/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
        https://support.zendesk.com/hc/es/articles/4408881672730--C%C3%B3mo-se-resuelven-los-problemas-de-CORS-
        https://www.enmilocalfunciona.io/entendiendo-cors-y-aplicando-soluciones/

    */

    //Realiza la petición POST a la ruta url/api/v1/login
    try {
        //Permite saber el estado de la solicitud
        console.log("Enviando solicitud🧠");
        let request = await fetch('http://localhost:3000/api/v1/login', {
            method: "POST",
            headers:{
                "content-type":"application/json",
            },
            body: JSON.stringify(data),
        });
        console.log("Respuesta recibida!😀")

        //Transforma la respuesta del servidor de JSON a un objeto JS
        const response = await request.json();

        console.log(response) //Imprimir la respuesta del servidor

        //Redirección a la pagina de inicio obtenida desde el servidor 
        //https://pablomonteserin.com/curso/javascript/como-redireccionar/
        //location.href = 'https://gaktrackapi-production.up.railway.app' + response.redireccion;
        location.href = 'https://gaktrackapi-production.up.railway.app' + response.redireccion;
    } catch (error) {

        //Imprime un error en caso de que la petición falle
        console.error('Error al obtener los datos:', error);
    }
});
