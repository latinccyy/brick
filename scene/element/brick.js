class Brick {
    constructor(game, state) {
        this.x = state[0]
        this.y = state[1]
        this.h = 20
        this.w = 50
        this.health = state[2]
        this.score = state[3]

        this.image = game.imageByName('brick')
    }

    decreaseHealth() {
        this.health -= 1
    }

    isDead() {
        return this.health < 1
    }

    handleCollide() {
        this.decreaseHealth()
    }

}
