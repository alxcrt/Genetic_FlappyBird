const TOTAL = 500;
let birds = [];
let saveBirds = [];
let	pipes = [];
let counter = 0;
let slider;

function setup() {
	createCanvas(400, 600);
	slider = createSlider(1, 100, 1);
	for (i = 0; i < TOTAL; i++){
		birds[i] = new Bird();
	}

	//pipes.push(new Pipe());

}

function draw() {

	for (let n = 0 ; n < slider.value() ; n++){
		if (counter % 50 == 0) {

				pipes.push(new Pipe());
		}
			counter ++;

		for (let i = 0 ; i < pipes.length ; i++){
			pipes[i].update();

			for (let j = birds.length - 1; j >= 0; j--){
				if(pipes[i].hits(birds[j])){
						saveBirds.push(birds.splice(j, 1)[0]);
				}
			}

		if(pipes[i].offscreen()){
					pipes.splice(i,1);
			}
		}

		for (let bird of birds){
			bird.think(pipes)
			bird.update();
		}


		if(birds.length === 0){
				counter = 0;
				nextGeneration();
				pipes = [];

			}

		for (let i = birds.length - 1; i >= 0; i--){
			if(birds[i].offscreen()){
					saveBirds.push(birds.splice(i, 1)[0]);
			}
		}
	}

	//All the drawing
	background(0);

	for (let bird of birds){
		bird.show();
	}

	for(let pipe of pipes){
		pipe.show();
	}





}

function keyPressed(){
	if(key == ' '){
		bird.up();
	}
}
