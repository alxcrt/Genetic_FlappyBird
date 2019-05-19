class Bird {
  constructor(brain) {
    // Crate newHeight because swe whant to add the ground
    this.newHeight = height - groundImg.height;

    this.y = this.newHeight / 2;
    this.x = 64;

    this.gravity = 0.8;
    this.lift = -10;
    this.velocity = 0;

    this.score = 0;
    this.fitness = 0;

    this.angle = 0;
    this.birdImg = birdImg;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuronalNetwork(5, 10, 2);
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.birdImg, 0, 0, this.birdImg.width, this.birdImg.height);
    pop();
  }

  think(pipes) {
    //Find closest pipe
    let closest = null;
    let record = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let diff = pipes[i].x + pipes[i].w - this.x;
      if (diff < record && diff > 0) {
        record = diff;
        closest = pipes[i];
      }
    }
    //console.log(closest.top);
    if (closest != null) {
      let input = [];
      input[0] = this.y / this.newHeight;
      input[1] = closest.top / this.newHeight;
      input[2] = closest.bottom / this.newHeight;
      input[3] = closest.x / width;
      input[4] = this.velocity / 10;

      let output = this.brain.predict(input);
      //console.log(output);
      if (output[0] > output[1]) {
        this.up();
      }
    }
  }

  offscreen() {
    return this.y > this.newHeight || this.y < 0;
  }

  update() {
    this.score += 1;

    this.velocity += this.gravity;

    if (this.velocity < -10) this.velocity = -10; //limit upward vel
    if (this.velocity > 20) this.velocity = 20; //limit downward vel
    this.y += this.velocity;

    this.angle = map(this.velocity, -10, 20, -PI / 6, PI / 6); //set angle based on upward / downward velocity
  }

  up() {
    this.velocity += this.lift;
  }

  mutate() {
    this.brain.mutate(0.1);
  }
}
