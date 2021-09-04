var dog, sadDog, happyDog, database;
var foodS, foodStock;
var fedTime, lastFed;
var feed, addFood;
var foodObj;
var food;
var feedDog;
var WashroomIMG;
var Living_roomIMG;
var GardenIMG;
var Bed_roomIMG;
var Washroom;
var Living_room;
var Garden;
var Bed_room;
var bgIMG;
function preload() {
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
  bgIMG = loadImage("yes.jpg")
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  feedDog = createButton("feed the dog");
  feedDog.position(700, 95);
  feedDog.mousePressed(FeedTheDog);

  Washroom = createButton("go to washroom");
  Washroom.position(300, 95);
  Washroom.mousePressed(() => {
    bgIMG = loadImage("washroom.png");
  });

  Living_room = createButton("go to living room");
  Living_room.position(300, 115);
  Living_room.mousePressed(() => {
    bgIMG = loadImage("Living Room.png");
  });

  Garden = createButton("go to Garden");
  Garden.position(300, 135);
  Garden.mousePressed(() => {
    bgIMG = loadImage("Garden.png");
  });

  Bed_room = createButton("go to bed room");
  Bed_room.position(300, 155);
  Bed_room.mousePressed(() => {
    bgIMG = loadImage("Bed Room.png");
  });

  var ballpositionref = database.ref("food");
  ballpositionref.on("value", function (data) {
    food = data.val();
    console.log(food);
  });

}

function draw() {
  background(bgIMG);

  fedTime = database.ref("FeedTime");
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });

  fill(255, 255, 254);
  textSize(15);

  if (lastFed >= 12) {
    text("Last Feed : " + (lastFed % 12) + " PM", 350, 30);
  } else if (lastFed == 0) {
    text("Last Feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : " + lastFed + " AM", 350, 30);
  }
  stroke("white")
  text("food remaining" + " " + food, 300, 200);
  drawSprites();
}
function addFoods() {
  database.ref("/").update({
    food: food + 1,
  });
}

function FeedTheDog() {
  database.ref("/").update({
    food: food - 1,
  });
}
