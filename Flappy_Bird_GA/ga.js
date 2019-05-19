function nextGeneration() {
  console.log("Next Generation!!!!!");

  calculateFitness();

  for (i = 0; i < TOTAL; i++) {
    birds[i] = pickOne();
  }
  saveBirds = [];
}

function pickOne() {
  let index = 0;
  let r = random(1);

  while (r > 0) {
    r = r - saveBirds[index].fitness;
    index++;
  }
  index--;

  let bird = saveBirds[index];
  let child = new Bird(bird.brain);
  child.mutate();
  return child;
}

function calculateFitness() {
  let sum = 0;
  for (let bird of saveBirds) {
    sum += bird.score;
  }

  for (let bird of saveBirds) {
    bird.fitness = bird.score / sum;
  }
}
