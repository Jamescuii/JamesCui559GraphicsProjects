// Name: James Cui
// Lecture: CS559 001
// Professor: Eftychios Sifakis

function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  var slider1 = document.getElementById('slider1');
  slider1.value = 0;
  var slider2 = document.getElementById('slider2');
  slider2.value = 0;
  var slider3 = document.getElementById('slider3');
  slider3.value = 0;
  var slider4 = document.getElementById('slider4');
  slider4.value = 255;
  var slider5 = document.getElementById('slider5');
  slider5.value = 229;
  var slider6 = document.getElementById('slider6');
  slider6.value = 180;
  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    // use the sliders to get various parameters
    var dx = slider1.value;
    var dy = slider2.value;
    var multi = slider3.value;
    var red = slider4.value;
    var green = slider5.value;
    var blue = slider6.value;
    
    function DrawStarshape(color) {
      context.beginPath();
      context.fillStyle = color;
      context.moveTo(55,124); // 60 60 80 75 100 90 120 105 140 120  160 135
      context.lineTo(70,100);  // 120 120 88 96  56 72  24 48 
      context.lineTo(55,76);
      context.lineTo(85,76);  // center at 200 200
      context.lineTo(100,52);
      context.lineTo(115,76);
      context.lineTo(145,76);
      context.lineTo(130,100);
      context.lineTo(145,124);
      context.lineTo(115,124);
      context.lineTo(100,148);
      context.lineTo(85,124);
      context.closePath();
      context.fill();      
    }
    
    function DrawOvalshape() {
      context.beginPath();
      context.ellipse(150, 200, 20, 80, Math.PI / 2, 0, 2 * Math.PI);
      context.fillStyle = "#345"; // 
      context.fill();
    }

    function DrawSquareshape() {
        context.beginPath();
        context.rect(175, 75, 50, 50); // 300 200 is middle
        context.strokeStyle = "rgb(200, 4, 200)";
        context.stroke();
    }

    function DrawEyeball() {
        context.beginPath();
        context.rect(175, 75, 20, 20); // 300 200 is middle
        context.fillStyle = "rgb(0, 0, 0)";
        context.fill();
    }

    function DrawEyeball2() {
        context.beginPath();
        context.rect(105, 76, 20, 20); // 300 200 is middle
        context.fillStyle = "rgb(0, 0, 0)";
        context.fill();
    }

    function DrawTongue(color) {
        context.fillStyle = color;
        context.beginPath();
        context.ellipse(150, 200, 50, 30, Math.PI*0.5, Math.PI*0.5, Math.PI*1.5, true);
        context.fill();
    }

    function DrawHead(r, g, b) {
        //console.log(r);
        //console.log(g);
        //console.log(b);
        context.fillStyle = 'rgb(' + r + ',' + g +',' + b + ')';
        context.beginPath();
        context.ellipse(150, 150, 150, 150, Math.PI, Math.PI, Math.PI*4);
        context.fill();
    }
    function DrawMiddle() {
        context.beginPath();
        context.rect(145, 145, 10, 10);
        context.strokeStyle = "rgb(200, 4, 200)";
        context.stroke();
    }
    
    // make sure you understand these
 
    context.save();
    //context.translate(150, 150);
    context.translate(dx,dy);
    context.rotate(multi/10*dx*Math.PI/360);
    context.rotate(multi/10*dy*Math.PI/360);
    //context.translate(-150, -150);
    //console.log(red);
    DrawHead(red, green, blue);
    DrawOvalshape();
    DrawSquareshape();
    DrawEyeball();
    //DrawMiddle(); 255 229 180
    DrawStarshape("yellow");
    DrawEyeball2();
    DrawTongue("red");

    context.restore();
    
  }
  slider1.addEventListener("input",draw);
  slider2.addEventListener("input",draw);
  slider4.addEventListener("input",draw);
  slider5.addEventListener("input",draw);
  slider6.addEventListener("input",draw);
  draw();
}
window.onload = setup;


