class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-1, 1), random(-1, 1));
  }

  update() {
    this.pos.add(this.vel);
    this.edges();
  }

  show() {
    noStroke();
    fill(200, 10);
    ellipse(this.pos.x, this.pos.y, 4);
  }

  edges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }

    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  connect(particles) {
    particles.forEach((particle) => {
      const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      if (d < 100) {
        stroke(200, 10);
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }

  repelMouse() {
    const mousePos = createVector(mouseX, mouseY);
    const distToMouse = this.pos.dist(mousePos);

    if (distToMouse < 50) {
      const repelForce = p5.Vector.sub(this.pos, mousePos);
      repelForce.normalize();
      repelForce.mult(5);

      this.pos.add(repelForce);
      this.edges();
    }
  }
}

let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  const numParticles = (windowWidth * windowHeight) / 10000;
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  particles.forEach((particle) => {
    particle.update();
    particle.show();
    particle.connect(particles);
    particle.repelMouse();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
