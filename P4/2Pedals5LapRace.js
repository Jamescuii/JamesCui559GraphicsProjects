function breakPedal() {
    slider1.value -= 2;
}
function gasPedal() {
    slider1.value++;
}

function breakPedal2() {
    slider2.value -= 2;
}
function gasPedal2() {
    slider2.value++;
}

function breakPedal3() {
    slider3.value -= 2;
}
function gasPedal3() {
    slider3.value++;
}

function setup() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = 60;
	var slider2 = document.getElementById('slider2');
    slider2.value = 70;
    var slider3 = document.getElementById('slider3');
    slider3.value = 80;

    var v = 5;
    var t1 = 2;
    var t2 = 2.1;
    var t3 = 2.2;

    function draw() {
        requestAnimationFrame(draw);
        canvas.width = canvas.width;
        t1 += v*0.00001*slider1.value;
        t2 += v*0.00001*slider2.value;
        t3 += v*0.00001*slider3.value
        if (t1 > 5){
            t1 = 0.0;
        }
        if (t2 > 5){
            t2 = 0.0;
        }
        if (t3 > 5){
            t3 = 0.0;
        }

        function moveToTx(start, Tx){
            var res=vec2.create(); vec2.transformMat3(res, start, Tx); ctx.moveTo(res[0], res[1]);
        }
    
        function lineToTx(start, Tx) {
            var res=vec2.create(); vec2.transformMat3(res, start, Tx); ctx.lineTo(res[0], res[1]);
        }
        /*
        function drawLine() {
            ctx.beginPath();
            moveToTx(100, 100);
            lineToTx(120, 120);
            ctx.fill();
        }
        */

        function drawCar(color, Tx) { // draw car
            ctx.beginPath();
            ctx.fillStyle = color;
            moveToTx([-.12, -.12], Tx); // top left
            lineToTx([-.12, .06], Tx); // bottom left
            lineToTx([-.08, .06], Tx); // into wheel
            lineToTx([-.08, .12], Tx); // wheel down
            lineToTx([0, .12], Tx); // wheel right
            lineToTx([0, .06], Tx); // wheel up
            lineToTx([.15, .06], Tx); // 
            lineToTx([.15, .12], Tx); // wheel down
            lineToTx([.23, .12], Tx);
            lineToTx([.23, .06], Tx);
            lineToTx([.30, .06], Tx);
            lineToTx([.30, .02], Tx);
            lineToTx([.15, -.03], Tx);
            lineToTx([-.05, -.03], Tx);
            ctx.closePath();
            ctx.fill();
        }


	    var Hermite = function(t) {
	            return [
		    2*t*t*t-3*t*t+1, 
		    t*t*t-2*t*t+t, 
		    -2*t*t*t+3*t*t, 
		    t*t*t-t*t
	        ];
	    }
	    var HermiteDerivative = function(t) {
                return [
		    6*t*t-6*t, 
		    3*t*t-4*t+1, 
		    -6*t*t+6*t, 
		    3*t*t-2*t
            ];
	    }
        function Cubic(basis, P, t){ // return hermite cubic
            var b = basis(t);
            var result=vec2.create();
            vec2.scale(result, P[0], b[0]);
            vec2.scaleAndAdd(result, result, P[1], b[1]);
            vec2.scaleAndAdd(result, result, P[2], b[2]);
            vec2.scaleAndAdd(result, result, P[3], b[3]);
            return result;
        }

        
        // for the car's moving trajectories
        var p0 = [1.5, 1.55];
        var d0 = [1.0, -0.5];
        var p1 = [0.8, 0.8];
        var d1 = [0, -1.0];
        var p2 = [1.8, -0.8];
        var d2 = [0, -1.2];
        var p3 = [-1.4, -1.0];
        var d3 = [0, 2.0];
        var p4 = [-0.9, 1.1];
        var d4 = [0.5, 1.1];
        // for the right hand side boundry of racing track
        var p0_r= [1.3, 1.6];
        var d0_r= [3.0, -0.5];
        var p1_r= [0.3, 0.8];
        var d1_r= [0, -1.0];
        var p2_r= [1.8, -0.8];
        var d2_r = [0, -1.2];
        var p3_r = [-1.4, -1.0];
        var d3_r = [0, 1.0];
        var p4_r = [-0.9, 0.9];
        var d4_r = [0.5, 0.5];
        
        // for the left hand side boundry of racing track
        var p0_l= [1.8, 1.7]; 
        var d0_l= [1.5, -0.9];
        var p1_l= [1.3, 0.8];
        var d1_l= [0, -1.0];
        var p2_l= [2.0, -0.9];
        var d2_l = [0, -2.0];
        var p3_l = [-1.7, -1.2];
        var d3_l = [0, 1.0];
        var p4_l = [-1.0, 1.3];
        var d4_l = [0.5, 0.9];

        /*
        var p0_l=[1.2, 0.7];
        var d0_l=[2.7, 0];
        var p1_l=[1.4, -0.7];
        var d1_l=[-1.7, 0];
        var p2_l = [-1.5, 0];
        var d2_l = [0, 2];
        */

        // for the car's moving trajectories shift
        var P0 = [p0, d0, p1, d1];
        var P1 = [p1, d1, p2, d2];
        var P2 = [p2, d2, p3, d3];
        var P3 = [p3, d3, p4, d4];
        var P4 = [p4, d4, p0, d0]
        // for the right hand side boundry of racing track shift
        var P0_R = [p0_r, d0_r, p1_r, d1_r];
        var P1_R = [p1_r, d1_r, p2_r, d2_r]; 
        var P2_R = [p2_r, d2_r, p3_r, d3_r]; // change
        var P3_R = [p3_r, d3_r, p4_r, d4_r];
        var P4_R = [p4_r, d4_r, p0_r, d0_r];
        // for the left hand side boundry of racing track shift
        var P0_L = [p0_l, d0_l, p1_l, d1_l];
        var P1_L = [p1_l, d1_l, p2_l, d2_l];
        var P2_L = [p2_l, d2_l, p3_l, d3_l];
        var P3_L = [p3_l, d3_l, p4_l, d4_l];
        var P4_L = [p4_l, d4_l, p0_l, d0_l];
        // for the car's moving trajectories (position) 
        var C0 = function(t_) {return Cubic(Hermite, P0, t_);};
        var C1 = function(t_) {return Cubic(Hermite, P1, t_);};
        var C2 = function(t_) {return Cubic(Hermite, P2, t_);};
        var C3 = function(t_) {return Cubic(Hermite, P3, t_);};
        var C4 = function(t_) {return Cubic(Hermite, P4, t_);};

        // for the right hand side boundry of racing track
        var C0_R = function(t_) {return Cubic(Hermite, P0_R, t_);};
        var C1_R = function(t_) {return Cubic(Hermite, P1_R, t_);};
        var C2_R = function(t_) {return Cubic(Hermite, P2_R, t_);};
        var C3_R = function(t_) {return Cubic(Hermite, P3_R, t_);};
        var C4_R = function(t_) {return Cubic(Hermite, P4_R, t_);};
        // for the left hand side boundry of racing track
        var C0_L = function(t_) {return Cubic(Hermite, P0_L, t_);};
        var C1_L = function(t_) {return Cubic(Hermite, P1_L, t_);};
        var C2_L = function(t_) {return Cubic(Hermite, P2_L, t_);};
        var C3_L = function(t_) {return Cubic(Hermite, P3_L, t_);};
        var C4_L = function(t_) {return Cubic(Hermite, P4_L, t_);};
        // for the car's moving orientation
        var C0prime = function(t_) {return Cubic(HermiteDerivative, P0, t_);};
        var C1prime = function(t_) {return Cubic(HermiteDerivative, P1, t_);};
        var C2prime = function(t_) {return Cubic(HermiteDerivative, P2, t_);};
        var C3prime = function(t_) {return Cubic(HermiteDerivative, P3, t_);};
        var C4prime = function(t_) {return Cubic(HermiteDerivative, P4, t_);};


        // Line
        var Ccomp = function(t) {
            if (t < 1){
		        var u = t;
		        return C0(u);
            } 
			else if (t > 1 && t < 2) {
		        var u = t-1.0;
		        return C1(u);
            }  
			else if (t > 2 && t < 3){
		        var u = t - 2.0;
		        return C2(u);
			}      
            else if (t > 3 && t < 4) {
                var u = t - 3.0;
                return C3(u);
            }  
            else {
                var u = t - 4.0;
                return C4(u);
            }
	    }

        // Line Tangent
        var CcompTangent = function(t) {
            if (t < 1){
                var u = t;
                return C0prime(u);
            } 
            else if (t > 1 && t < 2) {
                var u = t-1.0;
                return C1prime(u);
            }  
            else if (t > 2 && t < 3){
                var u = t - 2.0;
                return C2prime(u);
            }  
            else if (t > 3 && t < 4) {
                var u = t - 3.0;
                return C3prime(u);
            }  
            else {
                var u = t - 4.0;
                return C4prime(u);
            }      
        }

        function drawTrajectory(t_begin, t_end, intervals, C, Tx, color) {
            ctx.strokeStyle=color;
            ctx.lineWidth = 6;
            ctx.beginPath();
                moveToTx(C(t_begin), Tx);
                for(var i=1;i<=intervals;i++){
            var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
            lineToTx(C(t), Tx);
                }
                ctx.stroke();
        }

        function background() {
            ctx.fillStyle = 'rgb(102,153,204)';
            ctx.rect(0,0,700,600);
            ctx.fill();  
        }

        background();

        // Draw Race Track
        var Tblack_to_canvas = mat3.create();
        mat3.fromTranslation(Tblack_to_canvas, [330, 300]);
        mat3.scale(Tblack_to_canvas, Tblack_to_canvas, [150, -150]); 

        // draw right and left hand side of track
        drawTrajectory(0.0, 1.0, 100, C0_R, Tblack_to_canvas, "red");
        drawTrajectory(0.0, 1.0, 100, C1_R, Tblack_to_canvas, "white");
        drawTrajectory(0.0, 1.0, 100, C2_R, Tblack_to_canvas, "red");
        drawTrajectory(0.0, 1.0, 100, C3_R, Tblack_to_canvas, "white");
        drawTrajectory(0.0, 1.0, 100, C4_R, Tblack_to_canvas, "red");

        drawTrajectory(0.0, 1.0, 100, C0_L, Tblack_to_canvas, "black");
        drawTrajectory(0.0, 1.0, 100, C1_L, Tblack_to_canvas, "black");
        drawTrajectory(0.0, 1.0, 100, C2_L, Tblack_to_canvas, "black");
        drawTrajectory(0.0, 1.0, 100, C3_L, Tblack_to_canvas, "black");
        drawTrajectory(0.0, 1.0, 100, C4_L, Tblack_to_canvas, "black");
        
        //drawLine();

        var Tblue_to_blue = mat3.create();
        var Tpurple_to_blue = mat3.create();
        var Tgreen_to_blue = mat3.create();

        // make its position follow C1 curve
        mat3.fromTranslation(Tblue_to_blue, Ccomp(t1));
        mat3.fromTranslation(Tpurple_to_blue, Ccomp(t2));
        mat3.fromTranslation(Tgreen_to_blue, Ccomp(t3));
    
        var Tblue_to_canvas = mat3.create();
        var Tpurple_to_canvas = mat3.create();
        var Tgreen_to_canvas = mat3.create();

        var tangent_1 = CcompTangent(t1);
        var angle_1 = Math.atan2(tangent_1[1], tangent_1[0]);
        // orientation for purple car and blue
        var tangent_2 = CcompTangent(t2);
        var angle_2 = Math.atan2(tangent_2[1], tangent_2[0]);

        var tangent_3 = CcompTangent(t3);
        var angle_3 = Math.atan2(tangent_3[1], tangent_3[0]);
        // combine translation and orientation for blue car
        mat3.rotate(Tblue_to_blue, Tblue_to_blue, angle_1);
        mat3.multiply(Tblue_to_canvas, Tblack_to_canvas, Tblue_to_blue);
        drawCar("blue", Tblue_to_canvas);
        // combine translation and orientation for purple car
        mat3.rotate(Tpurple_to_blue, Tpurple_to_blue, angle_2);
        mat3.multiply(Tpurple_to_canvas, Tblack_to_canvas, Tpurple_to_blue);
        drawCar("purple", Tpurple_to_canvas);
        // combine translation and orientation for green car
        mat3.rotate(Tgreen_to_blue, Tgreen_to_blue, angle_3);
        mat3.multiply(Tgreen_to_canvas, Tblack_to_canvas, Tgreen_to_blue);
        drawCar("green", Tgreen_to_canvas);

    }

    draw();

}

//window.onload = setup;