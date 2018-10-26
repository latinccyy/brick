

function __main() {
    window.width = 400
    window.height = 300
    var g = new Game(function() {
        var s = new StartScene(g)
        g.scene = s
        g.run()
    })

    debugMode(g, true)
}


__main()
