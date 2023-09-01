let popUp = document.getElementById('subject__pop-up');
let popUpLink = document.querySelectorAll('.subject');
let closePopUp = document.querySelectorAll('.subject__remove');
let cover = document.getElementById('subject__cover');
let msgConfirmation = document.getElementById('confimation');

// trayendo header y dias para sticky
let header = document.querySelector('.header');
let date = document.querySelector('.date');

//cositas del dialogo
let bienvenida1 = document.getElementById('bienvenida1');
let buhito = document.getElementById('corriendo');
let imagen = document.getElementById('imagen');
bienvenida1.close();

// buhito.addEventListener('click', dialogos);
// se que no es la mejor practica, pero me rendi

setTimeout(function() {
    bienvenida1.show();
}, 1000);
setTimeout(function() {
    bienvenida1.innerHTML = "¿No te ha pasado que no sabes como prepararte para estas pruebas?";
}, 7500);
setTimeout(function() {
    bienvenida1.innerHTML = "A mi me pasa mucho";
}, 12000);


setTimeout(function() {
    imagen.src = "imgs/smart.png";
    bienvenida1.innerHTML = "Bueno me presento, soy Owlbert, una IA en proceso de desarrollo";
}, 15000);

setTimeout(function() {
    imagen.src = "imgs/smart.png";
    bienvenida1.innerHTML = "Y muy pronto seré tu acompañante en Gacktrack, para ayudarte con tus estudios mediante metas y desafios!";
}, 20000);

setTimeout(function() {
    imagen.src = "imgs/standing.png";
    bienvenida1.innerHTML = "Por ahora puedes recorrer la página e ir viendo el progreso que llevamos.";
}, 25000);

setTimeout(function() {
    bienvenida1.close();
}, 27000);


setTimeout(function() {
    bienvenida1.show();
    bienvenida1.innerHTML = "Te observo 👀";
}, 40000);

setTimeout(function() {
    bienvenida1.close();
}, 45000);



// manejando animaciones de salida y entrada
let makeVisible = () =>{
    // console.log('funciona el link 🌺');
    popUp.classList.add("zoomIn"); 
    cover.classList.remove('hide');
}

// quitando ambas clases para que no interfieran
let reset = () =>{
    cover.classList.add('hide')
    cover.classList.remove('fadeOutA');
    popUp.classList.remove("zoomIn"); 
    popUp.classList.remove("fadeOut"); 
   
}

let makeDisappear = () =>{
    // console.log('adio 🌺');
    popUp.classList.add("fadeOut"); 
    cover.classList.add('fadeOutA');
    setTimeout(reset, 400);
    
}

//se que hay una forma mas optima, pero flojera
let makeDisappearA = () =>{
    // console.log('adio 🌺');
    popUp.classList.add("fadeOut"); 
    cover.classList.add('fadeOutA');
    setTimeout(reset, 400);
    setTimeout(() =>{
        msgConfirmation.classList.remove('hide'); 
        msgConfirmation.classList.add('fadeIn');
    }, 300);
    setTimeout(() =>{
        msgConfirmation.classList.add('fadeOut');
        msgConfirmation.classList.remove('fadeIn');
        
    }, 5000);
    
}





// le anade a todos los links dentro de popUpLink class un addEventListener

popUpLink.forEach((div) => {
    // console.log('pas');
    div.addEventListener('click', makeVisible);
});

closePopUp.forEach((a) => {
    // console.log('back');
    a.addEventListener('click', makeDisappear);
});


//sticky header

// window.onscroll = function() {stickyness()};
// let sticky = header.offsetTop;

// function stickyness(){
//     console.log('en sticky process 🍟');
//     if(window.pageYOffset > sticky) {
//         header.classList.add('sticky');
//         date.classList.add('sticky');
//     }
//     else {
//         header.classList.remove('sticky');
//         date.classList.remove('sticky');
//     }


// }

//funcionalidades de la tarjeta, en spanish porque ya lo habia hecho asi.

let ingresoNotas = document.getElementById('pop__insert');
let inputMeta = document.getElementById('meta');
let meta = 0;

ingresoNotas.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('se presiono submit');
    formEmptyValidation();
}
);


let formEmptyValidation = () => {
    console.log(inputMeta.value);
   
       if(inputMeta.value === ''){
           console.log('empty field');
       }
   
       else{
           console.log('analyzing data 🍟');
           getData();
           setTimeout(makeDisappearA, 500);
           //emitir un sonidito?
           // tambien existe un clearTimeout :D
       }
   
   
   }
let getData = () => {
    meta = inputMeta.value;
    //que espere unos segs antes de borrar?
    inputMeta.value = '';
    console.log(`datas taken: ${meta}`);
}

