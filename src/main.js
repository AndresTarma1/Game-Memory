import {NIVEL1, NIVEL2, NIVEL3} from "./scenes/niveles.js";
import Inicio from "./scenes/inicio.js";
import { Options } from "./scenes/options.js";

var ancho = document.getElementById("contenedor").offsetWidth;
var largo = document.getElementById("contenedor").offsetHeight;

const config = {
    type: Phaser.AUTO,
    width: ancho,
    height: largo,
    parent: "contenedor",
    scene: [Inicio, NIVEL1, NIVEL2, NIVEL3, Options],
    scale: {
        mode: Phaser.Scale.FIT_TO_CONTAINER,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
}

var game = new Phaser.Game(config);