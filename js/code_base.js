paper.install(window);
var modoJuego = false;

// Capas de fondo, pista y auto
var bgLayer;
var pistaLayer;
var autoLayer;
var objLayer;

// Variables de la pista (segmentos) y camino
var pista;
var path;
var puntoInicial = 150;
var segmentosLimpios;

// Angulo inicial;
var autoAngulo0 = 0;
var autoPosicion0 = 150;

// Variables del auto
var objetivo;
var tanque;
var base;
var canon;
var cabeza_canon;
var base_canon;
var oruga_izq;
var oruga_der;
var escotilla;
var sir_r;
var sir_a;
var radar;
var proyectil;
var disp = false;
var puntos = 0;

var autoVelocidad;
var autoAngulo;
var proyVelocidad = 0;


window.onload = function () {
  paper.setup('myCanvas');

  // Inicializar las capas
  bgLayer = new Layer();
  pistaLayer = new Layer();
  pistaOverlayLayer = new Layer();
  autoLayer = new Layer();
  objLayer = new Layer();
  // A la capa de pista le incluye el objeto pista
  pista = new Group();
  pistaLayer.addChild(pista);

  var tool = new Tool();
  tool.minDistance = 10;
  tool.maxDistance = 45;


  tool.onKeyDown = function (event) {
    if (!modoJuego) {
      return;
    };
    if (tanque == null) {
      return;
    };
    event.preventDefault();
    // Se aumenta la velocidad
    if (event.key == 'up') {

      autoVelocidad += 5;
      autoVelocidad = Math.min(autoVelocidad + 5, 15);
    };
    // Se disminuye la velocidad
    if (event.key == 'down') {
      autoVelocidad = Math.max(autoVelocidad - 2.5, -15);
    };
    // Se gira el auto a la izquierda
    if (event.key == 'left') {
      autoAngulo = autoAngulo - (Math.PI / 180) * 5;
      tanque.rotate(-5);
      disp = false;
    };
    // Se gira el auto a la derecha
    if (event.key == 'right') {
      autoAngulo = autoAngulo + (Math.PI / 180) * 5;
      tanque.rotate(5);
      disp = false;
    };
    if (event.key == 'space') {
      proyVelocidad += 90;
      disp = true;
      if (disp) {
        disp = false;
        proyectil.clear()
        tanque.positionX
        tanque.positionY
        proyectil = new Path.Circle(new Point(tanque.position.x + (Math.cos(autoAngulo) * autoVelocidad), tanque.position.y + (Math.sin(autoAngulo) * autoVelocidad)), 4);
        proyectil.style = {
          fillColor: 'black',
          strokeColor: 'black'
        }
        tanque.addChild(proyectil);
      }
    }
  };

  // En cada frame
  view.onFrame = function (event) {
    if (modoJuego) {
      if (tanque != null) {
        sir_r.rotate(8, 0);
        radar.rotate(2, 0);

        // Se actualiza la ubicacion del auto, segun la velocidad
        var xp = tanque.position.x + (Math.cos(autoAngulo) * autoVelocidad);
        var yp = tanque.position.y + (Math.sin(autoAngulo) * autoVelocidad);
        tanque.position.x = Math.max(0, Math.min(xp, view.size.width));
        tanque.position.y = Math.max(0, Math.min(yp, view.size.height));
        autoVelocidad = autoVelocidad * 0.9;

        var xpro = proyectil.position.x + ((Math.cos(autoAngulo) * proyVelocidad));
        var ypro = proyectil.position.y + (Math.sin(autoAngulo) * proyVelocidad);
        proyectil.position.x = Math.max(0, Math.min(xpro, view.size.width));
        proyectil.position.y = Math.max(0, Math.min(ypro, view.size.height));
        proyVelocidad *= 0.9;


        // Verifica que se encuentre sobre un poligono
        var hitResult = objLayer.hitTest(proyectil.position);
        if (hitResult) {
          if (hitResult.item.flag == null) {
            hitResult.item.flag = true;
            var px = Math.random();
            var py = Math.random();
            objetivo.clear();
            objetivo = new Path.Circle(new Point(px * 500, py * 500), 15);
            objetivo.style = {
              fillColor: 'white',
              strokeColor: 'blue'
            }

            objLayer.addChild(objetivo);
            puntos++;
            document.getElementById("points").innerHTML = puntos + " pts";
            if (puntos == 5) {
              document.getElementById("estado").innerHTML = "Tú tiempo fue:  " + mn + " : " + sg + " : " + cs;
              tanque.clear();
              objetivo.clear();
              parar();
              puntos = 0;
            }
          }
        };
        // Verifica el final de juego
        tiempo
      };
    };
  };

}

// En modo dibujar pista, limpia la pista actual y limpia la capa de auto

// En modo juego, se incluye un nuevo auto y se inicia con angulo 0, velocidad 0
function jugar() {
  modoJuego = true;
  segmentosLimpios = 0;
  reiniciar();
  empezar();

  // Limpio la capa del auto e inicializo un nuevo auto
  objLayer.clear();
  autoLayer.clear();
  tanque = new Group();
  base = new Path.Rectangle(new Point(50, 50), new Size(150, 80))
  base.style = {
    fillColor: 'green',
    strokeColor: 'black'
  }
  tanque.addChild(base);
  base_canon = new Path.Circle(new Point(100, 90), 20);
  base_canon.style = {
    fillColor: 'green',
    strokeColor: 'black'
  }
  tanque.addChild(base_canon);
  canon = new Path.Rectangle(new Point(25, 85), new Size(80, 10))
  canon.style = {
    fillColor: 'green',
    strokeColor: 'black'
  }
  tanque.addChild(canon)
  oruga_izq = new Path.Rectangle(new Point(50, 120), new Size(150, 20))
  oruga_izq.style = {
    fillColor: 'black',
    strokeColor: 'white'
  }
  oruga_der = new Path.Rectangle(new Point(50, 40), new Size(150, 20))
  oruga_der.style = {
    fillColor: 'black',
    strokeColor: 'white'
  }
  tanque.addChild(oruga_izq);
  tanque.addChild(oruga_der);
  sir_a = new Path.Circle(new Point(100, 90), 10);
  sir_a.style = {
    fillColor: 'black',
    strokeColor: 'white'

  }
  sir_r = new Path.Rectangle(new Point(165, 90), new Size(35, 5))
  sir_r.style = {
    fillColor: 'black',
    strokeColor: 'white'

  }
  tanque.addChild(sir_a);
  tanque.addChild(sir_r);
  escotilla = new Path.Rectangle(new Point(140, 80), new Size(20, 20))
  escotilla.style = {
    fillColor: 'black',
    strokeColor: 'white'
  }
  tanque.addChild(escotilla)
  radar = new Path.Rectangle(new Point(165, 90), new Size(35, 5))
  radar.style = {
    fillColor: 'black',
    strokeColor: 'white'
  }
  tanque.addChild(radar);
  cabeza_canon = new Path.Rectangle(new Point(25, 82.5), new Size(5, 15))
  cabeza_canon.style = {
    fillColor: 'black',
    strokeColor: 'white'
  }
  tanque.addChild(cabeza_canon)
  proyectil = new Path.Circle(new Point(100, 90), 4);
  proyectil.style = {
    fillColor: 'black',
    strokeColor: 'black'
  }
  tanque.addChild(proyectil);
  autoLayer.addChild(tanque);

  autoVelocidad = 0;

  autoAngulo = (autoAngulo0 + 360) * (Math.PI / 180);
  tanque.rotate(autoAngulo0 + 180);
  tanque.position = autoPosicion0;
  objetivo = new Path.Circle(new Point(400, 90), 15);
  objetivo.style = {
    fillColor: 'white',
    strokeColor: 'blue'
  }
  objLayer.addChild(objetivo);

  // Defino los poligonos de la pista
  // Comienzo en 1 porque la linea esta incluida, y termino antes del ultimo
  // puesto que debo completar un poligono al final de la pista
  pistaOverlayLayer.clear();


  var now = new Date();


};


//variables de inicio:
var marcha = 0; //control del temporizador
var cro = 0; //estado inicial del cron�metro.
var bestcro = 9999999999999;
//cronometro en marcha. Empezar en 0:
function empezar() {
  if (marcha == 0) { //solo si el cron�metro esta parado
    emp = new Date() //fecha actual
    elcrono = setInterval(tiempo, 10); //funci�n del temporizador.
    marcha = 1 //indicamos que se ha puesto en marcha.
  }
}
function tiempo() { //funci�n del temporizador
  actual = new Date() //fecha en el instante
  cro = actual - emp //tiempo transcurrido en milisegundos
  cr = new Date() //fecha donde guardamos el tiempo transcurrido
  cr.setTime(cro)
  cs = cr.getMilliseconds() //milisegundos del cron�metro
  cs = cs / 10; //paso a cent�simas de segundo.
  cs = Math.round(cs)
  sg = cr.getSeconds(); //segundos del cron�metro
  mn = cr.getMinutes(); //minutos del cron�metro
  ho = cr.getHours() - 1; //horas del cron�metro
  if (cs < 10) { cs = "0" + cs; }  //poner siempre 2 cifras en los n�meros
  if (sg < 10) { sg = "0" + sg; }
  if (mn < 10) { mn = "0" + mn; }
  document.getElementById("reloj").innerHTML = mn + " : " + sg + " : " + cs; //pasar a pantalla.
}
//parar el cron�metro
function parar() {
  if (marcha == 1) { //s�lo si est� en funcionamiento
    clearInterval(elcrono); //parar el crono
    marcha = 0; //indicar que est� parado.
  }
}


//Volver al estado inicial
function reiniciar() {
  if (marcha == 1) { //si el cron�metro est� en marcha:
    clearInterval(elcrono); //parar el crono
    marcha = 0;	//indicar que est� parado
  }
  cro = 0; //tiempo transcurrido a cero
  document.getElementById("reloj").innerHTML = "00 : 00 : 00"; //visor a cero
}

