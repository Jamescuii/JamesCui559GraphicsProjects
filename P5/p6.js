function setup() {
    var observerCanvas = document.getElementById('observerCanvas');
    var cameraCanvas = document.getElementById('cameraCanvas');
    var observerContext = observerCanvas.getContext('2d');
    var cameraContext = cameraCanvas.getContext('2d');

    var slider1 = document.getElementById('slider1');
    slider1.value = 30;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;
    var slider3 = document.getElementById('slider3');
    slider3.value = 0;
    var rot_angle = 0;
    var context = cameraContext; // default to drawing in the camera window
    var tParam = 0;
    
    function draw() {
    requestAnimationFrame(draw);
    // clear both canvas instances
	observerCanvas.width = observerCanvas.width;
	cameraCanvas.width = cameraCanvas.width;
    rot_angle += 0.5;
	// use the sliders to get the angles
	tParam += slider1.value*0.00005;
    var curveChange = slider3.value;
    if (tParam > 3){
		tParam = 0.0;
	}
    var viewAngle = slider2.value*0.02*Math.PI;
     

	function moveToTx(loc, Tx)
	{var res=vec3.create(); vec3.transformMat4(res, loc, Tx); context.moveTo(res[0], res[1]);}

	function lineToTx(loc, Tx)
	{var res=vec3.create(); vec3.transformMat4(res, loc, Tx); context.lineTo(res[0], res[1]);}

    function drawCube(linecolor, TxU, scale, calc) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx, Tx, [scale, scale, scale]);
        
        //if (calc == 0) {
            //tbd = [0, 0, 0, 0, 0, 0];
        //}
        
        /*
        context.fillStyle="purple";

        context.strokeStyle=linecolor;
        context.beginPath();

        moveToTx([0,0,40],Tx);
        lineToTx([40,0,40],Tx);
        lineToTx([40,40,40],Tx);
        lineToTx([0,40,40],Tx);
        lineToTx([0,0,40],Tx);
        context.fill();

        moveToTx([0,0,0],Tx);
        lineToTx([40,0,0],Tx);
        lineToTx([40,40,0],Tx);
        lineToTx([0,40,0],Tx);
        lineToTx([0,0,0],Tx);
        context.fill();
        
        moveToTx([0,0,0],Tx);
        lineToTx([0,0,40],Tx);
        lineToTx([0,40,40],Tx);
        lineToTx([0,40,0],Tx);
        lineToTx([0,0,0],Tx);
        context.fill();
        moveToTx([0,0,0],Tx);
        lineToTx([0,0,40],Tx);
        lineToTx([40,0,40],Tx);
        lineToTx([40,0,0],Tx);
        lineToTx([0,0,0],Tx);
        context.fill();
        moveToTx([40,0,0],Tx);
        lineToTx([40,0,40],Tx);
        lineToTx([40,40,40],Tx);
        lineToTx([40,40,0],Tx);
        lineToTx([40,0,0],Tx);
        context.fill();
        context.stroke();
        context.closePath();
        */
        //const Point3D = function(x, y, z) { this.x = x; this.y = y; this.z = z; };
        let one = calc;
        let vertices = [[0, 0, 0],
            [40, 0, 0],
            [40, 40, 0],
            [0, 40, 0],
            [0, 0, 40],
            [40, 0, 40],
            [40, 40, 40],
        [0, 40, 40]];

        let faces = [[0, 1, 2, 3], [0, 4, 5, 1], [1, 5, 6, 2], [3, 2, 6, 7], [0, 3, 7, 4], [4, 7, 6, 5]];

        for (let index = faces.length - 1; index > -1; -- index) {

            let face = faces[index];

            let pmid = [0, 0, 0];
            vec3.transformMat4(pmid, [20, 20, 20], Tx);
            //let eyeCam = [0, 0, 0];
            //vec3.transformMat4(eyeCam, [eyeCam[0], eyeCam[1], eyeCam[2]], Tx);
  
            let p1 = [0, 0, 0];
            let p2 = [0, 0, 0];
            let p3 = [0, 0, 0];
            vec3.transformMat4(p1, vertices[face[0]], Tx);
            vec3.transformMat4(p2, vertices[face[1]], Tx);
            vec3.transformMat4(p3, vertices[face[2]], Tx);
  
            let v1 = [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]];
            let v2 = [p3[0] - p1[0], p3[1] - p1[1] , p3[2] - p1[2]];
  
            let n  = [v1[1] * v2[2] - v1[2] * v2[1], v1[2] * v2[0] - v1[0] * v2[2], v1[0] * v2[1] - v1[1] * v2[0]];
            if(index != 4 || index != 2) {
                if ((390-pmid[0]) * n[0] + (265-pmid[1]) * n[1] + (195-pmid[2]) * n[2] <= 0) {
                context.fillStyle="purple";
                context.lineWidth = '2';
                context.strokeStyle=linecolor;
                context.beginPath();
                moveToTx(vertices[face[0]], Tx);
                lineToTx(vertices[face[1]], Tx);
                lineToTx(vertices[face[2]], Tx);
                lineToTx(vertices[face[3]], Tx);
                context.closePath();
                context.fill();
                context.stroke();
    
                }
            }
            else {
                if ((200-pmid[0]) * n[0] + (360-pmid[1]) * n[1] + (200-pmid[2]) * n[2] <= 0) {
                //if ((eyeCamera[0]-pmid[0]) * n[0] + (eyeCamera[1]-pmid[1]) * n[1] + (eyeCamera[2]-pmid[2]) * n[2] >= 0) {
                    context.fillStyle="purple";
                    context.lineWidth = '2';
                    context.strokeStyle=linecolor;
                    context.beginPath();
                    moveToTx(vertices[face[0]], Tx);
                    lineToTx(vertices[face[1]], Tx);
                    lineToTx(vertices[face[2]], Tx);
                    lineToTx(vertices[face[3]], Tx);
                    context.closePath();
                    context.fill();
                    context.stroke();
        
                    }
            }
            
          }


        
        /*
        let pmid = [20, 20, 20];
        vec3.transformMat4(pmid, [20, 20, 20], Tx);
        
        let p1a = [0, 40, 0];
        let p2a = [40, 40, 0];
        let p3a = [40, 40, 40];
        vec3.transformMat4(p1a, [0, 40, 0], Tx);
        vec3.transformMat4(p2a, [40, 40, 0], Tx);
        vec3.transformMat4(p3a, [40, 40, 40], Tx);

        let v1a = [p2a[0] - p1a[0], p2a[1] - p1a[1], p2a[2] - p1a[2]];
        let v2a = [p3a[0] - p1a[0], p3a[1] - p1a[1], p3a[2] - p1a[2]];

        let na = [v1a[1]*v2a[2] - v1a[2]*v2a[1], v1a[2]*v2a[0] - v1a[0]*v2a[2], v1a[0]*v2a[1] - v1a[1]*v2a[0]];
        vec3.normalize(na, na);
        //let na = [0, 1, 0];
        // -p1.x * n.x + -p1.y * n.y + -p1.z * n.z <= 0
        // (na[0]*eyeCamera[0] + na[1]*eyeCamera[1] + -eyeCamera[2]*na[2]) > 0
        //dot product of na with cam - center of cube
        if(((calc == 0) && ((na[0]*(eyeCamera[0]-pmid[0]) + na[1]*(eyeCamera[1]-pmid[1]) + na[2]*(eyeCamera[2]-pmid[2])) <= 0)) || (calc == 1 && tbd[0] ==1)) {
            if (calc == 0) {
                tbd[0] = 1;
            }
            context.fillStyle="purple"; // y

            context.beginPath();
            moveToTx([0, 40, 0], Tx);
            lineToTx([40, 40, 0], Tx);
            lineToTx([40, 40, 40], Tx);
            lineToTx([0, 40, 40], Tx);
            //lineToTx([0, 40, 0], Tx);
            context.closePath();
            context.fill();
            context.stroke();
        }
        
        let p1b = [0, 0, 0];
        let p2b = [0, 0, 40];
        let p3b = [0, 40, 40];
        
        vec3.transformMat4(p1b, [0, 0, 0], Tx);
        vec3.transformMat4(p2b, [0, 0, 40], Tx);
        vec3.transformMat4(p3b, [0, 40, 40], Tx);
        let v1b = [p2b[0] - p1b[0], p2b[1] - p1b[1], p2b[2] - p1b[2]];
        let v2b = [p3b[0] - p1b[0], p3b[1] - p1b[1], p3b[2] - p1b[2]];

        let nb = [v1b[1]*v2b[2] - v1b[2]*v2b[1], v1b[2]*v2b[0] - v1b[0]*v2b[2], v1b[0]*v2b[1] - v1b[1]*v2b[0]];
        // (eyeCamera[0]*nb[0] + eyeCamera[1]*nb[1] + -eyeCamera[2]*nb[2]
        //let nb = [-1, 0, 0];
        if(((calc == 0) && ((nb[0]*(eyeCamera[0]-pmid[0]) + nb[1]*(eyeCamera[1]-pmid[1]) + nb[2]*(eyeCamera[2]-pmid[2])) <= 0)) || (calc == 1 && tbd[1] ==1)) {
            if (calc == 0) {
                tbd[1] = 1;
            }
            context.fillStyle="orange" // -x
            context.beginPath();
            moveToTx([0, 0, 0], Tx);
            lineToTx([0, 0, 40], Tx);
            lineToTx([0, 40, 40], Tx);
            lineToTx([0, 40, 0], Tx);
            //lineToTx([0, 0, 0], Tx);
            context.closePath();
            context.fill();
            context.stroke();
        }
        
        let p1c = [0, 0, 40];
        let p2c = [40, 0, 40];
        let p3c = [40, 40, 40];
        vec3.transformMat4(p1c, [0, 0, 40], Tx);
        vec3.transformMat4(p2c, [40, 0, 40], Tx);
        vec3.transformMat4(p3c, [40, 40, 40], Tx);
        let v1c = [p2c[0] - p1c[0], p2c[1] - p1c[1], p2c[2] - p1c[2]];
        let v2c = [p3c[0] - p1c[0], p3c[1] - p1c[1], p3c[2] - p1c[2]];
        
        let nc = [v1c[1]*v2c[2] - v1c[2]*v2c[1], v1c[2]*v2c[0] - v1c[0]*v2c[2], v1c[0]*v2c[1] - v1c[1]*v2c[0]];


        //let nc = [0, 0, 1];
        if(((calc == 0) && ((nc[0]*(eyeCamera[0]-pmid[0]) + nc[1]*(eyeCamera[1]-pmid[1]) + nc[2]*(eyeCamera[2]-pmid[2])) <= 0)) || (calc == 1 && tbd[2] ==1)) {
            if (calc == 0) {
                tbd[2] = 1;
            }
            context.fillStyle="yellow"; // z
            context.beginPath();
            moveToTx([0, 0, 40], Tx);
            lineToTx([40, 0, 40], Tx);
            lineToTx([40, 40, 40], Tx);
            lineToTx([0, 40, 40], Tx);
            //lineToTx([0, 0, 40], Tx);
            context.closePath();
            context.fill();
            context.stroke();
        }
        
        let p1d = [0, 0, 0];
        let p2d = [0, 0, 40];
        let p3d = [40, 0, 40];
        vec3.transformMat4(p1d, [0, 0, 0], Tx);
        vec3.transformMat4(p2d, [0, 0, 40], Tx);
        vec3.transformMat4(p3d, [40, 0, 40], Tx);
        let v1d = [p2d[0] - p1d[0], p2d[1] - p1d[1], p2d[2] - p1d[2]];
        let v2d = [p3d[0] - p1d[0], p3d[1] - p1d[1], p3d[2] - p1d[2]];

        let nd = [v1d[1]*v2d[2] - v1d[2]*v2d[1], v1d[2]*v2d[0] - v1d[0]*v2d[2], v1d[0]*v2d[1] - v1d[1]*v2d[0]];
        
        //let nd = [0, -1, 0];
        if(((calc == 0) && ((nd[0]*(eyeCamera[0]-pmid[0]) + nd[1]*(eyeCamera[1]-pmid[1]) + nd[2]*(eyeCamera[2]-pmid[2])) <= 0)) || (calc == 1 && tbd[3] ==1)) {
            if (calc == 0) {
                tbd[3] = 1;
            }
            context.fillStyle="green"; // -y
            context.beginPath();
            moveToTx([0, 0, 0], Tx);
            lineToTx([0, 0, 40], Tx);
            lineToTx([40, 0, 40], Tx);
            lineToTx([40, 0, 0], Tx);
            //lineToTx([0, 0, 0], Tx);
            context.closePath();
            context.fill();
            context.stroke();
        }
        
        let p1e = [40, 0, 0];
        let p2e = [40, 0, 40];
        let p3e = [40, 40, 40];
        vec3.transformMat4(p1e, [40, 0, 0], Tx);
        vec3.transformMat4(p2e, [40, 0, 40], Tx);
        vec3.transformMat4(p3e, [40, 40, 40], Tx);
        let v1e = [p2e[0] - p1e[0], p2e[1] - p1e[1], p2e[2] - p1e[2]];
        let v2e = [p3e[0] - p1e[0], p3e[1] - p1e[1], p3e[2] - p1e[2]];

        let ne = [v1e[1]*v2e[2] - v1e[2]*v2e[1], v1e[2]*v2e[0] - v1e[0]*v2e[2], v1e[0]*v2e[1] - v1e[1]*v2e[0]];
        
        //let ne = [1, 0, 0];
        if(((calc == 0) && ((ne[0]*(eyeCamera[0]-pmid[0]) + ne[1]*(eyeCamera[1]-pmid[1]) + ne[2]*(eyeCamera[2]-pmid[2])) <= 0)) || (calc == 1 && tbd[4] ==1)) {
            if (calc == 0) {
                tbd[4] = 1;
            }
            context.fillStyle="blue"; // x
            context.beginPath();
            moveToTx([40, 0, 0], Tx);
            lineToTx([40, 0, 40], Tx);
            lineToTx([40, 40, 40], Tx);
            lineToTx([40, 40, 0], Tx);
            //lineToTx([40, 0, 0], Tx);
            context.closePath();
            context.fill();
            context.stroke();
        }
        
        let p1f = [0, 0, 0];
        let p2f = [40, 0, 0];
        let p3f = [40, 40, 0];
        vec3.transformMat4(p1f, [0, 0, 0], Tx);
        vec3.transformMat4(p2f, [40, 0, 0], Tx);
        vec3.transformMat4(p3f, [40, 40, 0], Tx);
        let v1f = [p2f[0] - p1f[0], p2f[1] - p1f[1], p2f[2] - p1f[2]];
        let v2f = [p3f[0] - p1f[0], p3f[1] - p1f[1], p3f[2] - p1f[2]];

        let nf = [v1f[1]*v2f[2] - v1f[2]*v2f[1], v1f[2]*v2f[0] - v1f[0]*v2f[2], v1f[0]*v2f[1] - v1f[1]*v2f[0]];
        
        //let nf = [0, 0, -1];
        if(((calc == 0) && ((nf[0]*(eyeCamera[0]-pmid[0]) + nf[1]*(eyeCamera[1]-pmid[1]) + nf[2]*(eyeCamera[2]-pmid[2])) <= 0)) || (calc == 1 && tbd[5] ==1)) {
            if (calc == 0) {
                tbd[5] = 1;
            }
            context.fillStyle="red"; // -z
            // Axes
            context.beginPath();
            moveToTx([0, 0, 0], Tx);
            lineToTx([40, 0, 0], Tx);
            lineToTx([40,40, 0], Tx);
            lineToTx([0, 40, 0], Tx);
            //lineToTx([0, 0, 0], Tx);
            context.closePath();
            context.fill();
            context.stroke();
        }
        */

    }
    
    function drawCubeCam(linecolor, TxU, scale, calc) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx, Tx, [scale, scale, scale]);

        //const Point3D = function(x, y, z) { this.x = x; this.y = y; this.z = z; };
        let one = calc;
        let vertices = [[0, 0, 0],
            [40, 0, 0],
            [40, 40, 0],
            [0, 40, 0],
            [0, 0, 40],
            [40, 0, 40],
            [40, 40, 40],
        [0, 40, 40]];

        let faces = [[0, 1, 2, 3], [0, 4, 5, 1], [1, 5, 6, 2], [3, 2, 6, 7], [0, 3, 7, 4], [4, 7, 6, 5]];

        for (let index = faces.length - 1; index > -1; -- index) {

            let face = faces[index];

            let pmid = [0, 0, 0];
            vec3.transformMat4(pmid, [20, 20, 20], Tx);
            //let eyeCam = [0, 0, 0];
            //vec3.transformMat4(eyeCam, [eyeCam[0], eyeCam[1], eyeCam[2]], Tx);
  
            let p1 = [0, 0, 0];
            let p2 = [0, 0, 0];
            let p3 = [0, 0, 0];
            vec3.transformMat4(p1, vertices[face[0]], Tx);
            vec3.transformMat4(p2, vertices[face[1]], Tx);
            vec3.transformMat4(p3, vertices[face[2]], Tx);
  
            let v1 = [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]];
            let v2 = [p3[0] - p1[0], p3[1] - p1[1] , p3[2] - p1[2]];

            let xx = 150*Math.sin(viewAngle);
            let yy = 100;
            let zz = 120*Math.cos(viewAngle);  
  
            let n  = [v1[1] * v2[2] - v1[2] * v2[1], v1[2] * v2[0] - v1[0] * v2[2], v1[0] * v2[1] - v1[1] * v2[0]];
            if(index != 4 || index != 2) {
                if ((xx+250-pmid[0]) * n[0] + (yy-pmid[1]) * n[1] + (zz+3500-pmid[2]) * n[2] <= 0) {
                context.fillStyle="purple";
                context.lineWidth = '2';
                context.strokeStyle=linecolor;
                context.beginPath();
                moveToTx(vertices[face[0]], Tx);
                lineToTx(vertices[face[1]], Tx);
                lineToTx(vertices[face[2]], Tx);
                lineToTx(vertices[face[3]], Tx);
                context.closePath();
                context.fill();
                context.stroke();
    
                }
            }
            else {
                if ((xx+250-pmid[0]) * n[0] + (yy-pmid[1]) * n[1] + (zz+600-pmid[2]) * n[2] <= 0) {
                //if ((eyeCamera[0]-pmid[0]) * n[0] + (eyeCamera[1]-pmid[1]) * n[1] + (eyeCamera[2]-pmid[2]) * n[2] >= 0) {
                    context.fillStyle="purple";
                    context.lineWidth = '2';
                    context.strokeStyle=linecolor;
                    context.beginPath();
                    moveToTx(vertices[face[0]], Tx);
                    lineToTx(vertices[face[1]], Tx);
                    lineToTx(vertices[face[2]], Tx);
                    lineToTx(vertices[face[3]], Tx);
                    context.closePath();
                    context.fill();
                    context.stroke();
        
                    }
            }
            
          }
        }
	
    function drawCamera(color, TxU, scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx, Tx, [scale, scale, scale]);
        context.beginPath();
	    context.strokeStyle = color;
        // Twelve edges of a cropped pyramid
        moveToTx([-3, -3, -2], Tx);lineToTx([3, -3, -2], Tx);
        lineToTx([3, 3, -2], Tx);lineToTx([-3, 3, -2], Tx);
        moveToTx([3, -3, -2], Tx);lineToTx([2, -2, 0], Tx);
        lineToTx([2, 2, 0], Tx);lineToTx([3, 3, -2], Tx);
        moveToTx([2, -2, 0], Tx);lineToTx([-2, -2, 0], Tx);
        lineToTx([-2, 2, 0], Tx);lineToTx([2, 2, 0], Tx);
        moveToTx([-2, -2, 0], Tx);lineToTx([-3, -3, -2], Tx);
        lineToTx([-3, 3, -2], Tx);lineToTx([-2, 2, 0], Tx);
        context.stroke();
    }
      
    function draw3DAxes(color, TxU, scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx, Tx, [scale, scale, scale]);

        context.strokeStyle=color;
	    context.beginPath();
	    // Axes
	    moveToTx([1.2, 0, 0], Tx);lineToTx([0, 0, 0], Tx);lineToTx([0, 1.2, 0], Tx);
        moveToTx([0, 0, 0], Tx);lineToTx([0, 0, 1.2], Tx);
	    // Arrowheads
	    moveToTx([1.1, .05, 0], Tx);lineToTx([1.2, 0, 0], Tx);lineToTx([1.1, -.05, 0], Tx);
	    moveToTx([.05, 1.1, 0], Tx);lineToTx([0, 1.2, 0], Tx);lineToTx([-.05, 1.1, 0], Tx);
      	moveToTx([.05, 0, 1.1], Tx);lineToTx([0, 0, 1.2], Tx);lineToTx([-.05, 0, 1.1], Tx);
	    // X-label
	    moveToTx([1.3, -.05, 0], Tx);lineToTx([1.4, .05, 0], Tx);
	    moveToTx([1.3, .05, 0], Tx);lineToTx([1.4, -.05, 0], Tx);
        // Y-label
        moveToTx([-.05, 1.4, 0], Tx);lineToTx([0, 1.35, 0], Tx);lineToTx([.05, 1.4, 0], Tx);
        moveToTx([0, 1.35, 0], Tx);lineToTx([0, 1.28, 0], Tx);
	    // Z-label
	    moveToTx([-.05, 0, 1.3], Tx);
	    lineToTx([.05, 0, 1.3], Tx);
	    lineToTx([-.05, 0, 1.4], Tx);
	    lineToTx([.05, 0, 1.4], Tx);

	    context.stroke();
	}

    function draw2DAxes(color, Tx) {
	    context.strokeStyle=color;
	    context.beginPath();
	    // Axes
	    moveToTx([120, 0, 0], Tx);lineToTx([0, 0, 0], Tx);lineToTx([0, 120, 0], Tx);
	    // Arrowheads
	    moveToTx([110, 5, 0], Tx);lineToTx([120, 0, 0], Tx);lineToTx([110, -5, 0], Tx);
	    moveToTx([5, 110, 0], Tx);lineToTx([0, 120, 0], Tx);lineToTx([-5, 110, 0], Tx);
	    // X-label
	    moveToTx([130, 0, 0], Tx);lineToTx([140, 10, 0], Tx);
	    moveToTx([130, 10, 0], Tx);lineToTx([140, 0, 0], Tx);
        // Y-label
        moveToTx([0, 128, 0], Tx);lineToTx([5, 133, 0], Tx);lineToTx([10, 128, 0], Tx);
        moveToTx([5, 133, 0], Tx);lineToTx([5, 140, 0], Tx);
	    context.stroke();
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

	function Cubic(basis, P, t){
	    var b = basis(t);
	    var result=vec3.create();
	    vec3.scale(result, P[0], b[0]);
	    vec3.scaleAndAdd(result, result, P[1], b[1]);
	    vec3.scaleAndAdd(result, result, P[2], b[2]);
	    vec3.scaleAndAdd(result, result, P[3], b[3]);
	    return result;
	}

	var p0=[100-curveChange*0.1, 50+curveChange*3, 100];
	var d0=[0, -150, -100];
	var p1=[-50, -60, -150];
	var d1=[-50, 0, 0];
	var p2=[20, 150, 150];
	var d2=[50, 150, 100];

	var P0 = [p0, d0, p1, d1];
	var P1 = [p1, d1, p2, d2]; 
    var P2 = [p2, d2, p0, d0];

    var tbd = [0, 0, 0, 0, 0, 0];

	var C0 = function(t_) {return Cubic(Hermite, P0, t_);};
	var C1 = function(t_) {return Cubic(Hermite, P1, t_);};
	var C2 = function(t_) {return Cubic(Hermite, P2, t_);};

    var C0prime = function(t_) {return Cubic(HermiteDerivative, P0, t_);};
	var C1prime = function(t_) {return Cubic(HermiteDerivative, P1, t_);};
	var C2prime = function(t_) {return Cubic(HermiteDerivative, P2, t_);};
      
    // three piece-wise parametric combine together (position)
	var Ccomp = function(t) {
        if (t<1){
            var u = t;
            return C0(u);
        } 
        else if (t>1 && t<2) {
            var u = t-1.0;
            return C1(u);
        }  
        else {
            var u = t - 2.0;
            return C2(u);
        }        
    }

    var Ccomp_tangent = function(t) {
        if (t<1){
            var u = t;
            return C0prime(u);
        } 
        else if (t>1 && t<2) {
            var u = t-1.0;
            return C1prime(u);
        }
        else {
            var u = t - 2.0;
            return C2prime(u);
        }
    }

    var CameraCurve = function(angle) {
        var distance = 120.0;
        var eye = vec3.create();
        eye[0] = distance*Math.sin(viewAngle);
        eye[1] = 100;
        eye[2] = distance*Math.cos(viewAngle);  
        return [eye[0], eye[1], eye[2]];
    }

    function drawTrajectory(t_begin, t_end, intervals, C, Tx, color) {
	    context.strokeStyle=color;
	    context.beginPath();
        moveToTx(C(t_begin), Tx);
        for(var i=1;i<=intervals;i++){
            var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
            lineToTx(C(t), Tx);
        }
        context.stroke();
	}


    // Create model transform
    var Tmodel = mat4.create();
	mat4.fromTranslation(Tmodel, Ccomp(tParam));
    var tangent = Ccomp_tangent(tParam);
    var angle = Math.atan2(tangent[1],tangent[0]);
	mat4.rotateZ(Tmodel,Tmodel,angle);

    // Create Camera (lookAt) transform
    //var eyeCamera = Ccomp(tParam);
    var eyeCamera = CameraCurve(viewAngle);
    var targetCamera = vec3.fromValues(0, 0, 0); // Aim at the origin of the world coords
    var upCamera = vec3.fromValues(0, 100, 0); // Y-axis of world coords to be vertical
	var TlookAtCamera = mat4.create();
    mat4.lookAt(TlookAtCamera, eyeCamera, targetCamera, upCamera);
      
    // Create Observer (lookAt) transform
    var eyeObserver = vec3.fromValues(500, 300, 500);
    var targetObserver = vec3.fromValues(0, 50, 0); // Observer still looks at origin
    var upObserver = vec3.fromValues(0, 1, 0); // Y-axis of world coords to be vertical
	var TlookAtObserver = mat4.create();
    mat4.lookAt(TlookAtObserver, eyeObserver, targetObserver, upObserver);
      
    // Create ViewPort transform
    var Tviewport = mat4.create();
	mat4.fromTranslation(Tviewport, [200, 300, 0]);  // Move the center of lookAt to 220, 300
	mat4.scale(Tviewport, Tviewport, [100, -100, 1]); // Flip the Y-axis, and scale everything by 100
    // make sure you understand these    

    context = cameraContext;

    // Create Camera projection transform
    // (orthographic for now)
    var TprojectionCamera = mat4.create();
    mat4.ortho(TprojectionCamera, -100, 100, -100, 100, -1, 1);
    // Create Observer projection transform
    // (orthographic for now)
    var TprojectionObserver = mat4.create();
    mat4.ortho(TprojectionObserver, -120, 120, -120, 120, -1, 1);
     
    // Create transform t_VP_PROJ_CAM that incorporates
    // Viewport, projection and camera transforms
    var tVP_PROJ_VIEW_Camera = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Camera, Tviewport, TprojectionCamera);
    mat4.multiply(tVP_PROJ_VIEW_Camera, tVP_PROJ_VIEW_Camera, TlookAtCamera);
    var tVP_PROJ_VIEW_Observer = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Observer, Tviewport, TprojectionObserver);
    mat4.multiply(tVP_PROJ_VIEW_Observer, tVP_PROJ_VIEW_Observer, TlookAtObserver);
      
	

    // Create transform t_VP_PROJ_VIEW_MOD that incorporates
    // Viewport, projection, camera, and modeling transform
    var tVP_PROJ_VIEW_MOD_Camera = mat4.create();
	mat4.multiply(tVP_PROJ_VIEW_MOD_Camera, tVP_PROJ_VIEW_Camera, Tmodel);
    var tVP_PROJ_VIEW_MOD1_Observer = mat4.create();
	mat4.multiply(tVP_PROJ_VIEW_MOD1_Observer, tVP_PROJ_VIEW_Observer, Tmodel);
    var tVP_PROJ_VIEW_MOD2_Observer = mat4.create();
    mat4.translate(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_Observer, eyeCamera);
	var TlookFromCamera = mat4.create();
    mat4.invert(TlookFromCamera, TlookAtCamera);
    mat4.multiply(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_MOD2_Observer, TlookFromCamera);

    // Observer window
    context = observerContext;
	draw3DAxes("black", tVP_PROJ_VIEW_Observer, 100.0);  
    drawTrajectory(0.0, 1.0, 100, C0, tVP_PROJ_VIEW_Observer, "blue");
    drawTrajectory(0.0, 1.0, 100, C1, tVP_PROJ_VIEW_Observer, "blue");
    drawTrajectory(0.0, 1.0, 100, C2, tVP_PROJ_VIEW_Observer, "blue");
    if(0 <= tParam <= 1) {
        drawCube("black", tVP_PROJ_VIEW_MOD1_Observer, 1, 0);
    }
    else if(1 < tParam <= 2) {
        drawCube("black", tVP_PROJ_VIEW_MOD1_Observer, 1, 0);
    }
    else {
        drawCube("black", tVP_PROJ_VIEW_MOD1_Observer, 1, 0);
    }   
    drawCamera("purple", tVP_PROJ_VIEW_MOD2_Observer, 8.0); 

    // Camera window
    context = cameraContext;
    draw2DAxes("black", mat4.create());
	draw3DAxes("black", tVP_PROJ_VIEW_Camera, 100.0);
	drawTrajectory(0.0, 1.0, 100, C0, tVP_PROJ_VIEW_Camera, "blue");
    drawTrajectory(0.0, 1.0, 100, C1, tVP_PROJ_VIEW_Camera, "blue");
    drawTrajectory(0.0, 1.0, 100, C2, tVP_PROJ_VIEW_Camera, "blue");
    draw3DAxes("green", tVP_PROJ_VIEW_MOD_Camera, 100.0); // Uncomment to see "model" coords
    drawCubeCam("black", tVP_PROJ_VIEW_MOD_Camera, 1, 1);
    }
    
    draw();
}
//window.onload = setup;