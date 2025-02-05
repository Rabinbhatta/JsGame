let lastKey;
let lastKeyA;

function attackCollision(rectangle1, rectangle2) {
  // console.log(rectangle1.position.y, rectangle2.position.y);
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

function decideWinner({ player, enemy }) {
  clearTimeout(setTimeId);
  document.querySelector("#result").style.display = "flex";
  if (player.health === enemy.health) {
    document.querySelector("#result").innerHTML = "Tie";
  } else if (player.health > enemy.health) {
    document.querySelector("#result").innerHTML = "Player 1 won";
  } else if (player.health < enemy.health) {
    document.querySelector("#result").innerHTML = "Player 2 won";
  }
}

let timer = 60;
let setTimeId;
function decreaseTimer() {
  if (timer > 0) {
    timer--;
    setTimeId = setTimeout(decreaseTimer, 1000);
    document.querySelector("#timer").innerHTML = timer;
  }
  if (timer <= 0) {
    decideWinner({ player, enemy });
  }
}
decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  if (keys.a.pressed && lastKey == "a" && player.position.x - 5 > 0) {
    player.switchSprites("run");
    player.velocity.x -= 5;
  } else if (
    keys.d.pressed &&
    lastKey == "d" &&
    player.position.x + 5 + player.width < canvas.width
  ) {
    player.switchSprites("run");
    player.velocity.x += 5;
  } else {
    player.switchSprites("idle");
  }

  if (player.velocity.y < 0) {
    player.switchSprites("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprites("fall");
  }

  if (
    keys.ArrowLeft.pressed &&
    lastKeyA == "ArrowLeft" &&
    enemy.position.x - 5 > 0
  ) {
    enemy.switchSprites("run");
    enemy.velocity.x -= 5;
  } else if (
    keys.ArrowRight.pressed &&
    lastKeyA == "ArrowRight" &&
    enemy.position.x + 5 + enemy.width < canvas.width
  ) {
    enemy.switchSprites("run");
    enemy.velocity.x += 5;
  } else {
    enemy.switchSprites("idle");
  }

  if (enemy.velocity.y < 0) {
    enemy.switchSprites("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprites("fall");
  }
  if (player.position.y + player.height + gravity >= canvas.height - 96) {
    keys.w.pressed = false;
  }
  if (enemy.position.y + enemy.height + gravity >= canvas.height - 96) {
    keys.ArrowUp.pressed = false;
  }

  if (attackCollision(player, enemy) && player.isAttacking) {
    console.log("hit");
    player.isAttacking = false;
    enemy.health -= 20;
    document.querySelector("#enemyHealth").style.width = enemy.health + "%";
  }
  if (attackCollision(enemy, player) && enemy.isAttacking) {
    player.health -= 20;
    document.querySelector("#playerHealth").style.width = player.health + "%";
    enemy.isAttacking = false;
  }

  if (player.health <= 0 || enemy.health <= 0) {
    decideWinner({ player, enemy });
  }
}
