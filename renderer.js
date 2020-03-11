export default function createRenderer(screen, game, requestAnimationFrame, document) {
    const context = screen.getContext('2d')
    const score = document.querySelector("h2")

    const state = {
        observers: []
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    function renderScreen() {
        if (game.state.gameStatus === 'running') {
            refreshForGameState()
        } else if (game.state.gameStatus === 'game over') {
            refreshForGameOver()
        }

        notifyAll()
        requestAnimationFrame(renderScreen)

    }

    function refreshForGameState() {
        context.clearRect(0, 0, screen.width, screen.height);

        for (const playerPositionId in game.state.playerPositions) {
            const position = game.state.playerPositions[playerPositionId]

            context.fillStyle = 'red'
            context.fillRect(position.x, position.y, 1, 1)
        }

        for (const fruitId in game.state.fruits) {
            const fruit = game.state.fruits[fruitId]

            context.fillStyle = 'grey'
            context.fillRect(fruit.x, fruit.y, 1, 1)
        }

        score.innerHTML = "SCORE: " + game.state.currentScore
    }

    function refreshForGameOver() {
        context.clearRect(0, 0, screen.width, screen.height);

        for (const playerPositionId in game.state.playerPositions) {
            const position = game.state.playerPositions[playerPositionId]
            context.fillStyle = 'red'
            context.fillRect(position.x, position.y, 1, 1)
        }

        for (const fruitId in game.state.fruits) {
            const fruit = game.state.fruits[fruitId]

            context.fillStyle = 'grey'
            context.fillRect(fruit.x, fruit.y, 1, 1)
        }

        score.innerHTML = "SCORE: " + game.state.currentScore
    }



    return {
        renderScreen,
        subscribe
    }

}