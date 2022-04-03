paper.install(window);
var modoJuego = false;

// Capas de fondo, pista y auto
var bgLayer;
var pistaLayer;
var autoLayer;

// Variables de la pista (segmentos) y camino
var pista;
var path;
var puntoInicial;
var segmentosLimpios;

// Angulo inicial;
var autoAngulo0;
var autoPosicion0;

// Variables del auto
var tanque;
var base;
var canon;
var canon1;
var base_canon;
var oruga_izq;
var oruga_der;
var escotilla;
var sir_r;
var sir_a;
var radar;

var autoVelocidad;
var autoAngulo;

window.onload = function () {
  paper.setup('myCanvas');

  // Inicializar las capas
  bgLayer = new Layer();
  pistaLayer = new Layer();
  pistaOverlayLayer = new Layer();
  autoLayer = new Layer();

  // A la capa de pista le incluye el objeto pista
  pista = new Group();
  pistaLayer.addChild(pista);

  var tool = new Tool();
  tool.minDistance = 10;
  tool.maxDistance = 45;

  // Al hacer click, se inicia a pintar una pista
  tool.onMouseDown = function (event) {
    if (modoJuego) {
      return;
    }
    pista.clear();
    path = new Path();
    pista.addChild(path);
    path.strokeColor = '#00000';
    path.selected = true;

    autoPosicion0 = event.point;
    path.add(event.point);
    puntoInicial = event.point;
  };

  // Al arrastrar el mouse, se pinta los segmentos de pista
  tool.onMouseDrag = function (event) {
    if (modoJuego) {
      return;
    }
    var step = event.delta;
    autoAngulo0 = step.angle;
    step.angle += 90;

    var top = event.middlePoint.add(step);
    var bottom = event.middlePoint.subtract(step);

    var line = new Path();
    line.strokeColor = '#000000';
    line.add(top);
    line.add(bottom);
    pista.addChild(line);

    path.add(top);
    path.insert(0, bottom);
  };

  // Si se utilizan las fechas, mueve el auto
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
    };
    // Se gira el auto a la derecha
    if (event.key == 'right') {
      autoAngulo = autoAngulo + (Math.PI / 180) * 5;
      tanque.rotate(5);
    };
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


        // Verifica que se encuentre sobre un poligono
        var hitResult = pistaOverlayLayer.hitTest(tanque.position);
        if (hitResult) {
          if (hitResult.item.flag == null) {
            hitResult.item.flag = true;
            tanque.scale((hitResult.item.bounds.height) / (tanque.bounds.height));
            hitResult.item.style.fillColor = 'green';
            segmentosLimpios++;
          }
        };

        // Verifica el final de juego
        if (segmentosLimpios == pistaOverlayLayer.children.length) {

          parar();
          if (cro < bestcro) {
            var person = prompt("Haz hecho el mejor registro!, escribe tu nombre", "Player 1");

            if (person != null) {
              parar();
              x = "Mejor Tiempo = " + person + " -> " + document.getElementById("reloj").innerHTML + "<br>";
              document.getElementById("bestplayer").innerHTML = x;
            }
            bestcro = cro;
          }
          else {
            alert('Fin del juego. Todav�a no eres el mejor :(');
          }
          segmentosLimpios++; // Para solo mostrar una alerta una vez
          reiniciar();
        };

        tiempo

      };
    };
  };

}

// En modo dibujar pista, limpia la pista actual y limpia la capa de auto
function dibujarPista() {
  modoJuego = false;
  pista.clear();
  autoLayer.clear();
  pistaOverlayLayer.clear();
  bestcro = 99999999999999999999;
  document.getElementById("bestplayer").innerHTML = "";
};

// En modo juego, se incluye un nuevo auto y se inicia con angulo 0, velocidad 0
function jugar() {
  if (pista.children.length <= 1) {
    alert('No se ha dibujado una pista');
    return;
  }

  modoJuego = true;
  segmentosLimpios = 0;
  reiniciar();
  empezar();

  // Limpio la capa del auto e inicializo un nuevo auto
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
    fillColor: 'gray',
    strokeColor: 'white'
  }
  tanque.addChild(radar);

  autoLayer.addChild(tanque);
  autoVelocidad = 0;

  autoAngulo = (autoAngulo0 + 360) * (Math.PI / 180);
  tanque.rotate(autoAngulo0 + 180);
  tanque.position = autoPosicion0;

  // Defino los poligonos de la pista
  // Comienzo en 1 porque la linea esta incluida, y termino antes del ultimo
  // puesto que debo completar un poligono al final de la pista
  pistaOverlayLayer.clear();
  for (var i = 0; i < pista.children.length - 1; i++) {

    // Obtiene los puntos de la linea
    var p1;
    var p2;
    var p3;
    var p4;
    if (i == 0) {
      p1 = puntoInicial;
      p2 = puntoInicial;
    } else {
      p1 = new Point(pista.children[i].getSegments()[0].getPoint().x, pista.children[i].getSegments()[0].getPoint().y);
      p2 = new Point(pista.children[i].getSegments()[1].getPoint().x, pista.children[i].getSegments()[1].getPoint().y);
    }
    p3 = new Point(pista.children[i + 1].getSegments()[1].getPoint().x, pista.children[i + 1].getSegments()[1].getPoint().y);
    p4 = new Point(pista.children[i + 1].getSegments()[0].getPoint().x, pista.children[i + 1].getSegments()[0].getPoint().y);

    var poligono = new Path();
    poligono.add(p1);
    poligono.add(p2);
    poligono.add(p3);
    poligono.add(p4);
    poligono.closed = true;
    poligono.style = {
      fillColor: 'red',
      strokeColor: 'black'
    };
    pistaOverlayLayer.addChild(poligono);
  };

  var now = new Date();


};


//variables de inicio:
var marcha = 0; //control del temporizador
var cro = 0; //estado inicial del cron�metro.
var bestcro = 99999999999999999;
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

