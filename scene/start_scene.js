class StartScene extends Scene{
    constructor(game) {
        super(game)
    }

    addListener() {
        this.game.registerAction('s', () => {
            // 加载游戏核心场景
            var s = new MainScene(this.game)
            this.game.changeScene(s)
        })
    }

    draw() {
        var text = '按 s 开始游戏'
        this.game.drawText(text, 150, 150)
    }

    clear() {
        this.game.deregisterAction('s')
    }
}
