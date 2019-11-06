var log = console.log.bind(console)

function imageFromPath(path) {
    var img = new Image();
    img.src = path;
    return img
}

function collide(rect1, rect2) {
    var collideX = rect1.x < rect2.x + rect2.w
            && rect1.x + rect1.w > rect2.x
    var collideY = rect1.y < rect2.y + rect2.h
            && rect1.h + rect1.y > rect2.y
    return collideX && collideY
}


function loadLevel(game, n) {
    index = n
    if (index >= levels.length) {
        index =  levels.length - 1
    }
    level = levels[index]
    bricks = []
    for (var state of level) {
        // state [ x, y, 生命值, 分数 ]
        b = new Brick(game, state)
        bricks.push(b)
    }
    return bricks
}

function debugMode(game, enableDebug) {
    pauseForDebug = false

    if (!enableDebug) {
        return
    }

    listenPause()
    listenLoadLevel(game)
    listenDragBall(game)
    listenEndScene(game)
}

function listenPause() {
    window.addEventListener('keydown', function(event) {
        if (event.key == 'p') {
            pauseForDebug = !pauseForDebug
        }
    })
}

function listenLoadLevel(game) {
    window.addEventListener('keydown', function(event) {
        if ('0123456'.includes(event.key)) {
            var level = event.key
            var bricks = loadLevel(game, level)
            game.scene.bricks = bricks
        }
    })
}

function listenDragBall(game) {
    var canMove = false
    window.addEventListener('mousedown', function(event) {
        var b = game.scene.ball
        if (b && b.hasPoint(event.offsetX, event.offsetY)) {
            canMove = true
        }
    })

    window.addEventListener('mousemove', function(event) {
        if (canMove) {
            b = game.scene.ball
            b.x = event.offsetX
            b.y = event.offsetY
        }
    })

    window.addEventListener('mouseup', function(event) {
        canMove = false
    })
}

function listenEndScene(game) {
    window.addEventListener('keydown', function(event) {
        if (event.key == 'o') {
            game.gameOver()
        }
    })

}
