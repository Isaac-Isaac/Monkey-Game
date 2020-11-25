var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score = 0;
var ground;
var survivalTime = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  // banana Image
  bananaImage = loadImage("banana.png");
  //obstacle Image
  obstacleImage = loadImage("obstacle.png");
  //sprites Images
  sprite0 = loadImage("sprite_0.png");
  sprite1 = loadImage("sprite_1.png");
  sprite2 = loadImage("sprite_2.png");
  sprite3 = loadImage("sprite_3.png");
  sprite4 = loadImage("sprite_4.png");
  sprite5 = loadImage("sprite_5.png");
  sprite6 = loadImage("sprite_6.png");
  sprite7 = loadImage("sprite_7.png");
  sprite8 = loadImage("sprite_8.png");

}



function setup() {
  createCanvas(450, 400);

  bananaGroup = new Group();

  obstacleGroup = new Group();

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);

  console.log(monkey.y);



  monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height);
  monkey.debug = true;
}


function draw() {
  background(255);



  if (gameState === PLAY) {
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && monkey.y >= 314) {
      monkey.velocityY = -14;
    }
    monkey.velocityY = monkey.velocityY + 0.8;

    monkey.collide(ground);

    spawnBananas();
    spawnObstacle();

    if (monkey.isTouching(bananaGroup)) {

      score++;
      bananaGroup.destroyEach();
    }
    
    survivalTime = Math.ceil(frameCount / frameRate());
    
    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;

    }

  }

  if (gameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0;

    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);

    //score = 0;
    //survivalTime = 0;

    stroke("black");
    textSize(25);
    fill("black");
    text("Game Over", 160, 200);
  }


  stroke("black");
  textSize(20);
  fill("black");
  text("Score: " + score, 100, 80);

  stroke("black");
  textSize(20);
  fill("black");
  
  text("Survival Time: " + survivalTime, 100, 50);


  drawSprites();
}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(500, 300, 1, 1);

    banana.debug = true;

    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.velocityX = -3;
    banana.lifetime = 175;
    banana.scale = 0.09;

    bananaGroup.add(banana);
  }
}

function spawnObstacle() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(400, 330, 1, 1);

    obstacle.debug = true;

    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4;
    obstacle.lifetime = 100;
    obstacle.scale = 0.09;

    obstacleGroup.add(obstacle);
  }
}