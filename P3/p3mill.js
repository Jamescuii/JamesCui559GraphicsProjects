function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = 10;
    var angle = 0;
    
    function draw() {

        requestAnimationFrame(draw);
        canvas.width = canvas.width;

        angle += slider1.value*0.1;
        function moveToTx(x, m) {
            var res = vec2.create(); vec2.transformMat3(res, x, m);
            context.moveTo(res[0], res[1]);
        }
        function lineToTx(x, m) {
            var res = vec2.create(); vec2.transformMat3(res, x, m);
            context.lineTo(res[0], res[1]);
        }

                // draw a single blade
        function drawblade(m){
            context.beginPath();
            context.fillStyle = "blue";
            context.strokeStyle = "blue";
            moveToTx([0,0],m);
            lineToTx([0,8],m);
            context.stroke();
            moveToTx([-10,8],m);
            lineToTx([-10,70],m);
            lineToTx([10,70],m);
            lineToTx([10,8],m);
            context.closePath();
            context.fill();
        }
                //draw four blades by calling drawblade() and apply matrix rotate here
        function drawfourblades(T_blade_to_canvas){
                    
            drawblade(T_blade_to_canvas);
            mat3.rotate(T_blade_to_canvas,T_blade_to_canvas,-Math.PI/2);
            drawblade(T_blade_to_canvas);
            mat3.rotate(T_blade_to_canvas,T_blade_to_canvas,-Math.PI/2);
            drawblade(T_blade_to_canvas);
            mat3.rotate(T_blade_to_canvas,T_blade_to_canvas,-Math.PI/2);
            drawblade(T_blade_to_canvas);
        }

                // spining the blades by call drawfourblades() and apply a rotating angle
        function spin_blades(angle,m){
            mat3.rotate(m,m,angle);
            drawfourblades(m);
        }
                // draw backgound sky blue color
        function draw_background_upper(){
            context.fillStyle = 'rgb(0,0,0)';
            context.rect(0,0,500,500);
            context.fill();    
        }
        draw_background_upper();

        var T_blade_to_canvas = mat3.create();
        mat3.fromTranslation(T_blade_to_canvas,[250,250]);
        spin_blades(angle,T_blade_to_canvas);

    }
    draw();

}
window.onload = setup;