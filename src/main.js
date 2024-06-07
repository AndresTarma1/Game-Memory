import GAME from "./scenes/game.js";
import Inicio from "./scenes/inicio.js";

const config = {
    width: 800,
    height: 600,
    parent: "contenedor",
    type: Phaser.AUTO,
    pixelArt: true,
    scene: [Inicio, GAME],
    debug: true,
}

const game = new Phaser.Game(config);