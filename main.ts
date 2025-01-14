let fixedImage: Image = null
let gameRunning = false
let earlyPress = false
let waitTime = 0
let startTime = 0
let reactionTime = 0
function showFixedImage () {
    fixedImage = images.createImage(`
        # # # . .
        # # # . .
        # # # . .
        # # # . .
        # # # . .
        `)
    fixedImage.showImage(0)
}
function startGame () {
    // Prevent starting the game if it's already running
    if (gameRunning) {
        return
    }
    gameRunning = true
    earlyPress = false
    basic.clearScreen()
    basic.showString("READY")
    // Wait for the player to press button A to begin
    while (!(input.buttonIsPressed(Button.B))) {
        basic.pause(10)
    }
    basic.clearScreen()
    // Show the waiting screen for 2 seconds
    basic.pause(2000)
    waitTime = Math.randomRange(2000, 5000)
    // Monitor early press during the wait time
    for (let index = 0; index < waitTime / 10; index++) {
        if (input.buttonIsPressed(Button.A)) {
            earlyPress = true
            break;
        }
        basic.pause(10)
    }
    if (earlyPress) {
        game.gameOver()
        gameRunning = false
        return
    }
    startTime = input.runningTime()
    showFixedImage()
    // Wait for the player to press button A and calculate reaction time
    while (gameRunning) {
        if (input.buttonIsPressed(Button.A)) {
            reactionTime = input.runningTime() - startTime
            game.addScore(1)
            basic.pause(10)
            // Show reaction time
            basic.showNumber(reactionTime)
            basic.clearScreen()
            // End the game
            gameRunning = false
            // Exit the loop after the reaction time is shown
            break;
        }
    }
}
// Start the game only when button A is pressed, and only if it's not already running
input.onButtonPressed(Button.A, function () {
    if (!(gameRunning)) {
        // Start the game only if it's not already running
        startGame()
    }
})
