const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 575;

const gravity = 0.7;

c.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
  constructor({ position, velocity, color = "red", offset }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 60;
    this.color = color;
    this.offset = offset;
    this.attackBox = false;
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      this.width,
      this.height
    );

    if (this.attackBox) {
      c.fillStyle = "green";
      c.fillRect(this.position.x, this.position.y, 120, 50);
      setTimeout(() => {
        this.attackBox = false;
      }, 100);
    }
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    if (this.height + this.velocity.y + this.position.y >= canvas.height) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
  offset: {
    x: 0,
    y: 0,
  },
});

const enemy = new Sprite({
  position: {
    x: 500,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 10,
  },
  color: "blue",
  offset: {
    x: -60,
    y: 0,
  },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};

let lastKey;
let lastKeyA;

function attackCollision(rectangle1, rectangle2) {
  // console.log(rectangle1.position.y, rectangle2.position.y);
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    Math.floor(rectangle1.position.y) <=
      Math.floor(rectangle2.position.y) + rectangle2.height &&
    Math.floor(rectangle1.position.y) + rectangle2.height >=
      Math.floor(rectangle2.position.y)
  );
}

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  if (keys.a.pressed && lastKey == "a" && player.position.x - 5 > 0) {
    player.velocity.x -= 5;
  } else if (
    keys.d.pressed &&
    lastKey == "d" &&
    player.position.x + 5 + player.width < canvas.width
  ) {
    player.velocity.x += 5;
  }

  if (
    keys.ArrowLeft.pressed &&
    lastKeyA == "ArrowLeft" &&
    enemy.position.x - 5 > 0
  ) {
    enemy.velocity.x -= 5;
  } else if (
    keys.ArrowRight.pressed &&
    lastKeyA == "ArrowRight" &&
    enemy.position.x + 5 + enemy.width < canvas.width
  ) {
    enemy.velocity.x += 5;
  }
  if (player.position.y + player.height + gravity >= canvas.height) {
    keys.w.pressed = false;
  }
  if (enemy.position.y + enemy.height + gravity >= canvas.height) {
    keys.ArrowUp.pressed = false;
  }

  if (attackCollision(player, enemy) && player.attackBox) {
    console.log("hit");
    player.attackBox = false;
  }
  if (attackCollision(enemy, player) && enemy.attackBox) {
    console.log("hit");
    enemy.attackBox = false;
  }
}

animate();

window.addEventListener("keydown", (event) => {
  console.log(event.key);
  switch (event.key) {
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
    case "w":
      if (keys.w.pressed === false) {
        keys.w.pressed = true;
        player.velocity.y = -20;
      }

      break;
    case " ":
      player.attackBox = true;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      lastKeyA = "ArrowLeft";
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      lastKeyA = "ArrowRight";
      break;
    case "ArrowUp":
      if (keys.ArrowUp.pressed === false) {
        keys.ArrowUp.pressed = true;
        enemy.velocity.y = -20;
      }

      break;
    case "ArrowDown":
      enemy.attackBox = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;

      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;

      break;
  }
});
