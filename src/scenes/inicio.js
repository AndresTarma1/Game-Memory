export default class Inicio extends Phaser.Scene {
    constructor(){
        super({key: 'Inicio'});
    }

    preload(){
        //this.load.image("backgroundImage", "../../assets/fondo.png");
        this.load.image("backgroundImage", "../../assets/fondoThree.jpg");
        this.load.image("start", "../../assets/botonesUI/start.png");
        this.load.image("options", "../../assets/botonesUI/options.png");
        this.load.image("exit", "../../assets/botonesUI/exit.png");
        this.load.image("table", "../../assets/ScoreBoard/tabla.png");
    }
    
    create(){
        var {width, height} = this.sys.game.config;


        // Añade la imagen de fondo
        this.fondo = this.add.image(0, 0, "backgroundImage").setDisplayOrigin(0,0);
        this.fondo.setDisplaySize(width, height);

        this.add.image(100, 100, "table");

        // Crea el contenedor en el centro de la pantalla
        var contenedorOpciones = this.add.container(width / 2, height / 2);

        var start = this.add.image(0, 0, "start").setDisplaySize(300, 65);
        var options = this.add.image(0, 80, "options").setDisplaySize(300, 65);
        var exit = this.add.image(0, 160, "exit").setDisplaySize(300, 65);


        // Suponiendo que tienes un botón llamado 'marco'
        start.setInteractive();

        // Eventos para encoger y crecer 'marco'
        start.on("pointerdown", () => { this.scene.start("NIVEL1", {nivel: 1})});


        // marco.on('pointerout', function () {
        //     marco.setDisplaySize(400, 65);
        //     IniciarGame.setStyle({fontSize: 24});
        // });

        contenedorOpciones.add([start, options, exit]);
    }
    
    update(){
        
    }
}