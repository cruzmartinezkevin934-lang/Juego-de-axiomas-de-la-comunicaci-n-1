let turno = "ataque";
let vidaJugador = 3;
let vidaEnemigo = 5;
let ronda = 1;
let indicePregunta = 0;

const pantallaInicio = document.getElementById("pantallaInicio");
const juego = document.getElementById("juego");
const victoria = document.getElementById("victoria");
const derrota = document.getElementById("derrota");

const botonJugar = document.getElementById("jugar");

const pregunta = document.getElementById("pregunta");

const botones = [
document.getElementById("r1"),
document.getElementById("r2"),
document.getElementById("r3")
];

const mensaje = document.getElementById("mensaje");

const vidaJ = document.getElementById("vidaJugador");
const vidaE = document.getElementById("vidaEnemigo");

const rondaTexto = document.getElementById("ronda");
const turnoTexto = document.getElementById("turno");

botonJugar.onclick = iniciarJuego;

function iniciarJuego(){

pantallaInicio.classList.add("oculto");

juego.classList.remove("oculto");

cargarPregunta();

}

function cargarPregunta(){

let p = preguntas[indicePregunta];

pregunta.innerHTML = p.pregunta;

for(let i=0;i<3;i++){

botones[i].innerHTML = p.opciones[i];

botones[i].onclick = ()=>responder(i);

}

actualizarHUD();

}

function actualizarHUD(){

let barraJugador=document.getElementById("vidaJugadorBarra");

let barraEnemigo=document.getElementById("vidaEnemigoBarra");

barraJugador.style.width=(vidaJugador/3*100)+"%";

barraEnemigo.style.width=(vidaEnemigo/5*100)+"%";

rondaTexto.innerHTML="RONDA "+ronda;

if(turno=="ataque"){

turnoTexto.innerHTML="🟢 TU TURNO DE ATAQUE";

}else{

turnoTexto.innerHTML="🔴 TURNO DE DEFENSA";

}

}

vidaJ.innerHTML="❤️".repeat(vidaJugador);

vidaE.innerHTML="❤️".repeat(vidaEnemigo);

rondaTexto.innerHTML="RONDA "+ronda;

if(turno=="ataque")
turnoTexto.innerHTML="🟢 TU TURNO DE ATAQUE";

else
turnoTexto.innerHTML="🔴 DEFIÉNDETE";
}
  
function responder(opcion){

let p = preguntas[indicePregunta];

let correcta = opcion === p.correcta;

if(turno === "ataque"){

if(correcta){

mensaje.innerHTML="💥 ¡Disparo exitoso!";

vidaEnemigo--;

animacionDisparo();

}else{

mensaje.innerHTML="🔫 ¡Click! La pistola se atascó.";
  humoPistola();

}

}else{

if(correcta){

mensaje.innerHTML="🛡️ ¡Te defendiste! La pistola enemiga falló.";
  humoPistola();

}else{

mensaje.innerHTML="💥 ¡El enemigo te disparó!";

vidaJugador--;

animacionGolpe();

}

}

comprobarFin();

turno = turno === "ataque" ? "defensa" : "ataque";

ronda++;

indicePregunta++;

if(indicePregunta >= preguntas.length){

indicePregunta
function animacionDisparo(){

const bala=document.getElementById("bala");

const jugador=document.getElementById("jugador");

const enemigo=document.getElementById("enemigo");

bala.classList.add("animarBala");

jugador.classList.add("disparo");

setTimeout(()=>{

enemigo.classList.add("golpe");

},550);

setTimeout(()=>{

bala.classList.remove("animarBala");

enemigo.classList.remove("golpe");

jugador.classList.remove("disparo");

},900);

  }

const bala = document.getElementById("bala");

const jugador = document.getElementById("jugador");

const enemigo = document.getElementById("enemigo");

bala.classList.add("animarBala");

jugador.classList.add("disparo");

setTimeout(()=>{

bala.classList.remove("animarBala");

enemigo.classList.add("golpe");

},600);

setTimeout(()=>{

enemigo.classList.remove("golpe");

jugador.classList.remove("disparo");

},1000);

}

function animacionGolpe(){

const enemigo = document.getElementById("enemigo");

const jugador = document.getElementById("jugador");

enemigo.classList.add("disparo");

setTimeout(()=>{

jugador.classList.add("golpe");

},500);

setTimeout(()=>{

enemigo.classList.remove("disparo");

jugador.classList.remove("golpe");

},1000);

}

window.onload=function(){

pantallaInicio.classList.remove("oculto");

juego.classList.add("oculto");

victoria.classList.add("oculto");

derrota.classList.add("oculto");

};
function humoPistola(){

const humo=document.getElementById("humo");

humo.classList.add("humo");

setTimeout(()=>{

humo.classList.remove("humo");

},700);

}
