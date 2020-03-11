export default function createKeyboardListener(document) {
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

    document.addEventListener('keydown', handleKeyDown)

    function handleKeyDown(event) {
        const keyPressed = event.key

        notifyAll(keyPressed)
    }

    document.getElementById('difficulty').addEventListener("click", function(){ notifyAll("changeDifficulty"); })
    document.getElementById("startGame").addEventListener("click", function(){ notifyAll("startGame"); })

    return {
        subscribe
    }

}
