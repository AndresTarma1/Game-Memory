export default class GAME extends Phaser.Scene {
    constructor(){
        super({key: 'GAME'});
    }

    preload(){
        this.load.path = '../../assets/';
        this.load.image("cocodrilo", "cocodrilo.png");
        this.load.image("leon", "leon.png");
        this.load.image("monito", "monito.png");
        this.load.image("serpiente", "serpiente.png");
        this.load.image("chonchito", "chonchito.png");
        this.load.image("elefante", "elefante.png");
        this.load.image("fondoGame", "fondoGame.jpg");
        this.load.image("cartaVolteada", "volteada.png");
    }

    create(){

        this.fondo = this.add.image(0, 0, "fondoGame").setDisplayOrigin();
        this.fondo.setDisplaySize(800, 600);

        var {width, height} = this.sys.game.config;
        const jsonCartas = {
            espaciadoCartas : 60,
            espaciadoFilas : 30,
            tamañoCartas : 145,
            columnas : 3,
            filas : 2,
            cartas : 3,
        }
        this.contenedorCartas = this.add.container(width / 2, height / 2 - 1000 );
        
        
        const ContainerInfo = {
            width : jsonCartas.cartas * jsonCartas.tamañoCartas + jsonCartas.espaciadoCartas * (jsonCartas.columnas - 1),
            height : jsonCartas.filas * jsonCartas.tamañoCartas + jsonCartas.espaciadoFilas,
        }

        const posXY = {
            x: - (ContainerInfo.width / 2),
            y: - (ContainerInfo.height / 2)
        }

        this.contenedorCartas.setSize(ContainerInfo.width, ContainerInfo.height);

        var animales = ["cocodrilo", "leon", "monito", "serpiente", "chonchito", "elefante"];
        var cocodrilo = this.add.image(posXY.x,  posXY.y , 'cocodrilo').setOrigin(0, 0);
        var leon = this.add.image(posXY.x + (jsonCartas.tamañoCartas + jsonCartas.espaciadoCartas), posXY.y, 'leon').setOrigin(0, 0);
        var monito = this.add.image(posXY.x + (jsonCartas.tamañoCartas * 2 + jsonCartas.espaciadoCartas * 2), posXY.y, 'monito').setOrigin(0, 0);
        var serpiente = this.add.image(posXY.x, posXY.y + jsonCartas.tamañoCartas + jsonCartas.espaciadoFilas , 'serpiente').setOrigin(0, 0);
        var chonchito = this.add.image(posXY.x + (jsonCartas.tamañoCartas + jsonCartas.espaciadoCartas), posXY.y +  jsonCartas.tamañoCartas +jsonCartas.espaciadoFilas, 'chonchito').setOrigin(0, 0);
        var elefante = this.add.image(posXY.x + (jsonCartas.tamañoCartas * 2 + jsonCartas.espaciadoCartas * 2), posXY.y+ jsonCartas.tamañoCartas + jsonCartas.espaciadoFilas, 'elefante').setOrigin(0, 0);

        this.contenedorCartas.add([cocodrilo, leon, monito, serpiente, chonchito, elefante]);

        this.contenedorCartas.iterate((carta) => {
            carta.texturaOriginal = carta.texture.key;
        });


        this.carta = this.contenedorCartas.getRandom();
        this.mostrarContador();
    }


    verificarRespuesta(carta_){
        if(carta_.texture.key == this.newCarta.texture.key){
            console.log("Has ganado");
        }else{
            this.ocultarCarta(carta_);
        }
    }



    mostrarCartaRandom(){
        this.newCarta = this.add.image(this.sys.game.config.width, 1000, this.carta.texturaOriginal);
        this.newCarta.setOrigin(1, 0);

        this.tweens.add({
            targets: this.newCarta,
            ease: "Bounce",
            duration: 1000,
            y: 0,
        });

        // Habilitamos el click en las cartas
        this.contenedorCartas.iterate((carta) => {
            carta.setInteractive();
            carta.on('pointerdown', () => {
                // Cambiar la textura de la carta a la original
                carta.setTexture(carta.texturaOriginal);
                carta.setScale(carta.tamañOriginal);

                this.verificarRespuesta(carta);
            });
        });
    }

    mostrarContador() {
        var contador = 3;
        var textoContador = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "Empezando en " + contador, { fontSize: 60, color: '#000', fontStyle: "Bold" }).setOrigin(0.5);
    
        // Crear una función para actualizar el texto del contador
        var actualizarContador = () => {
            contador--;
            textoContador.setText("Empezando en " + contador);
        
            if (contador === 0) {
              this.tweens.add({
                targets: textoContador,
                alpha: 0, // Ocultar el texto
                duration: 500, // Duración de la animación (0.5 segundos)
                onComplete: () => {
                  this.animarContenedor();
                }
              });
            }
        };
    
        // Iniciar la actualización del contador cada segundo
        this.time.addEvent({ delay: 1000, loop: true, callback: actualizarContador });
    }

    animarContenedor() {
        // Crear una animación para mover el contenedor hacia abajo
        this.tweens.add({
            targets: this.contenedorCartas,
            y: this.sys.game.config.height / 2, // Posición final del contenedor
            duration: 1500, // Duración de la animación (1 segundo)
            ease: 'Bounce', // Animación lineal
            onComplete: () => {
                this.ocultarCartas();
            }
        });
    }

    ocultarCarta(carta_){

        this.time.addEvent({
            delay: 3000, // 3 segundos en milisegundos
            callback: () => {
              // Acción que se ejecutará después de 3 segundos
              console.log("Han pasado 3 segundos");
              carta_.setTexture("cartaVolteada").setDisplaySize(145, 145);
              // this.scene.start('OtraEscena'); // Iniciar otra escena
            },
            callbackScope: this, // Opcional, para establecer el contexto de la función de retorno
          });
    }

    ocultarCartas(){
        var contador = 4;
        var textoCartas = this.add.text(0, this.sys.game.config.height - 34, contador, {color: "#000", fontSize:34, fontStyle: "bold"});
        var CartasVolteadas = () => {

            contador--;
            textoCartas.setText(contador);
        
                if (contador === 0) {
                    this.tweens.add({
                    targets: textoCartas,
                    alpha: 0, // Ocultar el texto
                    duration: 500, // Duración de la animación (0.5 segundos)
                    onComplete: () => {
                        this.contenedorCartas.iterate((carta) => {
                            // Cambia la textura de cada carta a 'cartaVolteada'
                            carta.setTexture('cartaVolteada').setDisplaySize(145, 145);
                        });

                        this.mostrarCartaRandom();
                    }
                });
                }

            }
            this.time.addEvent({ delay: 1000, loop: true, callback: CartasVolteadas });
    }
    


    update(){

    }



}