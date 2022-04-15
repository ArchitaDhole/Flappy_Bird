var bird, birdAni, birdcollided;
var pipe1, pipe1img;
var pipe2, pipe2img, pipeGroup;
var pipes;
var backgroun, backgroundImg;
var gs = "play";
var restart, restartImg;
var score;

function preload() {
  backgroundImg = loadImage("Picture7.png");
  birdAni = loadAnimation("Picture1.png", "Picture2.png", "Picture10.png");
  birdcollided = loadAnimation("birdcollided.png");
  pipe1img = loadImage("pipe1.png");
  pipe2img = loadImage("pipe2.png");
  pipesImg = loadImage("p2ipe.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 650);

  backgroun = createSprite(225, 300, 40, 40);
  backgroun.addImage("bg", backgroundImg);
  backgroun.scale = 2.1;

  bird = createSprite(100, 300, 200, 200);
  bird.addAnimation("flying", birdAni);
  bird.addAnimation("collided", birdcollided);
  bird.scale = .3;

  restart = createSprite(300, 300, 10, 10);
  restart.addImage("restart", restartImg);
  restart.scale = .3;
  restart.visible = false;

  pipeGroup = new Group();
  score = 0;

}

function draw() {
  background(180);

  fill("Black");
  textSize(15);
  text("Score: " + score, 300, 627);

  if (gs === "play") {
    score = Math.round(frameCount / 60);
    backgroun.velocityX = -5;

    if (backgroun.x < -250) {
      backgroun.x = 225;
    }

    if (keyDown("space") && bird.y > 40 || touches.length > 0 ){
      bird.y = bird.y - 10;
    }
    
    if(touches.length > 0){
      bird.y = bird.y - 50;
      touches = [];      
    }

    bird.y = bird.y + 5;
    bird.depth = 2;
    bird.setCollider("circle", 0, 0, 80);

    if (frameCount % 50 === 0) {
      pipe1 = createSprite(700, 430, 10, 10);
      pipe1.addImage("pipe", pipe1img);
      pipe1.scale = .6;
      pipe1.velocityX = backgroun.velocityX;
      pipeGroup.add(pipe1);
      pipe1.depth = 1;
      pipe1.lifetime = 150;
      pipe1.setCollider("rectangle", 0, 0, 100, 540);
    }
    if (frameCount % 75 === 0) {
      pipe2 = createSprite(700, 0, 10, 10);
      pipe2.y = Math.round(random(1, 2));
      pipe2.addImage("pipe", pipe2img);
      pipe2.scale = .6;
      pipe2.velocityX = backgroun.velocityX;
      pipeGroup.add(pipe2);
      pipe2.depth = 1;
      pipe1.lifetime = 150;
      pipe2.setCollider("rectangle", 0, 0, 100, 500);
    }
    if (bird.isTouching(pipeGroup) || bird.y === 570) {
      gs = "end";
    }
  }

  if (gs === "end") {
    pipeGroup.setVelocityXEach(0);
    backgroun.velocityX = 0;
    bird.changeAnimation("collided", birdcollided);
    pipeGroup.setLifetimeEach(-1);
    restart.visible = true;
    if (mousePressedOver(restart) || touches.length > 0) {
      restartGame();
      touches = [];
    }
  }

  drawSprites();
}

function restartGame() {
  restart.visible = false;
  bird.y = 300;
  bird.changeAnimation("flying", birdAni);
  pipeGroup.destroyEach();
  gs = "play";
  score = 0;
}