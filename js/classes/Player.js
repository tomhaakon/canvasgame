class Player extends Sprite {
    constructor({
        position,
        collisionBlocks,
        imageSrc,
        frameRate,
        scale = 0.5,
        animations,
    }) {
        super({ imageSrc, frameRate, scale });
        this.position = position;
        this.velocity = {
            x: 0,
            y: 1,
        };

        this.collisionBlocks = collisionBlocks;
        this.hitBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 10,
            height: 10,
        };

        this.animations = animations;
        this.lastDirection = "right";

        for (let key in this.animations) {
            const image = new Image();
            image.src = this.animations[key].imageSrc;

            this.animations[key].image = image;
        }
        this.cameraBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 200,
            height: 80,
        };
    }

    //    draw() {
    //       c.fillStyle = "red";
    //      c.fillRect(this.position.x, this.position.y, this.width, this.height);
    // }
    switchSprite(key) {
        if (this.image === this.animations[key].image || !this.loaded) return;

        this.currentFrame = 0;
        this.image = this.animations[key].image;
        this.frameBuffer = this.animations[key].frameBuffer;
        this.frameRate = this.animations[key].frameRate;
    }

    updateCameraBox() {
        this.cameraBox = {
            position: {
                x: this.position.x - 50,
                y: this.position.y,
            },
            width: 200,
            height: 80,
        };
    }

    checkForHorizontalCanvasCollision() {
        if (
            this.hitBox.position.x + this.hitBox.width + this.velocity.x >=
                476 ||
            this.hitBox.position.x + this.velocity.x <= 0
        ) {
            this.velocity.x = 0;
        }
    }

    shouldPanCameraToTheLeft({ canvas, camera }) {
        const cameraBoxRightSide =
            this.cameraBox.position.x + this.cameraBox.width;
        const scaledDownCanvasWidth = canvas.width / 2.2;

        if (cameraBoxRightSide >= 474) return;

        if (
            cameraBoxRightSide >=
            scaledDownCanvasWidth + Math.abs(camera.position.x)
        ) {
            camera.position.x -= this.velocity.x;
        }
    }
    shouldPanCameraToTheRight({ canvas, camera }) {
        if (this.cameraBox.position.x <= 0) return;

        if (this.cameraBox.position.x <= Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x;
        }
    }

    update() {
        this.updateFrames();
        this.updateHitBox();
        this.updateCameraBox();

        //camerabox
        // c.fillStyle = "rgba(0, 0, 255, 0.2)";
        // c.fillRect(
        //     this.cameraBox.position.x,
        //     this.cameraBox.position.y,
        //     this.cameraBox.width,
        //     this.cameraBox.height,
        // );

        //draws out the image
        // c.fillStyle = "rgba(0, 255, 0, 0.2)";
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);

        // //draw hitbox
        // c.fillStyle = "rgba(255, 0, 0, 0.2)";
        // c.fillRect(
        //     this.hitBox.position.x,
        //     this.hitBox.position.y,
        //     this.hitBox.width,
        //     this.hitBox.height,
        // );

        this.draw();

        this.position.x += this.velocity.x;
        this.updateHitBox();
        this.checkForHorizontalCollisions();
        this.applyGravity();
        this.updateHitBox();
        this.checkForVerticalCollisions();
    }

    updateHitBox() {
        // this.collisionBlocks = collisionBlocks;
        this.hitBox = {
            position: {
                x: this.position.x + 35,
                y: this.position.y + 26,
            },
            width: 14,
            height: 27,
        };
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (
                collision({
                    object1: this.hitBox,
                    object2: collisionBlock,
                })
            ) {
                //høyre
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;

                    const offset =
                        this.hitBox.position.x -
                        this.position.x +
                        this.hitBox.width;

                    this.position.x = collisionBlock.position.x - offset - 0.01;
                    break;
                }
                //venstre
                if (this.velocity.x < 0) {
                    this.velocity.x = 0;

                    const offset = this.hitBox.position.x - this.position.x;

                    this.position.x =
                        collisionBlock.position.x +
                        collisionBlock.width -
                        offset +
                        0.01;
                    break;
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;
    }

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (
                collision({
                    object1: this.hitBox,
                    object2: collisionBlock,
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;

                    const offset =
                        this.hitBox.position.y -
                        this.position.y +
                        this.hitBox.height;

                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    break;
                }
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;

                    const offset = this.hitBox.position.y - this.position.y;

                    this.position.y =
                        collisionBlock.position.y +
                        collisionBlock.height -
                        offset +
                        0.01;
                    break;
                }
            }
        }
    }
}
