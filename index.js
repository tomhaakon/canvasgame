const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
    width: canvas.width / 2.2,
    height: canvas.height / 1.8,
};

const floorCollisions2D = [];
for (let i = 0; i < floorCollisions.length; i += 32) {
    floorCollisions2D.push(floorCollisions.slice(i, i + 32));
}

const collisionBlocks = [];
floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 81) {
            console.log("draw a block here");
            collisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 32,
                        y: y * 16.4,
                    },
                }),
            );
        }
    });
});

const gravity = 0.1;

const player = new Player({
    position: {
        x: 100,
        y: 100,
    },
    collisionBlocks, // same as collisionBlock: collisionBlocks funker når navn er det samme
    imageSrc: "./img/warrior/Idle.png",
    frameRate: 8,
    animations: {
        Idle: {
            imageSrc: "./img/warrior/Idle.png",
            frameRate: 8,
            frameBuffer: 5,
        },
        IdleLeft: {
            imageSrc: "./img/warrior/IdleLeft.png",
            frameRate: 8,
            frameBuffer: 5,
        },
        Run: {
            imageSrc: "./img/warrior/Run.png",
            frameRate: 8,
            frameBuffer: 7,
        },
        Jump: {
            imageSrc: "./img/warrior/Jump.png",
            frameRate: 2,
            frameBuffer: 3,
        },
        JumpLeft: {
            imageSrc: "./img/warrior/JumpLeft.png",
            frameRate: 2,
            frameBuffer: 3,
        },
        Fall: {
            imageSrc: "./img/warrior/Fall.png",
            frameRate: 2,
            frameBuffer: 3,
        },
        FallLeft: {
            imageSrc: "./img/warrior/FallLeft.png",
            frameRate: 2,
            frameBuffer: 3,
        },
        RunLeft: {
            imageSrc: "./img/warrior/RunLeft.png",
            frameRate: 8,
            frameBuffer: 5,
        },
    },
});
//const player2 = new Player({
//    x: 300,
//    y: 100,
//});

const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
};

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "./img/background.png",
});

const camera = {
    position: {
        x: 0,
        y: 0,
    },
};

//animasjon
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.save();
    c.scale(2.2, 1.8);
    c.translate(
        camera.position.x,
        -background.image.height + scaledCanvas.height,
    );
    background.update();

    // collisionBlocks.forEach((collisionBlock) => {
    //     collisionBlock.update();
    // });

    player.checkForHorizontalCanvasCollision();
    player.update();
    //player2.update();

    player.velocity.x = 0;
    //move right D KEY
    if (keys.d.pressed) {
        player.switchSprite("Run");
        player.velocity.x = 1;
        player.lastDirection = "right";
        player.shouldPanCameraToTheLeft({ canvas, camera });

        //move left A KEY
    } else if (keys.a.pressed) {
        player.switchSprite("RunLeft");
        player.velocity.x = -1;
        player.lastDirection = "left";
        player.shouldPanCameraToTheRight({ canvas, camera });

        //idle
    } else if (player.velocity.y === 0) {
        if (player.lastDirection === "right") player.switchSprite("Idle");
        else player.switchSprite("IdleLeft");
    }

    if (player.velocity.y < 0) {
        if (player.lastDirection === "right") player.switchSprite("Jump");
        else player.switchSprite("JumpLeft");
    } else if (player.velocity.y > 0) {
        if (player.lastDirection === "right") player.switchSprite("Fall");
        else player.switchSprite("FallLeft");
    }
    c.restore();
}

animate();

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = true;
            break;
        case "a":
            keys.a.pressed = true;
            break;
        case "w":
            player.velocity.y = -3;
            break;
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
    }
});

//console.log(floorCollisions);
