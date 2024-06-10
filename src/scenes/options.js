export class Options extends Phaser.Scene{
    constructor(){
        super({key: "options"});
    }

    preload(){
        this.load.image("backgroundImage", "../../assets/fondoThree.jpg");
        this.load.image("logotipo", "../../assets/Logo/logoType.png");
        this.load.image("return", "../../assets/botonesUI/return.png");
        
    }

    create(){
        var {width, height} = this.sys.game.config;

        // Añade la imagen de fondo
        this.fondo = this.add.image(0, 0, "backgroundImage").setDisplayOrigin(0,0);
        this.fondo.setDisplaySize(width, height);

        var logo = this.add.image(width / 2, height / 4 , "logotipo")
        logo.setDisplaySize(width - width / 3, height / 3);

        var returned = this.add.image(0, 0, "return").setDisplayOrigin(0,0);
        returned.setDisplaySize(width / 6, height / 10);

        returned.setInteractive();
        returned.on("pointerdown", () => this.scene.start("Inicio"));


    }

    update(){}
}