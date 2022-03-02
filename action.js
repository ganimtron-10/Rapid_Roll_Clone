let ball;
let box;
let spike;
let boxes;

function setup() {
  createCanvas(300, 600);

  ball = createSprite(150,50,30,30);
  ball.draw = function(){fill(255,0,0);circle(0,0,20,20);}
  ball.velocity.y = 3;



  boxes = new Group();

  wall_left = createSprite(0,height/2,20,height)
  wall_left.immovable = true
  boxes.add(wall_left)

  wall_left = createSprite(width,height/2,20,height)
  wall_left.immovable = true
  boxes.add(wall_left)

  let y_pos = 300;

  for(let i = 0; i < 9; i++){
    y_pos += 80;

    new_box = createSprite(random(50,width-50),y_pos,random(50,100),20)
    new_box.velocity.y = -3;
    new_box.immovable = true;
    boxes.add(new_box);
  }
}

function draw() {
  background(220);

  if(ball.collide(boxes)){
    ball.velocity.y = 0;
  }else{
    ball.velocity.y = 3;
  }

  for(let i = 0; i < boxes.length; i++){
    if(boxes[i].position.y < -100){
      boxes[i].position.x = random(50,width-50);
      boxes[i].position.y = height;
    }
  }

  if(keyIsDown(LEFT_ARROW)){
    ball.velocity.x = -4;
  }else if(keyIsDown(RIGHT_ARROW)){
    ball.velocity.x = 4;
  }else{
    ball.velocity.x = 0;
  }

  if(ball.position.y > height || ball.position.y < 0){
    ball.remove()
    console.log("Ball removed!");
    noLoop();
  }

  drawSprites();

}
