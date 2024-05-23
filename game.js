var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var gameStarted = false;

//now, we need to detect whether a keyboard key is pressed or not
$("body").keydown(function () {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);

    nextSequence();
    gameStarted = true;
  }
});

//to check which button is pressed
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  //get the pressed button pushed in the new array
  userClickedPattern.push(userChosenColour);
  //play sound when btn is pressed
  playSound(userChosenColour);
  //play animation when btn is pressed
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// Firstly, the game shows the first colour in the sequence (blue). The user clicks on the blue button
// the game shows the next colour (red), the user has to remember the sequence is blue, red and so on and so forth.
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    wrongAnswer();
  }
}

//Gameover

function wrongAnswer() {
  var wrongSound = new Audio("sounds/wrong.mp3");
  wrongSound.play();
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press A Key to Start");
  startOver();
}

function startOver() {
  gameStarted = false;
  gamePattern = [];
  level = 0;
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4); //This is between 0 to 3

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  // flashing buttons color
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  // playing sound for buttons selected
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// add animations to user clicks
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
