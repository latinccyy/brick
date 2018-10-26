class Paddle {
    constructor(game) {
        this.x = 100
        this.y = 250
        this.h = 30
        this.w = 200
        this.speed = 30
        this.image = game.imageByName('paddle')
    }

    moveLeft() {
        if (this.x > 0) {
            this.x -= this.speed
        }
    }
    moveRight() {
        if (this.x < window.width - this.w) {
            this.x += this.speed
        }
    }

    handleCollide() {}


}
