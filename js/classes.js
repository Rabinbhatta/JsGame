class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    maxFrames = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.maxFrames = maxFrames;
    this.frameCurrent = 0;
    this.frameEscape = 0;
    this.frameHold = 5;
    this.offset = offset;
  }

  draw() {
    c.drawImage(
      this.image,
      this.frameCurrent * (this.image.width / this.maxFrames),
      0,
      this.image.width / this.maxFrames,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.maxFrames) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrames() {
    this.frameEscape++;
    if (this.frameEscape % this.frameHold === 0) {
      if (this.frameCurrent < this.maxFrames - 1) {
        this.frameCurrent++;
      } else {
        this.frameCurrent = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
}

class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = "red",
    offset = { x: 0, y: 0 },
    imageSrc,
    scale = 1,
    maxFrames = 1,
    sprites,
    attackBox = { position, offset: {}, width: undefined, height: undefined },
  }) {
    super({
      imageSrc,
      position,
      scale,
      maxFrames,
    });
    this.position = position;
    this.frameCurrent = 0;
    this.frameEscape = 0;
    this.frameHold = 8;
    this.velocity = velocity;
    this.height = 150;
    this.width = 60;
    this.color = color;
    this.offset = offset;
    this.isAttacking = false;
    this.health = 100;
    this.sprites = sprites;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  update() {
    this.draw();
    this.animateFrames();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    if (this.height + this.velocity.y + this.position.y >= canvas.height - 96) {
      this.velocity.y = 0;
      this.position.y = 330;
    } else this.velocity.y += gravity;
  }

  attack() {
    this.switchSprites("attack1");
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 500);
  }

  switchSprites(sprite) {
    if (
      this.image === this.sprites.attack1.image &&
      this.frameCurrent < this.maxFrames - 1
    )
      return;
    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.maxFrames = this.sprites.idle.maxFrames;
          this.frameCurrent = 0;
        }

        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.maxFrames = this.sprites.run.maxFrames;
          this.frameCurrent = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.maxFrames = this.sprites.jump.maxFrames;
          this.frameCurrent = 0;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.maxFrames = this.sprites.fall.maxFrames;
          this.frameCurrent = 0;
        }
        break;
      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.maxFrames = this.sprites.attack1.maxFrames;
          this.frameCurrent = 0;
        }
        break;
    }
  }
}
