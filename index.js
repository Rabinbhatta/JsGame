const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 575;

const gravity = 0.7;

c.fillRect(0, 0, canvas.width, canvas.height);

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "img/background.png",
});

const shop = new Sprite({
  position: {
    x: 640,
    y: 160,
  },
  imageSrc: "img/shop.png",
  scale: 2.5,
  maxFrames: 6,
});
const player = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },

  imageSrc: "img/samuraiMack/Idle.png",
  maxFrames: 8,
  scale: 2.6,
  offset: {
    x: 200,
    y: 169,
  },
  sprites: {
    idle: {
      imageSrc: "img/samuraiMack/Idle.png",
      maxFrames: 8,
    },
    run: {
      imageSrc: "img/samuraiMack/Run.png",
      maxFrames: 8,
    },
    jump: {
      imageSrc: "img/samuraiMack/Jump.png",
      maxFrames: 2,
    },
    fall: {
      imageSrc: "img/samuraiMack/Fall.png",
      maxFrames: 2,
    },
    attack1: {
      imageSrc: "img/samuraiMack/Attack1.png",
      maxFrames: 6,
    },
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50,
    },
    width: 155,
    height: 50,
  },
});

const enemy = new Fighter({
  position: {
    x: 500,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 10,
  },
  color: "blue",
  imageSrc: "img/kenji/Idle.png",
  maxFrames: 4,
  scale: 2.6,
  offset: {
    x: 200,
    y: 179,
  },
  sprites: {
    idle: {
      imageSrc: "img/kenji/Idle.png",
      maxFrames: 4,
    },
    run: {
      imageSrc: "img/kenji/Run.png",
      maxFrames: 8,
    },
    jump: {
      imageSrc: "img/kenji/Jump.png",
      maxFrames: 2,
    },
    fall: {
      imageSrc: "img/kenji/Fall.png",
      maxFrames: 2,
    },
    attack1: {
      imageSrc: "img/kenji/Attack1.png",
      maxFrames: 4,
    },
  },
  attackBox: {
    offset: {
      x: -178,
      y: 50,
    },
    width: 185,
    height: 50,
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
      player.attack();
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
      enemy.attack();
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
