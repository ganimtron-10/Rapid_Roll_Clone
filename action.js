let ball;
let boxes;
let spikes;
let life = 3;

function setup() {
  createCanvas(300, 600);

  ball = createSprite(150, 50, 30, 30);
  ball.draw = function () { fill(255, 0, 0); circle(0, 0, 20, 20); }
  ball.velocity.y = 2;



  boxes = new Group();
  spikes = new Group();

  wall_left = createSprite(0, height / 2, 20, height)
  wall_left.immovable = true
  boxes.add(wall_left)

  wall_right = createSprite(width, height / 2, 20, height)
  wall_right.immovable = true
  boxes.add(wall_right)

  let y_pos = 300;

  for (let i = 0; i < 9; i++) {
    y_pos += 80;

    new_box = createSprite(random(50, width - 50), y_pos, random(50, 100), 20)
    new_box.velocity.y = -3;
    new_box.immovable = true;
    if (random(0, 1) < 0.2) {
      spikes.add(new_box)
      new_box.shapeColor = color(255, 255, 255);
    }
    boxes.add(new_box);
  }
}

function draw() {
  background(220);
  console.log(ball.position);

  ball.collide(spikes, kill);

  if (ball.collide(boxes)) {
    ball.velocity.y = 0;
  } else {
    ball.velocity.y = 2;
  }

  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].position.y < -100) {
      boxes[i].position.x = random(50, width - 50);
      changetype(boxes[i], random(0, 1) < 0.3)
      boxes[i].position.y = height;
    }
  }

  if (keyIsDown(LEFT_ARROW)) {
    ball.velocity.x = -4;
  } else if (keyIsDown(RIGHT_ARROW)) {
    ball.velocity.x = 4;
  } else {
    ball.velocity.x = 0;
  }

  if (ball.position.y > height || ball.position.y < 0) {
    kill();
  }

  drawSprites();
  textSize(20);
  textAlign(CENTER, CENTER);
  text(`Lives: ${life}`, 50, 20);

}

function kill() {
  life--;
  console.log(life);

  ball.position.y = 50;
  ball.position.x = 165;

  let h = height * 0.67;
  for (let i = 2; i < boxes.length; i++) {
    boxes[i].position.x = random(50, width - 50);
    changetype(boxes[i], random(0, 1) < 0.3)
    boxes[i].position.y = h;
    // boxes[i].position.y = h;
    h += 80
  }

  if (life <= 0) {
    ball.remove();
    console.log("Ball removed!");
    console.log("Game reset!");
    textSize(40);
    textAlign(CENTER, CENTER);
    text(`Game Over!`, width / 2, height / 2);
    noLoop();
  }
}

function changetype(box, val) {
  let found = false;
  for (let i = 0; i < spikes.length; i++) {
    if (box === spikes[i]) {
      found = true;
    }
  }

  if (val && !found) {
    box.shapeColor = color(255, 255, 255)
    spikes.add(box)
  } else if (!val && found) {
    spikes.remove(box)
    box.shapeColor = color(random(0, 250), random(0, 250), random(0, 250))
  }
}