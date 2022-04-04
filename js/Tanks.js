
paper.install(window);
// variables del tanque
var tanque;
var base;
var canon;
var base_canon;
var oruga_izq;
var oruga_der;
var escotilla;
var sir_r;
var sir_a;
var radar;

var tanqueVelocidad =0;
var tanqueAngulo= 0;



function draw() {
  layertank.clear();
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
}
// variables de las capas
var layertank;
var layerbg;
var layerroad;
// variables objeto
var road;
var accion= true;
// variables posición
var px;
var py;

window.onload = function (){
  paper.setup('tank');
  layerbg= new Layer();
  layerroad= new Layer();
  layertank= new Layer();
  road= new Group();
  layerroad.addChild(road);


// función de las teclas , acciones respecto al evento
  var tool= new Tool();
  tool.onKeyDown = function (event) {
    if (!accion || tanque == null) {
      return;
    }
    ;

    event.preventDefault();
    if (event.key == 'up') {

      tanqueVelocidad += 5;
      tanqueVelocidad = Math.min(tanqueVelocidad + 3, 15);
    }
    ;
    // Se disminuye la velocidad
    if (event.key == 'down') {
      tanqueVelocidad = Math.max(tanqueVelocidad - 3, -15);
    }
    ;
    // Se gira el auto a la izquierda
    if (event.key == 'left') {
      tanqueAngulo = tanqueAngulo - (Math.PI / 180) * 3;
      tanque.rotate(-6);
    }
    ;
    // Se gira el auto a la derecha
    if (event.key == 'right') {
      tanqueAngulo = tanqueAngulo + (Math.PI / 180) * 3;
      tanque.rotate(6);
    }
    ;
  }
    view.onFrame = function (event) {
      if (accion) {
        if (tanque != null) {
          sir_r.rotate(8,0);
          radar.rotate(2,0);

          px = tanque.position.x + (Math.cos(autoAngulo) * autoVelocidad);
          py = tanque.position.y + (Math.sin(autoAngulo) * autoVelocidad);
          tanque.position.x = Math.max(0, Math.min(px, view.size.width));
          tanque.position.y = Math.max(0, Math.min(py, view.size.height));
          autoVelocidad = autoVelocidad * 0.5;


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



        };
      };
    };
  };
function play(){
  accion = true;
  draw();


}

