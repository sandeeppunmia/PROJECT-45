var person,person_img;
var traffic_light;
var traffic_light_red,traffic_light_green;
var traffic_light_red_img,traffic_light_green_img;
var traffic_light_stand;
var backgroundImg;
var obstacle1,obstacle2,obstacle3;
var obstaclesGroup1X,obstaclesGroup2Y;
var invisibleGround;
var gameState = "start";
var carGroup;
var level_completed_sprite;

function preload()
{
	backgroundImg = loadImage("background_img_.jpg");
	traffic_light_red_img = loadImage("Traffic lights/Traffic_light_red_image.jpeg");
	traffic_light_green_img = loadImage("Traffic lights/Traffic_light_green_image.jpeg");
	person_img = loadImage("persons/main.webp");
	level2_person = loadImage("persons/person_img_1.webp");
	obstacle1 = loadImage("obstacles/animal_image_1.webp");
	obstacle2 = loadImage("obstacles/car image.webp");
	obstacle3 = loadImage("obstacles/Scooty_image_!.webp");
	obstacle4 = loadImage("obstacles/red_car.webp");
	riskyCrossing = loadImage("Warnings/Risky Crossing.png");
	level_completed = loadImage("level_completed.jpg");
}

function setup() {
	createCanvas(1500, 700);
	rectMode(CENTER);

	person = createSprite(700,650,50,100);
	person.addImage(person_img);
	person.scale = 0.3;
	person.setCollider("circle",0,0,1);

	traffic_light = createSprite(1400,250,50,50);
	if(gameState==="start"){
	traffic_light.addImage(traffic_light_red_img);
	traffic_light.scale = 0.2;
	}

	traffic_light_stand = createSprite(1400,440,20,205);
	traffic_light_stand.shapeColor = "black";

	carGroup = new Group();

	//invisibleGround = createSprite(750,350,100,700);
}

function draw() {
  rectMode(CENTER);
  background(backgroundImg);

  if(frameCount%400 === 0){
	traffic_light.addImage(traffic_light_green_img);
   }

console.log(person.y);

//person.collide(invisibleGround);

if(gameState === "stop"){
	level2();
}

level1();
if(gameState === "stop"){
	text("LEVEL 1 Completed",200,450);
}

  drawSprites();
  if(carGroup.isTouching(person)){
	  console.log("CAR COLLIDED")
	textSize(40);
	textFont("Comic");
	fill("red");
	text("GAME OVER!!! BE CAREUL WHILE CROSSING THE ROAD",200,450);
	gameState = "stop";
	carGroup.setVelocityXEach(0);
	carGroup.setVisibleEach(0);
   }

   if(keyDown(RIGHT_ARROW)&&gameState === "start"){
	person.y = person.y - 5;
	//person.x = 0;
	if(person.y === 350){
		gameState = "stop";
		textSize(40);
		textFont("Comic");
		fill("Georgia");
		text("Great!! You have reached the next level of the game",200,450);
		gameState = "stop";
		carGroup.setVelocityXEach(0);
		carGroup.setVisibleEach(0);
	 }
   }

   if(gameState === "start" && person.y<625){
	textSize(45);
	textFont("Georgia");
	fill("red");
	text("You are crossing the road at your risk..Be careful",200,450);
	/*warning1 = createSprite(700,400,50,50);
	warning1.addImage(riskyCrossing);*/
}
}

function level1(){
	if(frameCount%200 === 0){
		var obstacle = createSprite(random(200,700),500);
		obstacle.addImage(obstacle2);
		obstacle.scale = 0.3;
		obstacle.velocityX = 2;
		var rand = Math.round(random(1,2));
		switch(rand){
			case 1: obstacle.addImage(obstacle2);
			break;
			case 2: obstacle.addImage(obstacle4);
			break;
		}
		carGroup.add(obstacle);
	}
}

function level2(){
	level_completed_sprite = createSprite(750,300);
	level_completed_sprite.addImage(level_completed);
	if(mousePressedOver(level_completed_sprite)){
		startLevel2();
		console.log("in mouse pressed");
		level_completed_sprite.destroy();
	}
}

function startLevel2(){
	
}