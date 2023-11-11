const baseHue = Math.floor(Math.random() * 360);
// const baseHue = random(0, 360);

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector(0, 0);
    this.size = random(5, 15);
    this.color = color(
      random(baseHue, baseHue + 40),
      random(30, 40),
      random(90, 100)
    );
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.edges();
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  edges() {
    if (this.pos.x > width || this.pos.x < 0) {
      this.vel.x *= -1;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      this.vel.y *= -1;
    }
  }

  repelMouse() {
    const mousePos = createVector(mouseX, mouseY);
    const distToMouse = this.pos.dist(mousePos);

    if (distToMouse < 200) {
      const repelForce = p5.Vector.sub(this.pos, mousePos);
      repelForce.normalize();
      repelForce.div(distToMouse);
      repelForce.mult(5);

      this.applyForce(repelForce);
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }
}

const particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);

  const numParticles = (windowWidth * windowHeight) / 5000;

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background("transparent");

  for (const particle of particles) {
    particle.repelMouse();
    particle.update();
    particle.show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
