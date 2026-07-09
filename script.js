// ===============================
// BATALLA DE PATOS
// Script principal
// ===============================

let vidaJugador = 3;
let vidaEnemigo = 5;

let ronda = 1;

let turno = "ataque";

let indicePregunta = 0;

const inicio = document.getElementById("inicio");
const juego = document.getElementById("juego");
const victoria = document.getElementById("victoria");
const derrota = document.getElementById("derrota");

const btnJugar = document.getElementById("btnJugar");

const pregunta = document.getElementById("pregunta");

const botones = [
document.getElementById("r0"),
document.getElementById("r1"),
document.getElementById("r2")
];

const barraJugador = document.getElementById("vidaJugador");
const barraEnemigo = document.getElementById("vidaEnemigo");

const textoEstado = document.getElementById("estado");
const textoRonda = document.getElementById("ronda");

const bala = document.getElementById("bala");

btnJugar.addEventListener("click", iniciarJuego);

function iniciarJuego(){

inicio.classList.add("oculto");

juego.classList.remove("oculto");

cargarPregunta();

actualizarHUD();

}

function cargarPregunta(){

if(indicePregunta>=preguntas.length){

indicePregunta=0;

}

const actual=preguntas[indicePregunta];

pregunta.innerHTML=actual.pregunta;

for(let i=0;i<3;i++){

botones[i].innerHTML=actual.opciones[i];

botones[i].onclick=()=>responder(i);

}

}

function actualizarHUD(){

barraJugador.style.width=(vidaJugador/3*100)+"%";

barraEnemigo.style.width=(vidaEnemigo/5*100)+"%";

textoRonda.innerHTML="Ronda "+ronda;

if(turno==="ataque"){

textoEstado.innerHTML="🟢 Tu turno de ataque";

}else{

textoEstado.innerHTML="🔵 Defiéndete";

}
// ===============================
// RESPUESTAS Y TURNOS
// ===============================

function responder(opcion){

desactivarBotones();

const actual = preguntas[indicePregunta];

const correcta = opcion === actual.correcta;

if(turno === "ataque"){

if(correcta){

textoEstado.innerHTML="💥 ¡Disparo acertado!";

vidaEnemigo--;

animarDisparoJugador();

}else{

textoEstado.innerHTML="🔫 ¡La pistola se atascó!";

animarFalloJugador();

}

}else{

if(correcta){

textoEstado.innerHTML="🛡️ ¡Bloqueaste el ataque!";

animarFalloEnemigo();

}else{

textoEstado.innerHTML="💥 ¡Recibiste un disparo!";

vidaJugador--;

animarDisparoEnemigo();

}

}

actualizarHUD();

setTimeout(()=>{

comprobarFinJuego();

if(vidaJugador>0 && vidaEnemigo>0){

cambiarTurno();

}

},1400);

}

function cambiarTurno(){

turno = turno === "ataque" ? "defensa" : "ataque";

ronda++;

indicePregunta++;

cargarPregunta();

activarBotones();

actualizarHUD();

}

function comprobarFinJuego(){

if(vidaEnemigo<=0){

juego.classList.add("oculto");

victoria.classList.remove("oculto");

return;

}

if(vidaJugador<=0){

juego.classList.add("oculto");

derrota.classList.remove("oculto");

return;

}

}

function activarBotones(){

for(let b of botones){

b.disabled=false;

}

}

function desactivarBotones(){

for(let b of botones){

b.disabled=true;

}

}// ===============================
// ANIMACIONES
// ===============================

function animarDisparoJugador(){

const jugador=document.getElementById("jugador");
const enemigo=document.getElementById("enemigo");

jugador.classList.add("disparar");

bala.style.left="22%";
bala.style.opacity="1";
bala.classList.add("animarBala");

setTimeout(()=>{

enemigo.classList.add("golpe");

document.body.classList.add("sacudir");

},550);

setTimeout(()=>{

jugador.classList.remove("disparar");
enemigo.classList.remove("golpe");

bala.classList.remove("animarBala");
bala.style.opacity="0";

document.body.classList.remove("sacudir");

},950);

}

function animarDisparoEnemigo(){

const jugador=document.getElementById("jugador");
const enemigo=document.getElementById("enemigo");

enemigo.classList.add("disparar");

bala.style.left="78%";
bala.style.opacity="1";

bala.animate(

[
{left:"78%",opacity:1},
{left:"22%",opacity:1}

],

{

duration:650,
fill:"forwards"

}

);

setTimeout(()=>{

jugador.classList.add("golpe");

document.body.classList.add("sacudir");

},550);

setTimeout(()=>{

enemigo.classList.remove("disparar");
jugador.classList.remove("golpe");

bala.style.opacity="0";

document.body.classList.remove("sacudir");

},950);

}

function animarFalloJugador(){

crearHumo(23);

}

function animarFalloEnemigo(){

crearHumo(77);

}

function crearHumo(posicion){

const humo=document.createElement("div");

humo.style.position="absolute";
humo.style.left=posicion+"%";
humo.style.top="52%";

humo.style.width="35px";
humo.style.height="35px";

humo.style.borderRadius="50%";

humo.style.background="rgba(180,180,180,.8)";

humo.style.filter="blur(5px)";

humo.style.zIndex="50";

document.querySelector(".campo").appendChild(humo);

humo.animate(

[
{
transform:"scale(.3)",
opacity:1
},

{
transform:"scale(2)",
opacity:0
}

],

{

duration:700

}

);

setTimeout(()=>{

humo.remove();

},700);

   }// ===============================
// EFECTOS, PREGUNTAS ALEATORIAS Y REINICIO
// ===============================

function mezclarPreguntas(){

for(let i=preguntas.length-1;i>0;i--){

const j=Math.floor(Math.random()*(i+1));

[preguntas[i],preguntas[j]]=[preguntas[j],preguntas[i]];

}

}

window.onload=()=>{

inicio.classList.remove("oculto");

juego.classList.add("oculto");

victoria.classList.add("oculto");

derrota.classList.add("oculto");

mezclarPreguntas();

};

function reproducirSonido(tipo){

const contexto=new (window.AudioContext||window.webkitAudioContext)();

const oscilador=contexto.createOscillator();

const ganancia=contexto.createGain();

oscilador.connect(ganancia);

ganancia.connect(contexto.destination);

if(tipo==="disparo"){

oscilador.frequency.value=220;

}else if(tipo==="fallo"){

oscilador.frequency.value=110;

}else{

oscilador.frequency.value=440;

}

ganancia.gain.value=.08;

oscilador.start();

ganancia.gain.exponentialRampToValueAtTime(0.0001,contexto.currentTime+.2);

oscilador.stop(contexto.currentTime+.2);

}

const disparoOriginal=animarDisparoJugador;

animarDisparoJugador=function(){

reproducirSonido("disparo");

disparoOriginal();

};

const disparoEnemigoOriginal=animarDisparoEnemigo;

animarDisparoEnemigo=function(){

reproducirSonido("disparo");

disparoEnemigoOriginal();

};

const falloJugadorOriginal=animarFalloJugador;

animarFalloJugador=function(){

reproducirSonido("fallo");

falloJugadorOriginal();

};

const falloEnemigoOriginal=animarFalloEnemigo;

animarFalloEnemigo=function(){

reproducirSonido("fallo");

falloEnemigoOriginal();

};
}
