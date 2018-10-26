class EndScene extends Scene{
    constructor(game) {
        super(game)
    }

    addListener() {
        this.game.registerAction('r', () => {
            var s = new MainScene(this.game)
            this.game.changeScene(s)
        })
    }


    draw() {
        var text = '按 r 重新开始游戏'
        this.game.drawText(text, 150, 150)
    }

    clear() {
        this.game.deregisterAction('r')
    }

}
