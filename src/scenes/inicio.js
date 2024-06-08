export default class Inicio extends Phaser.Scene {
    constructor(){
        super({key: 'Inicio'});
    }

    preload(){
        this.load.image("backgroundImage", "../../assets/fondo.png");
        this.load.image("marco", "../../assets/marco.png");
    }
    
    create(){
        var {width, height} = this.sys.game.config;
        
        // Añade la imagen de fondo
        this.fondo = this.add.image(0, 0, "backgroundImage").setDisplayOrigin(0,0);
        this.fondo.setDisplaySize(width, height);
        var configText = {
            color: "#000",
            fontSize: 24,
            align: 'center'
        };

        // Crea el contenedor en el centro de la pantalla
        var contenedorOpciones = this.add.container(width / 2, height / 2);

        var configRectangulo = {
            width: 300,
            height: 60,
            color: 0x0ef0cc88
        };



        // Crea los rectángulos y textos dentro del contenedor
        // var rectangulo1 = this.add.rectangle(0, 0, configRectangulo.width, configRectangulo.height, configRectangulo.color);
        var marco = this.add.image(0, 0 , "marco").setDisplaySize(400, 65);
        var rectangulo2 = this.add.rectangle(0, 80, configRectangulo.width, configRectangulo.height, configRectangulo.color);
        var rectangulo3 = this.add.rectangle(0, 160, configRectangulo.width, configRectangulo.height, configRectangulo.color);
        
        var IniciarGame = this.add.text((-configRectangulo.width / 2) + 15, 0, "Iniciar Juego", configText);
        var Opciones = this.add.text((-configRectangulo.width / 2) + 15, 80, "Opciones", configText);
        var Extra = this.add.text((-configRectangulo.width / 2) + 15, 160, "Extra", configText);


        // Suponiendo que tienes un botón llamado 'marco'
        marco.setInteractive();
        // Eventos para encoger y crecer 'marco'
        marco.on('pointerover', function () {
            marco.setDisplaySize(300, 50);
            IniciarGame.setStyle({fontSize: 12});
        });

        marco.on("pointerdown", () => { this.scene.start("GAME")})


        marco.on('pointerout', function () {
            marco.setDisplaySize(400, 65);
            IniciarGame.setStyle({fontSize: 24});
        });

        contenedorOpciones.add( [marco, rectangulo2, rectangulo3, IniciarGame, Opciones, Extra]);
    }
    
    update(){
        
    }
}