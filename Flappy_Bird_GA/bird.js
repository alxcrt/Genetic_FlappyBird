class Bird{

  constructor(brain) {
    this.y = height / 2;
    this.x = 64;
    this.r = 12;

    this.gravity = 0.8;
    this.lift = -10;
    this.velocity = 0;

    this.score = 0;
    this.fitness = 0;
    if(brain){
      this.brain = brain.copy();
    }else{
      this.brain = new NeuronalNetwork(5, 10, 2);
  }

  }

  show(){
    stroke(255);
    fill(255,100);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  think(pipes){

    //Find closest pipe
    let closest = null;
    let record = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let diff = (pipes[i].x + pipes[i].w) - this.x;
      if (diff < record && diff > 0) {
        record = diff;
        closest = pipes[i];
      }
    }
    //console.log(closest.top);
    if(closest != null){
      let input = [];
      input[0] = this.y / height;
      input[1] = closest.top / height ;
      input[2] = closest.bottom / height;
      input[3] = closest.x / width;
      input[4] = this.velocity / 10 ;

      let output = this.brain.predict(input);
      //console.log(output);
      if(output[0] > output[1]){
        this.up();

      }
    }
  }

  offscreen(){
    return (this.y > height || this.y < 0)
  }

  update(){
    this.score+= 10;

    this.velocity += this.gravity;
    this.y += this.velocity;

    // if (this.y > height){
    //   this.y = height;
    //
    //   this.velocity = 0;
    // }else if (this.y < 0) {
    //   this.y = 0;
    //   this.velocity = 0;
    // }
  }

  up(){
    this.velocity += this.lift;
  }

  mutate(){
    this.brain.mutate(0.1);

  }


}
