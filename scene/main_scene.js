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
        var text = '分数： ' + this.score
        this.game.drawText(text, 300, 290)

        for (var b of this.bricks) {
            this.game.drawImage(b)
        }
        this.game.drawImage(this.ball)
        this.game.drawImage(this.paddle)

    }

    update() {
        this.ball.move()
        // 碰撞处理
        this.checkCollide()
        // 更新砖块
        var deadBricks = this.updateBricks()
        this.updateScore(deadBricks)
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
        var img = this.collideImage()
        var isCollide = img != null
        if (isCollide) {
            // 检测侧面碰撞或正面碰撞，并作出处理
            var collideKind = this.isProfileCollide(img)
            this.ball.handleCollide(collideKind)
            img.handleCollide()
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

    // 是否撞到木板的侧面（左右面）
    isProfileCollide(image) {
        // 先假设碰撞到正面（上下面），如果调整方向后仍然会碰到木板
        // 说明撞到的不是正面，而是侧面
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
