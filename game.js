if(/Mobi|Android/i.test(navigator.userAgent)){
    $("#level-title").text("Tap Screen to Start");
} else {
    $("#level-title").text("Press A Key to Start");
}

var buttonColours = ["red", "blue", "green", "yellow"]; 

var gamePattern = [];

var userClickedPattern=[];

var started=false;
var level=0;

//// Desktop - listens for keyboard
$(document).keydown(function(){
    if (started===false){
        $("#level-title").text("Level"+level);
        nextSequence();
        started=true;
    }
})

//// Mobile - listens for screen tap
$(document).click(function(event){
    if(!$(event.target).hasClass("btn")){
        if(started === false){
            nextSequence();
            started = true;
        }
    }
});


$(".btn").click(function (){
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});



function checkAnswer(currentLevel){
     if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (userClickedPattern.length===gamePattern.length){
            setTimeout(function(){ 
            nextSequence(); // wait 1 second then go next level
            }, 1000);
            
        }
     }else{
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
     }
}

function nextSequence(){
    userClickedPattern = [];
    level++;  // increases level by 1 each time
    $("#level-title").text("Level " + level);

    var n = Math.random();
    var randomNumber= Math.floor(n*4);
    var randomChosenColour =buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);   
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
    
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

     setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}


