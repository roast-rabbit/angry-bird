const { Engine, World, Bodies, MouseConstraint, Mouse, Constraint } = Matter;

let ground;
const boxes = [];
let bird;
let world, engine;
let mConstraint;

function setup() {
  const canvas = createCanvas(window.innerWidth, window.innerHeight);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width / 2, height - 10, width, 20);
  for (let i = 0; i < 3; i++) {
    boxes[i] = new Box(450, 300 - i * 75, 50, 75);
  }
  bird = new Bird(50, 300, 50);

  const mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();

  const options = {
    mouse: mouse,
  };

  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
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
