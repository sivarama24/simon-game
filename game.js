var userClickedPattern = [];
var gamePattern = [];

var level = 0;

var started = false;
document.addEventListener("keypress", function(e) {
    let stButton = e.key;
    if(started === false) {
        if(stButton == "Enter") {
            started = true;
            document.querySelector("#start").classList.remove("start-btn");
            setTimeout(function() {
                nextSequance();
            }, 200);
        }
    }
});
    
function nextSequance(){        
    var buttonColours = ["green", "red", "yellow", "blue"];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    animatePress(randomChosenColor);

    level += 1;
    $("#level-title").text("Level " + level);

};


document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function(e) {
        var userChosenColour = e.target.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1); 
    });
});


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};
  

function animatePress(currentColour) {
    var animateColor = document.getElementById(currentColour);
    animateColor.classList.add("pressed");
    setTimeout(function() {
        animateColor.classList.remove("pressed");
    }, 100);
};


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            userClickedPattern = [];
            setTimeout(function() {
                nextSequance();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("#level-title").text("Press Any Key to Restart");
        setTimeout(function() {
            startOver();
        }, 100);
    }
}   
    


function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    level = 0;
}
