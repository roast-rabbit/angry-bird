const { Engine, World, Bodies, MouseConstraint, Mouse, Constraint } = Matter;

let ground;
const boxes = [];
let bird;
let world, engine;
let mConstraint;
let slingShot;

let angryImg;
function preload() {
  angryImg = loadImage("angry.png");
}

function setup() {
  // const canvas = createCanvas(window.innerWidth, window.innerHeight);
  const canvas = createCanvas(600, 400);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width / 2, height - 10, width, 20);
  for (let i = 0; i < 3; i++) {
    boxes[i] = new Box(450, 300 - i * 75, 50, 75);
  }
  bird = new Bird(150, 300, 16);

  slingShot = new SlingShot(150, 300, bird.body);

  const mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();

  const options = {
    mouse: mouse,
  };

  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}

function keyPressed() {
  if (key === " ") {
    World.remove(world, bird.body);
    bird = new Bird(150, 300, 16);
    slingShot.attach(bird.body);
  }
}

function mouseReleased() {
  setTimeout(() => {
    slingShot.fly();
  }, 100);
}

function draw() {
  background(0);
  Engine.update(engine);
  ground.show();
  for (let box of boxes) {
    box.show();
  }
  bird.show();
}
