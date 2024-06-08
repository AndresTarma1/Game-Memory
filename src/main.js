import GAME from "./scenes/game.js";
import Inicio from "./scenes/inicio.js";

var ancho = document.getElementById("contenedor").offsetWidth;
var largo = document.getElementById("contenedor").offsetHeight;

const config = {
    type: Phaser.AUTO,
    width: document.getElementById("contenedor").offsetWidth,
    height: document.getElementById("contenedor").offsetHeight,
    parent: "contenedor",
    scene: [Inicio, GAME],
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
}

var game = new Phaser.Game(config);