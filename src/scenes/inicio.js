export default class Inicio extends Phaser.Scene {
    constructor(){
        super({key: 'Inicio'});
    }

    preload(){
        this.load.image("backgroundImage", "../../assets/fondo.png");
    }
    
    create(){
        const keys = Phaser.Input.Keyboard.KeyCodes;

        this.fondo = this.add.image(0, 0, "backgroundImage").setDisplayOrigin();
        // Añade la imagen de fondo
        
        var configText = {
            color: "#000",
            fontSize: 24,
            align: 'center'
        };

        // Crea el contenedor en el centro de la pantalla
        var contenedorOpciones = this.add.container(200, 300);

        var configRectangulo = {
            width: 300,
            height: 60,
            color: 0x0ef0cc88
        };

        // Crea los rectángulos y textos dentro del contenedor
        var rectangulo1 = this.add.rectangle(0, 0, configRectangulo.width, configRectangulo.height, configRectangulo.color);
        var rectangulo2 = this.add.rectangle(0, 80, configRectangulo.width, configRectangulo.height, configRectangulo.color);
        var rectangulo3 = this.add.rectangle(0, 160, configRectangulo.width, configRectangulo.height, configRectangulo.color);
        
        var IniciarGame = this.add.text((-configRectangulo.width / 2) + 15, 0, "Iniciar Juego", configText);
        var Opciones = this.add.text((-configRectangulo.width / 2) + 15, 80, "Opciones", configText);
        var Extra = this.add.text((-configRectangulo.width / 2) + 15, 160, "Extra", configText);


        rectangulo1.setInteractive();
        
        rectangulo1.on('pointerdown', () => {
            // Tu lógica aquí cuando se hace clic en el texto
            this.scene.start("GAME");
        });
        
        // Agrega los elementos al contenedor
        contenedorOpciones.add([rectangulo1, rectangulo2, rectangulo3, IniciarGame, Opciones, Extra]);
        
    }
    
    update(){
        
    }
}