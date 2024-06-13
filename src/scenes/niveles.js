export class NIVEL1 extends Phaser.Scene {
    init(nivel){
        this.nivel = nivel.nivel || 1;
    }
    constructor(){
        super({key: 'NIVEL1'});
    }

    preload(){
        this.level = 1;

        // Intentos
        this.intentos = 0;

        // Musica de fondo
        this.load.audio("musicFondo", "../../assets/sounds/music_fondo.mp3");
        this.load.audio("wrongSound", "../../assets/sounds/wrong_sound.mp3");

        // Cargamos la fuente con bitmap
        this.load.bitmapFont('gothic', 'assets/font/gothic.png', 'assets/font/gothic.xml');
        this.load.bitmapFont('atari', 'assets/font/atari-smooth.png', 'assets/font/atari-smooth.xml');

        // Cargamos todo lo necesario para el juego
        this.load.path = '../../assets/';
        this.load.image("cocodrilo", "cocodrilo.png");
        this.load.image("leon", "leon.png");
        this.load.image("monito", "monito.png");
        this.load.image("serpiente", "serpiente.png");
        this.load.image("chonchito", "chonchito.png");
        this.load.image("elefante", "elefante.png");
        this.load.image("fondoGame", "../../assets/Fondo/background.png");
        this.load.image("cartaVolteada", "volteada.png");
    }

    
    create(){
        if(this.nivel === 1){
            this.audio_fondo = this.sound.add("musicFondo");
            this.incorrecto = this.sound.add("wrongSound");
            this.audio_fondo.play();
            this.audio_fondo.loop = true;
            this.configuracion(8);
        }else if(this.nivel === 2){
            this.incorrecto = this.sound.add("wrongSound");
            this.configuracion(5);
        }     
    }
            
    configuracion(tiempo){
        
        // Colocamos el ancho y el height del juego en una variable de width y otra de height
        var {width, height} = this.sys.game.config;

        // Agregamos el fondo
        this.fondo = this.add.image(0, 0, "fondoGame").setDisplayOrigin(0,0);
        this.fondo.setDisplaySize(width, height);

        this.add.bitmapText(width / 2, 25, "atari", `NIVEL: ${this.level}`, 24).setOrigin(.5, .5).setTint(0x00000088);
        const jsonInfo = {
            time: tiempo,
            widthGame: width,
            heightGame: height,
        }

        if(this.nivel === 1){
            //Mostramos el contador para iniciar el juego;
            this.mostrarContador(jsonInfo);
        }else{
            this.crearContenedor(jsonInfo);
        }
        
    }

    mostrarContador(config) {
        // Estos son los segundos para que el juego empiece
        var contador = 3;

        // Centramos el texto al centro
        var textoContador = this.add.bitmapText(config.widthGame / 2, config.heightGame / 2, "atari", `Empezando en ${contador}`, "34").setOrigin(0.5).setTint(0x000).setCenterAlign().setOrigin(0.5);
    
        // Crear una función para actualizar el texto del contador
        var actualizarContador = () => {
            contador--;
            textoContador.setText(`Empezando en ${contador}`);
        
            if (contador === 0) {
              this.tweens.add({
                targets: textoContador,
                alpha: 0, // Ocultar el texto
                duration: 500, // Duración de la animación (0.5 segundos)
                onComplete: () => {

                    // Al terminar mostramos el contenedor
                  this.crearContenedor(config);
                }
              });
            }
        };
        // Iniciar la actualización del contador cada segundo
        this.time.addEvent({ delay: 1000, loop: true, callback: actualizarContador });
    }

    crearContenedor(config) {
        // Creamos los animales y los revolvemos con Phaser.Math.RND.shufle(animales);
        var animales = ["cocodrilo", "leon", "monito", "serpiente", "chonchito", "elefante"];
        Phaser.Math.RND.shuffle(animales);

        // Agregamos un contenedor que contenga las cartas
        var contenedorCartas = this.add.container(config.widthGame / 2, config.heightGame / 2 - 1000 ); //Colocamos la posicion del contenedor al centro, ya que su origen es de (0.5, 0.5);
        const ContainerInfo = {width: config.widthGame * 0.6, height : config.heightGame * 0.3} //Guardamos informacion del contenedor aqui
        contenedorCartas.setSize(ContainerInfo.width, ContainerInfo.height); //Le asignamos el tamaño al contenedor

        // GapX espaciado entre columnas
        var gapX = 15;
        
        // GapX espaciado entre columnas
        var gapY = 10;

        // Cartas tamaño
        var celdaAncho = (ContainerInfo.width / 2) - gapX; //Ancho de cada carta o celda
        var celdaAlto = (ContainerInfo.height / 1) - gapY; //Alto de cada carta o celda

        // Agregamos las posiciones en XY desde el contenedor como si el inicio fuera desde la parte x = 0 Y y = 0;
        const posXY = {x: - (ContainerInfo.width / 2), y: - (ContainerInfo.height / 2)};

        // Iniciamos un indice para recorrer los animales para asignar
        var indice = 0;

        // Posiciones para la carta dentro del contenedor
        var posicionesX = [posXY.x, posXY.x + celdaAncho + gapX];
        var posicionesY = [posXY.y, posXY.y];

        // Crear y posicionar elementos en la cuadrícula
        for (var fila = 0; fila < 1; fila++) {
            for (var columna = 0; columna < 2; columna++) {

                // Tomamos los datos de los arrays anteriores para acomodar sus posiciones
                var x = posicionesX[indice];
                var y = posicionesY[indice];

                // Crea el elemento, por ejemplo, una image
                var elemento = this.add.image(x, y, animales[indice]);
                
                
                // Agregamos el origen en (0,0) parte superior izquierda
                elemento.setOrigin(0,0);

                // Ajusta el tamaño del elemento si es necesario
                elemento.displayWidth = celdaAncho;
                elemento.displayHeight = celdaAlto;

                // Agregamos el elemento al contenedor(Contenedor de cartas)
                contenedorCartas.add(elemento);

                // Incrementamos el indice
                indice++;
            }
        }

        // Guardamos la textura original de la carta en iterando por todo el contenedor
        contenedorCartas.iterate((carta) => {carta.texturaOriginal = carta.texture.key;});

        // Obtenemos una carta random del contenedor para mostrar
        var carta = contenedorCartas.getRandom();

        config['cartaRandom'] = carta;
        config['contenedor'] = contenedorCartas;
        config['cAlto'] = celdaAlto;
        config['cAncho'] = celdaAncho;

        // Crear una animación para mover el contenedor hacia abajo
        this.tweens.add({
            targets: config.contenedor,
            y: config.heightGame - (config.heightGame / 3) , // Posición final del contenedor, osea el centro
            duration: 1000, // Duración de la animación (1,5 segundos)
            ease: 'Power1', // Animación lineal
            onComplete: () => {
                this.ocultarCartas(config);
            }
        });
    }

    ocultarCartas(config){
        //Contador para que las cartas se escondan
        var contador = config.time;

        // Agregamos el contador en la parte inferior izquierda
        var textoCartas = this.add.bitmapText(10, config.heightGame - 40, "atari", `Volteando cartas en ${contador}`, 24).setTint(0x000);

        // Funcion para que se volteen las cartas "cartavolteada"
        var CartasVolteadas = () => {

            // Para que el contador decremente para voltear las cartas
            contador--;

            // Asignamos el contador nuevo al cambiar el segundo
            textoCartas.setText(`Volteando cartas en ${contador}`);
        
                // Verifica si el contador ha terminado
                if (contador === 0) {

                    // Agregamos la animacion de cambiar el tiempo
                    this.tweens.add({
                    targets: textoCartas,
                    alpha: 0, // Ocultar el texto
                    duration: 500, // Duración de la animación (0.5 segundos)
                    onComplete: () => {
                        config.contenedor.iterate((carta) => {
                            // Cambia la textura de cada carta a 'cartaVolteada'
                            carta.setTexture('cartaVolteada').setDisplaySize(config.cAncho, config.cAlto);
                        });

                        this.mostrarCartaRandom(config);
                    }
                });
                }

            }
            this.time.addEvent({ delay: 1000, loop: true, callback: CartasVolteadas });
    }


    mostrarCartaRandom(config){
        var newCarta = this.add.image(config.widthGame, config.heightGame + 1000, config.cartaRandom.texturaOriginal);
        newCarta.setOrigin(1, 0);
        newCarta.setDisplaySize(config.cAncho, config.cAlto);

        this.tweens.add({targets: newCarta,
            ease: "Power0",
            duration: 1000,
            y: 10,
            x: config.widthGame -10,
            onComplete: () => {
                // Habilitamos el click en las cartas
                config.contenedor.iterate((carta) => {
                    carta.setInteractive();
                    carta.on('pointerdown', () => {
                        // Cambiar la textura de la carta a la original
                        carta.setTexture(carta.texturaOriginal);
                        carta.setDisplaySize(config.cAncho, config.cAlto);
                        this.verificarRespuesta(carta, config);
                    });
                })
                config["carta_Random"] = newCarta;
            }

            });        
    }

    verificarRespuesta(carta, config){
        carta.disableInteractive();
        // Verificamos si la carta presionada es correcta
        if(carta.texture.key == config.cartaRandom.texture.key){
            config.contenedor.iterate((carta) => {carta.disableInteractive()});
            this.Cartacorrecta(config);
            this.ganaste(carta, config);
        }else{
            this.audio_fondo.volume = 0.3;
            this.incorrecto.play()
            this.Cartaincorrecta(config);
            this.ocultarCarta(carta, config);
            this.intentos++;
        }
    }
    Cartaincorrecta(config){
        const incorrecto = this.add.bitmapText(config.widthGame / 2, -30 + (config.heightGame / 2 - config.contenedor.height / 2), "atari", "!INCORRECTO!", 24).setOrigin(.5, .5).setCenterAlign().setTint(0xf01313);
        
        // Crear la animación "tween"
        const incorrectoTween = this.tweens.add({
            targets: incorrecto, // Objeto "correcto"
            props: {
            alpha: 0 // Opacidad a 0 para ocultar el texto
            },
            ease: 'Linear', // Animación lineal
            duration: 1500, // Duración de 1,5 segundos en milisegundos
            delay: 0, // Retardo de 0 segundos (opcional)
            onComplete: () => {
            // Función opcional para realizar acciones después de la animación
            // Por ejemplo, puedes iniciar un nuevo nivel o mostrar otra información
            }
        });
        incorrectoTween.play();
    }

    Cartacorrecta(config){
        const correcto = this.add.bitmapText(config.widthGame / 2, -30 + (config.heightGame / 2 - config.contenedor.height / 2), "atari", "!CORRECTO!", 24).setOrigin(.5, .5).setCenterAlign().setTint(0x22DF0C);
        
        // Crear la animación "tween"
        const correctoTween = this.tweens.add({
            targets: correcto, // Objeto "correcto"
            props: {
            alpha: 0 // Opacidad a 0 para ocultar el texto
            },
            ease: 'Linear', // Animación lineal
            duration: 1500, // Duración de 1,5 segundos en milisegundos
            delay: 0, // Retardo de 0 segundos (opcional)
            onComplete: () => {
            // Función opcional para realizar acciones después de la animación
            // Por ejemplo, puedes iniciar un nuevo nivel o mostrar otra información
            }
        });
        correctoTween.play();
    }

    ganaste(carta, config){
        config.contenedor.iterate((carta) => {carta.setTexture("cartaVolteada"); carta.setDisplaySize(config.cAncho, config.cAlto)});
        carta.setTexture(carta.texturaOriginal);
        carta.setDisplaySize(config.cAncho, config.cAlto);

        this.tweens.add({
            targets: config.contenedor,
            duration: 1500,
            y: config.heightGame + 100,
            ease: "back.in"
        });
        
        this.tweens.add({
            targets: config.carta_Random,
            duration: 1500,
            x: config.widthGame + config.cAncho,
            ease: "linear",
            onComplete: ()=>{console.log(config.carta_Random.x)}
        });

        // Iniciar un nuevo contador después de ganar
        this.time.addEvent({
            delay: 3000, // Tiempo de espera antes de reiniciar (en milisegundos)
            callback: () => {
                if(this.nivel === 1){
                    // Reiniciar el juego con un nivel incrementado
                    this.nivel++;
                    this.scene.restart({nivel: this.nivel++});
                }else{
                    this.nextLevel(config);
                }
            },
            callbackScope: this, // Opcional, para establecer el contexto de la función de retorno
        });

    }

    nextLevel(config){
        var texto = this.add.bitmapText(config.widthGame / 2, config.heightGame / 2,"atari" , "Has click para avanzar \nal siguiente nivel", 34).setOrigin(.5, .5).setCenterAlign().setTint(0x1659F1);

        this.fondo.setInteractive();
        this.fondo.on("pointerdown", () => {
            this.scene.start("NIVEL2");}
        );
        
    }

    ocultarCarta(carta, config){
        
        this.time.addEvent({
            delay: 2000, // 3 segundos en milisegundos
            callback: () => {
              // Acción que se ejecutará después de 3 segundos
              carta.setTexture("cartaVolteada").setDisplaySize(config.cAncho, config.cAlto);
              carta.setInteractive();
              this.audio_fondo.volume = 1;
            },
            callbackScope: this, // Opcional, para establecer el contexto de la función de retorno
        });
    }

    update(){}
}
export class NIVEL2 extends Phaser.Scene {
    init(nivel){
        this.nivel = nivel.nivel || 1;
    }
    constructor(){
        super({key: 'NIVEL2'});
    }

    preload(){

        // Intentos
        this.intentos = 0;

        // Cargamos todo lo necesario para el juego
        this.load.path = '../../assets/';
        this.load.image("cocodrilo", "cocodrilo.png");
        this.load.image("leon", "leon.png");
        this.load.image("monito", "monito.png");
        this.load.image("serpiente", "serpiente.png");
        this.load.image("chonchito", "chonchito.png");
        this.load.image("elefante", "elefante.png");
        this.load.image("fondoGame", "../../assets/fondoThree.jpg");
        this.load.image("cartaVolteada", "volteada.png");
    }

    
    create(){
        if(this.nivel === 1){
            this.configuracion(8);
        }else if(this.nivel === 2){
            this.configuracion(5);
        }     
    }
            
    configuracion(tiempo){
        
        // Colocamos el ancho y el height del juego en una variable de width y otra de height
        var {width, height} = this.sys.game.config;

        // Agregamos el fondo
        this.fondo = this.add.image(0, 0, "fondoGame").setDisplayOrigin(0,0);
        this.fondo.setDisplaySize(width, height);

        const jsonInfo = {
            time: tiempo,
            widthGame: width,
            heightGame: height,
        }

        if(this.nivel === 1){
            //Mostramos el contador para iniciar el juego;
            this.mostrarContador(jsonInfo);
        }else{
            this.crearContenedor(jsonInfo);
        }
        
    }

    mostrarContador(config) {
        // Estos son los segundos para que el juego empiece
        var contador = 3;

        // Centramos el texto al centro
        var textoContador = this.add.text(config.widthGame / 2, config.heightGame / 2, `Empezando en !${contador}!`  , { fontSize: 60, color: '#000', fontStyle: "Bold", align: 'center'}).setOrigin(0.5);
    
        // Crear una función para actualizar el texto del contador
        var actualizarContador = () => {
            contador--;
            textoContador.setText(`Empezando en !${contador}!`);
        
            if (contador === 0) {
              this.tweens.add({
                targets: textoContador,
                alpha: 0, // Ocultar el texto
                duration: 500, // Duración de la animación (0.5 segundos)
                onComplete: () => {

                    // Al terminar mostramos el contenedor
                  this.crearContenedor(config);
                }
              });
            }
        };
        // Iniciar la actualización del contador cada segundo
        this.time.addEvent({ delay: 1000, loop: true, callback: actualizarContador });
    }

    crearContenedor(config) {
        // Creamos los animales y los revolvemos con Phaser.Math.RND.shufle(animales);
        var animales = ["cocodrilo", "leon", "monito", "serpiente", "chonchito", "elefante"];
        Phaser.Math.RND.shuffle(animales);

        // Agregamos un contenedor que contenga las cartas
        var contenedorCartas = this.add.container(config.widthGame / 2, config.heightGame / 2 - 1000 ); //Colocamos la posicion del contenedor al centro, ya que su origen es de (0.5, 0.5);
        const ContainerInfo = {width: config.widthGame * 0.5, height : config.heightGame * 0.5} //Guardamos informacion del contenedor aqui
        contenedorCartas.setSize(ContainerInfo.width, ContainerInfo.height); //Le asignamos el tamaño al contenedor

        // GapX espaciado entre columnas
        var gapX = 15;
        
        // GapX espaciado entre columnas
        var gapY = 10;

        // Cartas tamaño
        var celdaAncho = (ContainerInfo.width / 2) - gapX; //Ancho de cada carta o celda
        var celdaAlto = (ContainerInfo.height / 2) - gapY; //Alto de cada carta o celda

        // Agregamos las posiciones en XY desde el contenedor como si el inicio fuera desde la parte x = 0 Y y = 0;
        const posXY = {x: - (ContainerInfo.width / 2), y: - (ContainerInfo.height / 2)};

        // Iniciamos un indice para recorrer los animales para asignar
        var indice = 0;

        // Posiciones para la carta dentro del contenedor
        var posicionesX = [posXY.x, posXY.x + celdaAncho + gapX, posXY.x, posXY.x + celdaAncho + gapX];
        var posicionesY = [posXY.y, posXY.y, posXY.y + celdaAlto + gapY, posXY.y + celdaAlto + gapY];

        // Crear y posicionar elementos en la cuadrícula
        for (var fila = 0; fila < 2; fila++) {
            for (var columna = 0; columna < 2; columna++) {

                // Tomamos los datos de los arrays anteriores para acomodar sus posiciones
                var x = posicionesX[indice];
                var y = posicionesY[indice];

                // Crea el elemento, por ejemplo, una image
                var elemento = this.add.image(x, y, animales[indice]);
                
                
                // Agregamos el origen en (0,0) parte superior izquierda
                elemento.setOrigin(0,0);

                // Ajusta el tamaño del elemento si es necesario
                elemento.displayWidth = celdaAncho;
                elemento.displayHeight = celdaAlto;

                // Agregamos el elemento al contenedor(Contenedor de cartas)
                contenedorCartas.add(elemento);

                // Incrementamos el indice
                indice++;
            }
        }

        // Guardamos la textura original de la carta en iterando por todo el contenedor
        contenedorCartas.iterate((carta) => {carta.texturaOriginal = carta.texture.key;});

        // Obtenemos una carta random del contenedor para mostrar
        var carta = contenedorCartas.getRandom();

        config['cartaRandom'] = carta;
        config['contenedor'] = contenedorCartas;
        config['cAlto'] = celdaAlto;
        config['cAncho'] = celdaAncho;

        // Crear una animación para mover el contenedor hacia abajo
        this.tweens.add({
            targets: config.contenedor,
            y: this.sys.game.config.height / 2, // Posición final del contenedor, osea el centro
            duration: 1000, // Duración de la animación (1,5 segundos)
            ease: 'Power1', // Animación lineal
            onComplete: () => {
                this.ocultarCartas(config);
            }
        });
    }

    ocultarCartas(config){
        //Contador para que las cartas se escondan
        var contador = config.time;

        // Agregamos el contador en la parte inferior izquierda
        var textoCartas = this.add.text(0, config.heightGame - 34, contador, {color: "#000", fontSize:34, fontStyle: "bold"});

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
                        config.contenedor.iterate((carta) => {
                            // Cambia la textura de cada carta a 'cartaVolteada'
                            carta.setTexture('cartaVolteada').setDisplaySize(config.cAncho, config.cAlto);
                        });

                        this.mostrarCartaRandom(config);
                    }
                });
                }

            }
            this.time.addEvent({ delay: 1000, loop: true, callback: CartasVolteadas });
    }


    mostrarCartaRandom(config){
        var newCarta = this.add.image(this.sys.game.config.width, config.heightGame + 1000, config.cartaRandom.texturaOriginal);
        newCarta.setOrigin(1, 0);
        newCarta.setDisplaySize(config.cAncho, config.cAlto);

        this.tweens.add({targets: newCarta,
            ease: "Power0",
            duration: 1000,
            y: 0,
            onComplete: () => {
                // Habilitamos el click en las cartas
                config.contenedor.iterate((carta) => {
                    carta.setInteractive();
                    carta.on('pointerdown', () => {
                        // Cambiar la textura de la carta a la original
                        carta.setTexture(carta.texturaOriginal);
                        carta.setDisplaySize(config.cAncho, config.cAlto);
                        this.verificarRespuesta(carta, config);
                    });
                })
                config["carta_Random"] = newCarta;
            }

        }); 
        
    }

    verificarRespuesta(carta, config){
        // Verificamos si la carta presionada es correcta
        if(carta.texture.key == config.cartaRandom.texture.key){
            config.contenedor.iterate((carta) => {carta.disableInteractive()});
            this.ganaste(config)
        }else{
            
            this.ocultarCarta(carta, config);
            this.intentos++;
        }
    }

    ganaste(config){
        var victoryText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height - 32, '¡Ganaste!'+ 'Solo te ha tomado ' + this.intentos + ' intentos', {
            fontFamily: 'Arial',
            fontSize: 32, // Tamaño inicial pequeño
            color: '#000',
          });
          
        victoryText.setOrigin(0.5, 0.5); // Centrar el texto
        this.tweens.add({
            targets: config.contenedor,
            duration: 1500,
            y: 1000,
            ease: "Power0"});
        this.tweens.add({
            targets: config.carta_Random,
            duration: 2000,
            y: 1000,
            ease: "Power0",
        });

        // Iniciar un nuevo contador después de ganar
        this.time.addEvent({
            delay: 3000, // Tiempo de espera antes de reiniciar (en milisegundos)
            callback: () => {
                if(this.nivel === 1){
                    // Reiniciar el juego con un nivel incrementado
                    this.nivel++;
                    this.scene.restart({nivel: this.nivel++});
                }else{
                    this.nextLevel(config);
                }
            },
            callbackScope: this, // Opcional, para establecer el contexto de la función de retorno
        });

    }

    nextLevel(config){
        var texto = this.add.text(config.widthGame / 2, config.heightGame / 2, "Has click para avanzar\n al siguiente nivel", {color: "#000", fontSize: 32, align: "center", fontStyle: "bold"});
        texto.setInteractive();
        texto.setOrigin(.5, .5);
        texto.on("pointerdown", () => {
            this.scene.start("NIVEL3");}
        );
        
    }

    ocultarCarta(carta, config){
        this.time.addEvent({
            delay: 3000, // 3 segundos en milisegundos
            callback: () => {
              // Acción que se ejecutará después de 3 segundos
              carta.setTexture("cartaVolteada").setDisplaySize(config.cAncho, config.cAlto);
            },
            callbackScope: this, // Opcional, para establecer el contexto de la función de retorno
          });
        carta.setInteractive();
    }

    update(){}
}
export class NIVEL3 extends Phaser.Scene {
    init(nivel){
        this.nivel = nivel.nivel || 1;
    }
    constructor(){
        super({key: 'NIVEL3'});
    }

    preload(){

        // Intentos
        this.intentos = 0;

        // Cargamos todo lo necesario para el juego
        this.load.path = '../../assets/';
        this.load.image("cocodrilo", "cocodrilo.png");
        this.load.image("leon", "leon.png");
        this.load.image("monito", "monito.png");
        this.load.image("serpiente", "serpiente.png");
        this.load.image("chonchito", "chonchito.png");
        this.load.image("elefante", "elefante.png");
        this.load.image("fondoGame", "../../assets/fondoThree.jpg");
        this.load.image("cartaVolteada", "volteada.png");
    }

    
    create(){
        if(this.nivel === 1){
            this.configuracion(8);
        }else if(this.nivel === 2){
            this.configuracion(5);
        }     
    }
            
    configuracion(tiempo){
        
        // Colocamos el ancho y el height del juego en una variable de width y otra de height
        var {width, height} = this.sys.game.config;

        // Agregamos el fondo
        this.fondo = this.add.image(0, 0, "fondoGame").setDisplayOrigin(0,0);
        this.fondo.setDisplaySize(width, height);

        const jsonInfo = {
            time: tiempo,
            widthGame: width,
            heightGame: height,
        }

        if(this.nivel === 1){
            //Mostramos el contador para iniciar el juego;
            this.mostrarContador(jsonInfo);
        }else{
            this.crearContenedor(jsonInfo);
        }
        
    }

    mostrarContador(config) {
        // Estos son los segundos para que el juego empiece
        var contador = 3;

        // Centramos el texto al centro
        var textoContador = this.add.text(config.widthGame / 2, config.heightGame / 2, `Empezando en !${contador}!`  , { fontSize: 60, color: '#000', fontStyle: "Bold", align: 'center'}).setOrigin(0.5);
    
        // Crear una función para actualizar el texto del contador
        var actualizarContador = () => {
            contador--;
            textoContador.setText(`Empezando en !${contador}!`);
        
            if (contador === 0) {
              this.tweens.add({
                targets: textoContador,
                alpha: 0, // Ocultar el texto
                duration: 500, // Duración de la animación (0.5 segundos)
                onComplete: () => {

                    // Al terminar mostramos el contenedor
                  this.crearContenedor(config);
                }
              });
            }
        };
        // Iniciar la actualización del contador cada segundo
        this.time.addEvent({ delay: 1000, loop: true, callback: actualizarContador });
    }

    crearContenedor(config) {
        // Creamos los animales y los revolvemos con Phaser.Math.RND.shufle(animales);
        var animales = ["cocodrilo", "leon", "monito", "serpiente", "chonchito", "elefante"];
        Phaser.Math.RND.shuffle(animales);

        // Agregamos un contenedor que contenga las cartas
        var contenedorCartas = this.add.container(config.widthGame / 2, config.heightGame / 2 - 1000 ); //Colocamos la posicion del contenedor al centro, ya que su origen es de (0.5, 0.5);
        const ContainerInfo = {width: config.widthGame * 0.7, height : config.heightGame * 0.5} //Guardamos informacion del contenedor aqui
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
        var posicionesX = [posXY.x, posXY.x + celdaAncho + gapX, posXY.x + celdaAncho * 2 + gapX * 2, posXY.x, posXY.x + celdaAncho + gapX, posXY.x + celdaAncho * 2 + gapX * 2];
        var posicionesY = [posXY.y, posXY.y, posXY.y, posXY.y + celdaAlto + gapY * 2, posXY.y + celdaAlto + gapY * 2, posXY.y + celdaAlto + gapY * 2];

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
                elemento.displayWidth = celdaAncho;
                elemento.displayHeight = celdaAlto;

                // Agregamos el elemento al contenedor(Contenedor de cartas)
                contenedorCartas.add(elemento);

                // Incrementamos el indice
                indice++;
            }
        }

        // Guardamos la textura original de la carta en iterando por todo el contenedor
        contenedorCartas.iterate((carta) => {carta.texturaOriginal = carta.texture.key;});

        // Obtenemos una carta random del contenedor para mostrar
        var carta = contenedorCartas.getRandom();

        config['cartaRandom'] = carta;
        config['contenedor'] = contenedorCartas;
        config['cAlto'] = celdaAlto;
        config['cAncho'] = celdaAncho;

        // Crear una animación para mover el contenedor hacia abajo
        this.tweens.add({
            targets: config.contenedor,
            y: this.sys.game.config.height / 2, // Posición final del contenedor, osea el centro
            duration: 1000, // Duración de la animación (1,5 segundos)
            ease: 'Power1', // Animación lineal
            onComplete: () => {
                this.ocultarCartas(config);
            }
        });
    }

    ocultarCartas(config){
        //Contador para que las cartas se escondan
        var contador = config.time;

        // Agregamos el contador en la parte inferior izquierda
        var textoCartas = this.add.text(0, config.heightGame - 34, contador, {color: "#000", fontSize:34, fontStyle: "bold"});

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
                        config.contenedor.iterate((carta) => {
                            // Cambia la textura de cada carta a 'cartaVolteada'
                            carta.setTexture('cartaVolteada').setDisplaySize(config.cAncho, config.cAlto);
                        });

                        this.mostrarCartaRandom(config);
                    }
                });
                }

            }
            this.time.addEvent({ delay: 1000, loop: true, callback: CartasVolteadas });
    }


    mostrarCartaRandom(config){
        var newCarta = this.add.image(this.sys.game.config.width, config.heightGame + 1000, config.cartaRandom.texturaOriginal);
        newCarta.setOrigin(1, 0);
        newCarta.setDisplaySize(config.cAncho, config.cAlto);

        this.tweens.add({targets: newCarta,
            ease: "Power0",
            duration: 1000,
            y: 0,
            onComplete: () => {
                // Habilitamos el click en las cartas
                config.contenedor.iterate((carta) => {
                    carta.setInteractive();
                    carta.on('pointerdown', () => {
                        // Cambiar la textura de la carta a la original
                        carta.setTexture(carta.texturaOriginal);
                        carta.setDisplaySize(config.cAncho, config.cAlto);
                        this.verificarRespuesta(carta, config);
                    });
                })
                config["carta_Random"] = newCarta;
            }
        });     
    }

    verificarRespuesta(carta, config){
        // Verificamos si la carta presionada es correcta
        if(carta.texture.key == config.cartaRandom.texture.key){
            config.contenedor.iterate((carta) => {carta.disableInteractive()});
            this.ganaste(config)
        }else{
            this.ocultarCarta(carta, config);
            this.intentos++;
        }
    }

    ganaste(config){
        var victoryText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height - 32, '¡Ganaste!'+ 'Solo te ha tomado ' + this.intentos + ' intentos', {
            fontFamily: 'Arial',
            fontSize: 32, // Tamaño inicial pequeño
            color: '#000',
          });
          
        victoryText.setOrigin(0.5, 0.5); // Centrar el texto
        this.tweens.add({
            targets: config.contenedor,
            duration: 1500,
            x: config.widthGame + 100,
            ease: "Power0"});
        this.tweens.add({
            targets: config.carta_Random,
            duration: 2000,
            x: config.widthGame + 100,
            ease: "Power0",
        });

        // Iniciar un nuevo contador después de ganar
        this.time.addEvent({
            delay: 3000, // Tiempo de espera antes de reiniciar (en milisegundos)
            callback: () => {
                if(this.nivel === 1){
                    // Reiniciar el juego con un nivel incrementado
                    this.nivel++;
                    this.scene.restart({nivel: this.nivel++});
                }else{
                    this.nextLevel(config);
                }
            },
            callbackScope: this, // Opcional, para establecer el contexto de la función de retorno
        });

    }

    nextLevel(config){
        var texto = this.add.text(config.widthGame / 2, config.heightGame / 2, "Enhorabuena, felicidades, has ganado", {color: "#000", fontSize: 32, align: "center", fontStyle: "bold"});
        texto.setInteractive();
        texto.setOrigin(.5, .5)
        texto.on("pointerdown", () => {});
        
    }

    ocultarCarta(carta, config){
        this.time.addEvent({
            delay: 3000, // 3 segundos en milisegundos
            callback: () => {
              // Acción que se ejecutará después de 3 segundos
              carta.setTexture("cartaVolteada").setDisplaySize(config.cAncho, config.cAlto);
            },
            callbackScope: this, // Opcional, para establecer el contexto de la función de retorno
          });
    }

    update(){}
}
