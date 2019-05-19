class Pipe {
  constructor() {
    // Crate newHeight because swe whant to add the ground
    this.newHeight = height - groundImg.height;

    this.pipeImg = pipeImg;
    this.pipeImgR = pipeImgR;
    // How big is the empty space
    let spacing = 100;
    // Where is th center of the empty space
    let centery = random(spacing, this.newHeight - spacing);

    // Top and bottom of pipe
    this.top = centery - spacing / 2;
    this.bottom = this.newHeight - (centery + spacing / 2);
    // Starts at the edge
    this.x = width;
    // Width of pipe
    this.w = pipeImg.width;
    // How fast
    this.speed = 5;
  }

  // Did this pipe hit a bird?
  hits(bird) {
    let BirdHeight = bird.birdImg.height;
    let BirdWidth = bird.birdImg.width;
    if (
      bird.y - BirdHeight < this.top ||
      bird.y + BirdHeight > this.newHeight - this.bottom
    ) {
      if (bird.x + BirdWidth > this.x && bird.x + BirdWidth < this.x + this.w) {
        return true;
      }
    }
    return false;
  }

  // Draw the pipe
  show() {
    image(this.pipeImgR, this.x, 0, this.w, this.top);
    image(
      this.pipeImg,
      this.x,
      this.newHeight - this.bottom,
      this.w,
      this.bottom
    );
  }

  // Update the pipe
  update() {
    this.x -= this.speed;
  }

  // Has it moved offscreen?
  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}
