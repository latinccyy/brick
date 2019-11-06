
class Ball {
    constructor(game) {
        this.x = 300
        this.y = 150
        this.h = 30
        this.w = 30
        this.speedX = 10
        this.speedY = -10
        this.image = game.imageByName('ball')
    }

    move() {
        if (this.x < 0 || this.x > window.width) {
            this.speedX *= -1
        }
        if (this.y < 0 || this.y > window.height) {
            this.speedY *= -1
        }
        this.x += this.speedX
        this.y += this.speedY
    }

    handleCollide(isProfileCollide) {
        // 撞到image的侧面，X方向上反弹，撞到正面，Y方向上反弹
        if (isProfileCollide) {
            this.reboundX()
        } else {
            this.reboundY()
        }
    }

    reboundY() {
        this.speedY *= -1
    }

    reboundX() {
        this.speedX *= -1
    }

    hasPoint(x, y) {
        if (this.x < x && x < this.x + this.w
                && this.y < y && y < this.y + this.h) {
            return true
        }
        return false
    }

    nextPosition() {
        var p = {
            x: this.x + this.speedX,
            y: this.y + this.speedY,
            w: this.w,
            h: this.h,
        }
        return p
    }
}
