// la taille de notre objet
var taille = 0
var canvas;
var positionX;
var positionY;


// créer un canvas plein écran du browser
function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0, 'fixed');
    canvas.style('z-index', '-1')
}

function windowResized(){

    //if (windowWidth > 600){
    resizeCanvas(windowWidth, windowHeight);
       // }else{
        //    resizeCanvas(windowWidth, windowHeight/2);
      //  }
}

function draw() {
	positionX = width*0.5;
	positionY = height*0.5;
	// effacer les pixels précédents
	clear()
	// couleur
	fill(230,200,20)
	noStroke()
	// dessiner cercle au milieu avec cette variable "taille"
	push();
	circle(positionX, positionY, taille-1)
	pop();

}

function keyPressed() {
	if (key == 'r') {
		talkToRobot("Hello Robot")
	}
}

// lorsqu'il y a un changement de la roue de la souris
function mouseWheel(event) {
	// extraire uniquement le changement (delta == changement) sur l'axe Y
	let deltaY = event.wheelDeltaY
	// faire une transition de l'ancienne valeur de taille vers le nouveau deltaY
	taille = lerp(taille,deltaY,0.1)

}
