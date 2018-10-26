class MainScene extends Scene{
    constructor(game) {
        super(game)
        var paddle = new Paddle(game)
        var ball = new Ball(game)
        this.paddle = paddle
        this.ball = ball
        this.bricks = loadLevel(game, 1)
        this.score = 0
        this.level = 1
        this.maxLevel = 2
    }

    draw() {
        // for (var s of this.elements) {
        //     this.game.drawImage(s)
        // }
        for (var b of this.bricks) {
            this.game.drawImage(b)
        }
        this.game.drawImage(this.ball)
        this.game.drawImage(this.paddle)

        var text = '分数： ' + this.score
        this.game.drawText(text, 300, 290)
    }

    update() {
        this.ball.move()
        // 碰撞处理
        this.checkCollide()
        // 更新砖块
        var bricks = this.updateBricks()
        this.updateScore(bricks)
        this.updateLevel()
    }

    updateLevel() {
        var pass = this.bricks.length == 0
        if (pass) {
            if (this.level == this.maxLevel) {
                this.game.gameOver()
            } else {
                this.loadNextLevel()
            }
        }
    }

    loadNextLevel() {
        this.level += 1
        this.bricks = loadLevel(this.game, this.level)
    }

    updateBricks() {
        bricks = []
        for (var b of this.bricks) {
            if (b.isDead()) {
                bricks.push(b)
                this.removeBrick(b)
            }
        }
        return bricks
    }

    updateScore(deadBricks) {
        for (var b of deadBricks) {
            this.score += b.score
        }
    }

    removeBrick(brick) {
        var index = this.bricks.indexOf(brick);
        if (index > -1) {
            this.bricks.splice(index, 1);
        }
    }

    checkCollide() {
        var o = this.collideImage()
        var isCollide = o != null
        if (isCollide) {
            o.handleCollide()
            // 检测侧面碰撞或正面碰撞
            var result = this.isProfileCollide(o)
            this.ball.handleCollide(result)
        }
    }

    collideImage() {
        // 挡板和球碰撞
        if (collide(this.paddle, this.ball)) {
            return this.paddle
        }
        // 球和砖块碰撞
        for (var b of this.bricks) {
            if (collide(this.ball, b)) {
                return b
            }
        }
        return null
    }

    isProfileCollide(image) {
        this.ball.reboundY()
        var p = this.ball.nextPosition()
        this.ball.reboundY()
        return collide(image, p)
    }

    addListener() {
        this.game.registerAction('ArrowLeft', () => {
            this.paddle.moveLeft()
        })

        this.game.registerAction('ArrowRight', () => {
            this.paddle.moveRight()
        })
    }

    clear() {
        this.game.deregisterAction('ArrowLeft')
        this.game.deregisterAction('ArrowRight')
    }

}
