export default class GAME extends Phaser.Scene {
    constructor(){
        super({key: 'GAME'});
    }

    preload(){
        this.nivel = 1;
        // Cargamos todo lo necesario para el juego
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

    generarContenedor(level){
        if(level == 1){
            // Colocamos el ancho y el height del juego en una variable de width y otra de height
            var {width, height} = this.sys.game.config;

            // Agregamos el fondo
            this.fondo = this.add.image(0, 0, "fondoGame").setDisplayOrigin(0,0);
            this.fondo.setDisplaySize(width, height);

            // Creamos los animales y los revolvemos con Phaser.Math.RND.shufle(animales);
            var animales = ["cocodrilo", "leon", "monito", "serpiente", "chonchito", "elefante"];
            Phaser.Math.RND.shuffle(animales);

            // Agregamos un contenedor que contenga las cartas
            var contenedorCartas = this.add.container(width / 2, height / 2 - 1000 ); //Colocamos la posicion del contenedor al centro, ya que su origen es de (0.5, 0.5);
            const ContainerInfo = {width: width * 0.70, height : height * 0.60} //Guardamos informacion del contenedor aqui
            contenedorCartas.setSize(ContainerInfo.width, ContainerInfo.height); //Le asignamos el tamaño al contenedor

            // GapX espaciado entre columnas
            var gapX = 15;
            
            // GapX espaciado entre columnas
            var gapY = 10;

            // Cartas tamaño
            var celdaAncho = (ContainerInfo.width / 3) - gapX; //Ancho de cada carta o celda
            var celdaAlto = (ContainerInfo.height / 2) - gapY; //Alto de cada carta o celda

            // Agregamos las posiciones en XY desde el contenedor como si el inicio fuera desde la parte x = 0 Y y = 0;
            const posXY = {x: - (ContainerInfo.width / 2), y: - (ContainerInfo.height / 2)};

            // Iniciamos un indice para recorrer los animales para asignar
            var indice = 0;

            // Posiciones para la carta dentro del contenedor
            var posicionesX = [posXY.x, posXY.x + this.celdaAncho + gapX, posXY.x + this.celdaAncho * 2 + gapX * 2, posXY.x, posXY.x + this.celdaAncho + gapX, posXY.x + this.celdaAncho * 2 + gapX * 2];
            var posicionesY = [posXY.y, posXY.y, posXY.y, posXY.y + this.celdaAlto + gapY * 2, posXY.y + this.celdaAlto + gapY * 2, posXY.y + this.celdaAlto + gapY * 2];

            // Crear y posicionar elementos en la cuadrícula
            for (var fila = 0; fila < 2; fila++) {
                for (var columna = 0; columna < 3; columna++) {

                    // Tomamos los datos de los arrays anteriores para acomodar sus posiciones
                    var x = posicionesX[indice];
                    var y = posicionesY[indice];

                    // Crea el elemento, por ejemplo, una image
                    var elemento = this.add.image(x, y, animales[indice]);
                    
                    
                    // Agregamos el origen en (0,0) parte superior izquierda
                    elemento.setOrigin(0,0);

                    // Ajusta el tamaño del elemento si es necesario
                    elemento.displayWidth = this.celdaAncho;
                    elemento.displayHeight = this.celdaAlto;

                    // Agregamos el elemento al contenedor(Contenedor de cartas)
                    this.contenedorCartas.add(elemento);

                    // Incrementamos el indice
                    indice++;
                }
            }

            this.contenedorCartas.setInteractive();
            this.contenedorCartas.on("pointerover", () => {console.log("estas sobre el contenedor")});

            // Guardamos la textura original de la carta en iterando por todo el contenedor
            this.contenedorCartas.iterate((carta) => {carta.texturaOriginal = carta.texture.key;});

            // Obtenemos una carta random del contenedor para mostrar
            this.carta = this.contenedorCartas.getRandom();

            //Mostramos el contador para iniciar el juego;
            this.mostrarContador();
        }
    }

    create(){
        if(this.nivel === 1){
            this.generarContenedor(1);
        }
        
    }

    mostrarContador() {
        // Estos son los segundos para que el juego empiece
        var contador = 3;

        // Centramos el texto al centro
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

                    // Al terminar mostramos el contenedor
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
            y: this.sys.game.config.height / 2, // Posición final del contenedor, osea el centro
            duration: 1500, // Duración de la animación (1,5 segundos)
            ease: 'Power1', // Animación lineal
            onComplete: () => {
                this.ocultarCartas();
            }
        });
    }

    ocultarCartas(){
        //Contador para que las cartas se escondan
        var contador = 4;

        // Agregamos el contador en la parte inferior izquierda
        var textoCartas = this.add.text(0, this.sys.game.config.height - 34, contador, {color: "#000", fontSize:34, fontStyle: "bold"});

        // Funcion para que se volteen las cartas "cartavolteada"
        var CartasVolteadas = () => {

            // Para que el contador decremente para voltear las cartas
            contador--;

            // Asignamos el contador nuevo al cambiar el segundo
            textoCartas.setText(contador);
        
                // Verifica si el contador ha terminado
                if (contador === 0) {

                    // Agregamos la animacion de cambiar el tiempo
                    this.tweens.add({
                    targets: textoCartas,
                    alpha: 0, // Ocultar el texto
                    duration: 500, // Duración de la animación (0.5 segundos)
                    onComplete: () => {
                        this.contenedorCartas.iterate((carta) => {
                            // Cambia la textura de cada carta a 'cartaVolteada'
                            carta.setTexture('cartaVolteada').setDisplaySize(this.celdaAncho, this.celdaAlto);
                        });

                        this.mostrarCartaRandom();
                    }
                });
                }

            }
            this.time.addEvent({ delay: 1000, loop: true, callback: CartasVolteadas });
    }


    mostrarCartaRandom(){
        this.newCarta = this.add.image(this.sys.game.config.width, 1000, this.carta.texturaOriginal);
        this.newCarta.setOrigin(1, 0);
        this.newCarta.setDisplaySize(this.celdaAncho, this.celdaAlto);

        this.tweens.add({targets: this.newCarta,ease: "Power0",duration: 1000, y: 0});

        // Habilitamos el click en las cartas
        this.contenedorCartas.iterate((carta) => {
            carta.setInteractive();
            carta.on('pointerdown', () => {
                // Cambiar la textura de la carta a la original
                carta.setTexture(carta.texturaOriginal);
                carta.setDisplaySize(this.celdaAncho, this.celdaAlto);

                this.verificarRespuesta(carta);
            });
        });
    }

    verificarRespuesta(carta_){
        // Verificamos si la carta presionada es correcta
        if(carta_.texture.key == this.newCarta.texture.key){
            this.ganaste()
        }else{
            this.ocultarCarta(carta_);
        }
    }

    ganaste(){
        var victoryText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, '¡Ganaste!', {
            fontFamily: 'Arial',
            fontSize: 20, // Tamaño inicial pequeño
            color: '#ffffff',
          });
          
          victoryText.setOrigin(0.5, 0.5); // Centrar el texto
    }

    ocultarCarta(carta_){
        this.time.addEvent({
            delay: 3000, // 3 segundos en milisegundos
            callback: () => {
              // Acción que se ejecutará después de 3 segundos
              carta_.setTexture("cartaVolteada").setDisplaySize(this.celdaAncho, this.celdaAlto);
              // this.scene.start('OtraEscena'); // Iniciar otra escena
            },
            callbackScope: this, // Opcional, para establecer el contexto de la función de retorno
          });
    }

    
    


    update(){

    }
}