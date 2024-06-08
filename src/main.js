import GAME from "./scenes/game.js";
import Inicio from "./scenes/inicio.js";

var ancho = document.getElementById("contenedor").offsetWidth;
var largo = document.getElementById("contenedor").offsetHeight;

const config = {
    type: Phaser.AUTO,
    width: ancho,
    height: largo,
    parent: "contenedor",
    scene: [Inicio, GAME],
    scale: {
        mode: Phaser.Scale.FIT_TO_CONTAINER,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
}

var game = new Phaser.Game(config);