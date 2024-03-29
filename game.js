

class Game {
    constructor() {
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        this.context.font = '20px serif';
        this.context.fillStyle = "blue"
        this.actions = {}
        this.keydowns = {}
        this.images = {}
        this.scene = null

        this.addListener()
        // 加载图像后运行游戏
        this.loadImages()
    }

    loadImages() {
        var images = this.getImagePath()
        var names = Object.keys(images)
        var load = 0
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = images[name]
            let img = imageFromPath(path)
            img.onload = () => {
                this.images[name] = img
                load += 1
                var loadAll = load == names.length
                if (loadAll) {
                    this.__start()
                }
            }
        }
    }

    getImagePath() {
        var images = {
            'ball': 'image/ball.png',
            'brick': 'image/brick.png',
            'paddle': 'image/paddle.png',
            'background': 'image/background.jpg',
        }
        return images
    }

    __start() {
        var s = new StartScene(this)
        this.scene = s
        this.run()
    }

    imageByName(name) {
        return this.images[name]
    }

    run() {
        setTimeout(() => {
            this.runLoop()
            this.run()
        }, this.getFps())
    }

    runLoop() {
        if (!pauseForDebug) {
            this.update()
        }
        this.clear()
        this.draw()
    }

    getFps() {
        var input = document.querySelector('#id-fps')
        var frame = Number(input.value)
        if (frame == 0) {
            return 2000
        }
        var fps = 1000/ frame
        return fps
    }

    gameOver() {
        var s = new EndScene(this)
        this.changeScene(s)
    }

    addListener() {
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })

        window.addEventListener('keyup', event => {
            this.keydowns[event.key] = false
        })

    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }

    deregisterAction(key, callback) {
        delete this.actions[key]
    }

    changeScene(newScene) {
        this.scene.clear()
        this.scene = newScene
    }

    update() {
        this.scene.update()
        for (var k in this.actions) {
            if (this.keydowns[k]) {
                this.actions[k]()
            }
        }
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    draw () {
        var bg = new BackGround(this)
        this.drawImage(bg)
        this.scene.draw()
    }

    drawImage(image) {
        this.context.drawImage(image.image, image.x, image.y, image.w, image.h);
    }

    drawText(text, x, y) {
        this.context.fillText(text, x, y)
    }
}
