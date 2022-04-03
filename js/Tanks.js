paper.install(window);
//variables tanque
var tanque;
var base;
var cañon;
var base_cañon;
var oruga_izq;
var oruga_der;
var escotilla;
var angulo_tanque;
var velocidad_tanque;


tanque= new Group();
base= new Path.Rectangle(new Point(50, 50), new Size(150, 80))
base.style = {
  fillColor: 'green',
  strokeColor: 'black'
}
tanque.addChild(base);
base_cañon=new Path.Circle(new Point(70 + 70, 70 + 35), 20);
base_cañon.style ={
  fillColor: 'green',
  strokeColor: 'black'
}
tanque.addChild(base_cañon);
cañon=new Path.Rectangle(new Point(50, 50), new Size(40, 80))
cañon.style={
  fillColor: 'green',
  strokeColor: 'black'
}
tanque.addChild(cañon)
oruga_izq=  new Path.Rectangle(new Point(50, 50), new Size(60, 100))
oruga_izq.style={
  fillColor: 'black'
}
oruga_der=  new Path.Rectangle(new Point(50, 50), new Size(60, 100))
oruga_der.style={
  fillColor: 'black'
}
tanque.addChild(oruga_izq);
tanque.addChild(oruga_der);
escotilla= new Path.Circle(new Point(70 + 70, 70 + 35), 20);
// fin variables tanque
//variables de capas
var tanklayer;
window.onload= function (){
  paper.setup('tank')
}
tanklayer= new Layer();
