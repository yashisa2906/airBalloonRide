
var balloon;
var database;
var height;

function preload(){
  BgImg = loadImage("Hot Air Ballon-01.png");
  balloonImg = loadImage("Hot Air Ballon-02.png");
  balloonImg2 = loadAnimation("Hot Air Ballon-03.png","Hot Air Ballon-04.png")
  
}


function setup() {
  createCanvas(1500,700);
  database = firebase.database();

  balloon = createSprite(400, 200, 50, 50);
  balloon.addAnimation("HotAirBalloon", balloonImg);
  balloon.scale = 0.4;
  
  var balloonHeight = database.ref('balloon/height');
  balloonHeight.on("value",readHeight,showError);

}

function draw() {
  background(BgImg); 

  textSize(24);
  fill("black");
  stroke("blue");
  text("Use Arrow Keys To Move The HOT AIR BALLOON",30,30);
  
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImg2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(+10,0);
    balloon.addAnimation("hotAirBalloon",balloonImg2);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImg2);
    balloon.scale = balloon.scale - 0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImg2);
    balloon.scale = balloon.scale + 0.01;
  };
  drawSprites();
}

function updateHeight(x,y){
 database.ref('balloon/height').set({
   'x': height.x + x,
   'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}