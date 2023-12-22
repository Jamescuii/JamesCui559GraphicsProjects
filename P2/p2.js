function setup() {

    const canvas = document.getElementById("myCanvas");
    var slider1 = document.getElementById('slider1');
    const ctx = canvas.getContext("2d");

    function draw() {
        // Function to draw a car
        function drawCar(color) {
            // Draw the car body
            ctx.save();
            ctx.scale(2, 2);
            //ctx.restore();

            ctx.fillStyle = color;
            ctx.fillRect(-50, -20, 100, 40);

            // Draw the car windows
            ctx.fillStyle = "lightblue";
            ctx.fillRect(-40, -10, 25, 20);
            ctx.fillRect(15, -10, 25, 20);

            // Draw the wheels
            ctx.save(); // Save the current canvas state

            // Left wheel
            ctx.translate(-25, 20); // Position the left wheel
            ctx.rotate(wheelRotationOne); // Rotate the left wheel
            ctx.fillStyle = "black";
            ctx.fillRect(-10, -10, 20, 20);

            ctx.restore(); // Restore the canvas state (before drawing the right wheel)

            // Right wheel
            ctx.save(); // Save the current canvas state
            ctx.translate(25, 20); // Position the right wheel independently
            ctx.rotate(wheelRotationOne); // Rotate the right wheel
            ctx.fillStyle = "black";
            ctx.fillRect(-10, -10, 20, 20);

            ctx.restore(); // Restore the canvas state (after drawing the right wheel)
            //ctx.restore();
            //slider1.addEventListener("input",animate);
        }

        let carXOne = 100;
        let wheelRotationOne = 0;
        let wheelRotationTwo = 0;

        // Function to animate the car
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

            // Translate the canvas to move the car
            ctx.save(); // Save the current canvas state
            ctx.translate(carXOne, 200);

            // Draw the car
            drawCar("blue");
            //ctx.save();
            //ctx.translate(carXTwo,100);
            drawCar("green");

            ctx.restore(); // Restore the canvas state (after car transformations)

            // Rotate the wheels
            wheelRotationOne += 0.1;

            // Update car position
            carXOne += 2;
            if (carXOne > canvas.width + 50) {
                carXOne = -50; // Reset car position
            }

            //slider1.addEventListener("input",draw);
            requestAnimationFrame(animate); // Repeat the animation
        }

        animate(); // Start the animation
    }
    draw();
}
window.onload = setup;