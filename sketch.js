var Ray, RayAnimation, RayExplodes;
var coin, coinImage, coinGroup;
var laser, laserImage, laserGroup;
var cloud, cloudImage;
var gameState;
var score, gameSpeed;

// this function load all the images before the game starts
function preload(){
RayAnimation = loadAnimation("Ray1.png", "Ray2.png");
laserImage = loadImage("Laser.png");
cloudImage = loadImage("Cloud.png");
coinImage = loadImage("Coin.png");
RayExplodes = loadAnimation("RayExplosion.png");
}

// this function sets up the game before it starts
function setup() {
// setting the score to 0
score = 0;

// setting the game state to play
gameState = "play";

// creating the groups
laserGroup = createGroup();
coinGroup = createGroup();
cloudGroup = createGroup();

// creating canvas
createCanvas(windowWidth, windowHeight);

// creating the original Ray the Raven
Ray = createSprite(width/10, height/2,);
Ray.addAnimation("Ray Flying", RayAnimation);
Ray.addAnimation("Exploded",RayExplodes);
Ray.scale = 0.3;
Ray.setCollider("rectangle", 0, 0, 510, 475);
Ray.debug = false;
}

// this function contains the main game and repeats itself forever
function draw() {
// creating the backgound
background("cyan");

// setting the game speed to gradually increase as the game goes on
gameSpeed = 0 - score;

if(gameState == "play") {
//moving Ray
if(Ray.y > 50) {
if(keyDown("up")) {
Ray.y = Ray.y - 20;
    }
}
if(Ray.y < height - 50) {
if(keyDown("down")) {
Ray.y = Ray.y + 20;
    }
}

// detecting if Ray touches a laser
if(Ray.isTouching(laserGroup)) {
    gameState = "end";
}

// detecting if Ray touches a coin
if(Ray.isTouching(coinGroup)) {
    score = score + 1;
    coinGroup.destroyEach();
}

// calling the functions to spawn the lasers, clouds and and coins
spawnLasers();
spawnClouds();
spawnCoins();

// displaying the score
stroke("blue");
strokeWeight(5);
textSize(20);
text("Score: " + score, width-150, 50);

} else if(gameState == "end") {
// stopping the game
    laserGroup.destroyEach();
    coinGroup.destroyEach();
    cloudGroup.destroyEach();
    Ray.changeAnimation("Exploded", RayExplodes);
    Ray.scale = 1;
    stroke("red");
    strokeWeight(10);
    textSize(50);
    text("GAME OVER! 😭",width/2,height/2, 200, 200);
    textSize(20);
    stroke("green");
    strokeWeight(10);  
    text("Press space to play again", (width/2)+150, (height/2)+150)

// detecting if the game want to be played again
    if(keyDown("space")) {
        gameState = "play";
        Ray.changeAnimation("Ray Flying", RayAnimation);
        Ray.scale = 0.3;
        score = 0;
    }
}

// drawing sprites
 drawSprites();
}

// this function spawns the lasers.
function spawnLasers() {
if(frameCount % 17 == 0) {
    laser = createSprite(width, random(50, height-50), 10, 10);
    laser.addImage("laser flying", laserImage);
    laser.scale = 0.5;
    laser.setCollider("rectangle", 0, 0, 330, 157);
    laser.velocityX = gameSpeed - 25;
    laser.debug = false;
    laser.depth = -4;
    // this adds the lasers to the group
    laserGroup.add(laser);
    }
}

function spawnCoins() {
    if(frameCount % 150 == 0) {
        coin = createSprite(width, random(50, height-50), 10, 10);
        coin.addImage("coin floating", coinImage);
        coin.scale = 0.5;
        coin.setCollider("rectangle", 0, 0, 300, 300);
        coin.velocityX = gameSpeed - 20;
        coin.debug = false;
        coin.depth = 2;
        // this adds the lasers to the group
        coinGroup.add(coin);
        }
    }

    function spawnClouds() {
        if(frameCount % 70 == 0) {
            cloud = createSprite(width, random(50, height-50), 10, 10);
            cloud.addImage("clouds floating", cloudImage);
            cloud.scale = 0.5;
            cloud.setCollider("rectangle", 0, 0, 330, 157);
            cloud.velocityX = gameSpeed - 7;
            cloud.debug = false;
            cloud.depth = -5;
            // this adds the lasers to the group
            cloudGroup.add(cloud);
            }
        }
        
    
