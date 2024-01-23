function setup() {

    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    //let wheelAngle = 0;
    class Car {
        constructor(canvas, x, y, angle) {
          this.canvas = canvas;
          this.x = x;
          this.y = y;
          this.angle = angle;
          this.wheelAngle = [0, 0];
          this.wheelSpeed = [0.5, 0.5];
          this.speed = 3;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
        
            // Draw the car body
            ctx.scale(2, 2); 

            ctx.fillStyle = "yellow";
            ctx.fillRect(-50, -20, 100, 40);

            ctx.fillStyle = "lightblue";
            ctx.fillRect(-40, -10, 20, 20);
            ctx.fillRect(-10, -10, 20, 20);
            ctx.fillRect(15, -10, 20, 20);
            
            // Draw the wheels
            ctx.save();
            ctx.translate(10, -25);
            ctx.rotate(this.wheelAngle[0]);
            ctx.fillStyle = "black";
            ctx.fillRect(-5, -5, 10, 10);
            ctx.restore();
            /*
            ctx.save();
            ctx.translate(10, -25);
            ctx.rotate(this.wheelAngle[0]);
            ctx.restore();
            */
            ctx.save();
            ctx.scale(1.3, 1.3);
            ctx.translate(-25, -25);
            ctx.rotate(this.wheelAngle[1]);
            ctx.fillStyle = "black";
            ctx.fillRect(-5, -5, 10, 10);
            ctx.restore();

            //
            
            ctx.restore();
            
        }
      
        update() {
            this.x += this.speed * Math.cos(this.angle);
            this.y += this.speed * Math.sin(this.angle);
        
            // Keep the car on the screen
            if (this.x < 0) {
              this.x = this.x + 1000;
            } else if (this.x > this.canvas.width) {
              this.x = this.x - 1000;
            }
        
            if (this.y < 0) {
              this.y = this.y + 1000;
            } else if (this.y > this.canvas.height) {
              this.y = this.y - 1000;
            }

            // Rotate the wheels
            for (let i = 0; i < 2; i++) {
              this.wheelAngle[i] += this.wheelSpeed[i];
            }
          }
        
          moveInSPattern() {
            this.angle += 0.03 * Math.sin(this.x / 100) + 0.001;
          }
        }
      
      
      // Create an array of cars
      const cars = [];
      for (let i = 0; i < 3; i++) {
        const car = new Car(ctx, 100 + i * 100, 500, 300);
        cars.push(car);
      }
      
      // Animate the cars
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Move and draw each car
        for (const car of cars) {
          car.moveInSPattern();
          car.update();
          car.draw();
        }
      
        // Request the next animation frame
        requestAnimationFrame(animate);
      }
      
      // Start the animation
      animate();
}

window.onload = setup;
