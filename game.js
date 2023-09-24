let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let StartGame = false;
let level = 0;

function playSound(color) {
    let audio = new Audio(`./sounds/${color}.mp3`);
    audio.play();
}
function animateButton(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}
$(document).on("keydown", function () {
    if (!StartGame) {
        StartGame = true;
        nextLevel();
    }
});
function nextLevel() {
    userClickedPattern = [];  
    level++;  
    $("#level-title").text("Level " + level);  
    let newColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(newColor); 
    $("#" + newColor).fadeOut(100).fadeIn(100);  
    playSound(newColor); 
}

$(".btn").click(function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animateButton(userChosenColor);
    if (userClickedPattern[userClickedPattern.length - 1] !== gamePattern[userClickedPattern.length - 1]) {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    } 
    else if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
            nextLevel();
        }, 1000);
    }
});

function startOver() {
    level = 0;
    gamePattern = [];
    StartGame = false;
}