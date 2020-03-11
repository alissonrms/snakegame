export default function createGame(screen, document) {

    const state = {
        currentPlayerDirection: 'ArrowRight',
        countToMove: 0,
        gameDifficulty: 'hard',
        gameStatus: 'game Over',
        currentScore: 0,
        previousSeedPosition: { x: 7, y: 0 },
        previousEndPosition: { x: 1, y: 0 },

        playerPositions: {
        },

        fruits: {
            'fruit1': { x: 8, y: 7 }
        }
    }


    //////////////////////Move Player Actions////////////////////////
    function movePlayer() {
        if (state.gameStatus == 'running') {
            acceptedMoves[state.currentPlayerDirection]()
            state.countToMove = 0
            checkForCollisionWithFruits()
            checkForCollisionInTheSnake()
        }

    }

    const acceptedMoves = {
        ArrowUp() {
            state.previousSeedPosition.x = state.playerPositions.seed.x
            state.previousSeedPosition.y = state.playerPositions.seed.y
            state.playerPositions.seed.y -= 1
            updatePositions()
            checkForCollisionWithTheEdge['ArrowUp']()

        },

        ArrowDown() {
            state.previousSeedPosition.x = state.playerPositions.seed.x
            state.previousSeedPosition.y = state.playerPositions.seed.y
            state.playerPositions.seed.y += 1
            updatePositions()
            checkForCollisionWithTheEdge['ArrowDown']()
        },

        ArrowRight() {
            state.previousSeedPosition.x = state.playerPositions.seed.x
            state.previousSeedPosition.y = state.playerPositions.seed.y
            state.playerPositions.seed.x += 1
            updatePositions()
            checkForCollisionWithTheEdge['ArrowRight']()
        },

        ArrowLeft() {
            state.previousSeedPosition.x = state.playerPositions.seed.x
            state.previousSeedPosition.y = state.playerPositions.seed.y
            state.playerPositions.seed.x -= 1
            updatePositions()
            checkForCollisionWithTheEdge['ArrowLeft']()
        }
    }

    function updatePositions() {
        let tempPosition1 = { x: 0, y: 0 }
        let tempPosition2 = state.previousSeedPosition

        for (const playerPositionId in state.playerPositions) {
            const actualPosition = state.playerPositions[playerPositionId]
            if (playerPositionId === 'seed') {

            } else {
                state.previousEndPosition.x = actualPosition.x
                state.previousEndPosition.y = actualPosition.y
                tempPosition1.x = actualPosition.x
                tempPosition1.y = actualPosition.y
                actualPosition.x = state.previousSeedPosition.x
                actualPosition.y = state.previousSeedPosition.y
                tempPosition2.x = tempPosition1.x
                tempPosition2.y = tempPosition1.y

            }
        }
    }

    function updateDirection(newDirection) {
        switch (newDirection) {
            case "ArrowRight":
                if (state.currentPlayerDirection != "ArrowLeft" && state.currentPlayerDirection != "ArrowRight") {
                    state.currentPlayerDirection = newDirection
                    movePlayer()
                }
                break

            case "ArrowLeft":
                if (state.currentPlayerDirection != "ArrowRight" && state.currentPlayerDirection != "ArrowLeft") {
                    state.currentPlayerDirection = newDirection
                    movePlayer()
                }
                break

            case "ArrowUp":
                if (state.currentPlayerDirection != "ArrowDown" && state.currentPlayerDirection != "ArrowUp") {
                    state.currentPlayerDirection = newDirection
                    movePlayer()
                }
                break

            case "ArrowDown":
                if (state.currentPlayerDirection != "ArrowUp" && state.currentPlayerDirection != "ArrowDown") {
                    state.currentPlayerDirection = newDirection
                    movePlayer()
                }
                break
        }
    }

    /////////////Collision checks/////////////////////////
    function checkForCollisionInTheSnake() {
        for (const positionId in state.playerPositions) {
            if (positionId === 'seed') {

            } else {
                if (state.playerPositions[positionId].x === state.playerPositions.seed.x && state.playerPositions[positionId].y === state.playerPositions.seed.y) {
                    gameOver()
                    break
                }
            }
        }
    }

    function checkForCollisionWithFruits() {
        for (const fruitId in state.fruits) {
            if (state.playerPositions.seed.x === state.fruits[fruitId].x && state.playerPositions.seed.y === state.fruits[fruitId].y) {
                addNewPosition()
                removeFruit(fruitId)
                state.currentScore += 10
                addFruit()
                break
            }
        }
    }

    const checkForCollisionWithTheEdge = {
        ArrowUp() {
            if (state.playerPositions.seed.y < 0) {
                gameOver()
            }
        },

        ArrowDown() {
            if (state.playerPositions.seed.y >= screen.width) {
                gameOver()
            }
        },

        ArrowRight() {
            if (state.playerPositions.seed.x >= screen.height) {
                gameOver()
            }
        },

        ArrowLeft() {
            if (state.playerPositions.seed.x < 0) {
                gameOver()
            }
        }
    }



    //////////////Add and Remove objects//////////////////
    function addNewPosition() {
        //console.log(`add position ${Object.keys(state.playerPositions).length}a in x: ${state.previousEndPosition.x}, y: ${state.previousEndPosition.y}`)
        const newPositionId = `${Object.keys(state.playerPositions).length}a` //getting a new id based on snake size
        state.playerPositions[newPositionId] = {
            x: state.previousEndPosition.x,
            y: state.previousEndPosition.y
        }
    }

    function removePosition(playerPositionId) {
        delete state.playerPositions[playerPositionId]
    }

    function addFruit() {
        const newFruitId = `fruit${Object.keys(state.fruits).length + 1}`//getting a new id based on the amount of existing fruit 
        while (true) {
            const newPosition = getNewRandomPosition();
            if (validatePosition(newPosition)) {
                state.fruits[newFruitId] = {
                    x: newPosition.x,
                    y: newPosition.y
                }
                break
            } else {
            }
        }
    }

    function removeFruit(fruitId) {
        delete state.fruits[fruitId]
    }

    function getNewRandomPosition() {
        let position = { x: 0, y: 0 }
        const min = 0
        const max = screen.width - 1
        position.x = Math.floor(Math.random() * (max - min + 1)) + min
        position.y = Math.floor(Math.random() * (max - min + 1)) + min
        return position
    }

    function validatePosition(position) {
        for (const positionId in state.playerPositions) {
            const actualPosition = state.playerPositions[positionId]
            if (actualPosition.x === position.x && actualPosition.y === position.y) {
                return false
            }
        }
        return true
    }

    //////////////////Game Actions/////////////////////
    function screenRefreshed() {
        if (state.gameStatus === 'running') updateGame[state.gameDifficulty]()
    }

    function updateDifficulty(newDifficulty) {
        state.gameDifficulty = newDifficulty
    }

    const updateGame = {
        //the screen refresh is 60fps
        easy() {
            if (state.countToMove >= 10) { //this value decides the game speed
                movePlayer()
                state.countToMove = 0
            } else {
                state.countToMove++
            }
        },

        normal() {
            if (state.countToMove >= 7) { //this value decides the game speed
                movePlayer()
                state.countToMove = 0
            } else {
                state.countToMove++
            }
        },

        hard() {
            if (state.countToMove >= 4) { //this value decides the game speed
                movePlayer()
                state.countToMove = 0
            } else {
                state.countToMove++
            }
        }
    }

    function startGame(command) {
        if (command === 'startGame') {
            state.gameStatus = 'running'
            state.currentScore = 0
            state.currentPlayerDirection = "ArrowRight"
            state.gameDifficulty = document.getElementById("difficulty").innerHTML
            state.playerPositions = {
                'seed': { x: 7, y: 0 },
                '1a': { x: 6, y: 0 },
                '2a': { x: 5, y: 0 },
            }
        }
    }

    function changeDifficulty(command) {
        if (command === 'changeDifficulty') {
            const currentDifficulty = document.getElementById("difficulty")
            if (currentDifficulty.innerHTML === 'easy') {
                currentDifficulty.innerHTML = 'normal'
                currentDifficulty.className = "btn btn-warning"
            } else if (currentDifficulty.innerHTML === 'normal') {
                currentDifficulty.innerHTML = 'hard'
                currentDifficulty.className = "btn btn-danger"
            } else {
                currentDifficulty.innerHTML = 'easy'
                currentDifficulty.className = "btn btn-success"
            }
        }
    }

    function gameOver() {
        state.gameStatus = 'game over'
    }

    return {
        state,
        updateDirection,
        screenRefreshed,
        removePosition,
        updatePositions,
        startGame,
        addFruit,
        changeDifficulty,
        removeFruit
    }




}
