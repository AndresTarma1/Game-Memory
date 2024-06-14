export default class Inicio extends Phaser.Scene {
    constructor(){
        super({key: 'Inicio'});
    }

    preload(){
        this.load.image("backgroundImage", "../../assets/Fondo/Iniciobackground.png");
        this.load.image("logotipo", "../../assets/Logo/logoType.png");
        this.load.image("start", "../../assets/botonesUI/start.png");
        this.load.image("exit", "../../assets/botonesUI/exit.png");
    }
    
    create(){
        var {width, height} = this.sys.game.config;

        if(height > 798){
            // Añade la imagen de fondo
            this.fondo = this.add.image(0, 0, "backgroundImage").setDisplayOrigin(0,0);
            this.fondo.setDisplaySize(width, height);

            this.logo = this.add.image(width / 2, height / 4 , "logotipo")
            this.logo.setDisplaySize(width - width / 3, height / 3);

            // Crea el contenedor en el centro de la pantalla
            var contenedorOpciones = this.add.container(width / 2, height  - height / 4);
            contenedorOpciones.setSize(width * 0.4, height * 0.3);
            
            var configContent = {width: contenedorOpciones.width, height: contenedorOpciones.height};
            var posXY = { x : -(configContent.width / 2), y : -(configContent.height / 2)} 

            var start = this.add.image(0, posXY.y, "start").setDisplaySize(configContent.width ,configContent.height / 2 );
            var exit = this.add.image(0, - posXY.y, "exit").setDisplaySize(configContent.width ,configContent.height / 2);

            contenedorOpciones.add([start, exit]);

            // Suponiendo que tienes un botón llamado 'marco'
            start.setInteractive();
            start.on("pointerover", () =>{ start.setTint(0x44ff88)});
            start.on("pointerout", () =>{ start.clearTint()});
            
            exit.setInteractive();
            exit.on("pointerover", () =>{ exit.setTint(0x44ff88)});
            exit.on("pointerout", () =>{ exit.clearTint()});

            // Eventos para encoger y crecer 'marco'
            start.on("pointerdown", () => { this.scene.start("NIVEL1", {nivel: 1})});
            exit.on("pointerdown", () => {window.history.back()});
        }else{
            // Añade la imagen de fondo
            this.fondo = this.add.image(0, 0, "backgroundImage").setDisplayOrigin(0,0);
            this.fondo.setDisplaySize(width, height);

            this.logo = this.add.image(width / 2, height / 5 , "logotipo")
            this.logo.setDisplaySize(width - width / 3, height / 3);

            // Crea el contenedor en el centro de la pantalla
            var contenedorOpciones = this.add.container(width / 2, height  - height / 3);
            contenedorOpciones.setSize(width * 0.5, height * 0.3);
            
            var configContent = {width: contenedorOpciones.width, height: contenedorOpciones.height};
            var posXY = { x : -(configContent.width / 2), y : -(configContent.height / 2)} 

            var gap = 10;

            var start = this.add.image(0, posXY.y, "start").setDisplaySize(configContent.width ,configContent.height / 2 - gap).setOrigin(0.5,0);
            var exit = this.add.image(0, -posXY.y, "exit").setDisplaySize(configContent.width ,configContent.height / 2 - gap).setOrigin(0.5, 1);

            contenedorOpciones.add([start, exit]);

            // Suponiendo que tienes un botón llamado 'marco'
            start.setInteractive();
            start.on("pointerover", () =>{ start.setTint(0x44ff88)});
            start.on("pointerout", () =>{ start.clearTint()});
            
            exit.setInteractive();
            exit.on("pointerover", () =>{ exit.setTint(0x44ff88)});
            exit.on("pointerout", () =>{ exit.clearTint()});

            // Eventos para encoger y crecer 'marco'
            start.on("pointerdown", () => { this.scene.start("NIVEL1", {nivel: 1})});
            exit.on("pointerdown", () => {window.history.back()});
        }
        

    }
    
    update(){
        
    }
}