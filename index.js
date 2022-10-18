var randomPattern = []; //Random sequence
var playersPattern = []; //Playrs choices
var colors = ["blue", "green", "blue", "yellow"]; //Array of colors
var count = 0; //Index for checking if the pattern is correct
var wrongAudio = new Audio("sounds/wrong.mp3"); //Game over sound
var start = false; //Start flag
var gameOverBool = false; //Game over flag
var level = 0; // Level count

//------------------------ Functions --------------------------//

// Adding new color
function addNewColor() {
  $("#level-title").text("Level " + ++level);
  var randomNumber = genarateNamber();
  randomPattern.push(colors[randomNumber]);
  animatePress(colors[randomNumber]);
  playSound(colors[randomNumber]);
}

//Play sound function
function playSound(button) {
  var audio = new Audio("sounds/" + button + ".mp3");
  audio.play();
}

//Random number generator
function genarateNamber() {
  return Math.floor(Math.random() * colors.length);
}

// Check if patterns is the same
function checkCorrect() {
  if (playersPattern[count] == randomPattern[count]) {
    if (++count === randomPattern.length) {
      count = 0;
      playersPattern = [];
      setTimeout(function () {
        addNewColor();
      }, 1000);
    }
    return true;
  } else return false;
}

//Game over or start again ?
function gameOver() {
  gameOverBool = true;
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 150);
  randomPattern = [];
  playersPattern = [];
  level = 0;
  $("#level-title").text("Press A Key to Start Again");
  start = false;
}

//Animations
function animatePress(button) {
  setTimeout(function () {
    $("#" + button)
      .fadeOut(300)
      .fadeIn(150);
  }, 100);
}

//------------------------ Events --------------------------//

//Wait for button click
$(".btn").click(function () {
  if (start && !gameOverBool) {
    playersPattern.push($(this).attr("id"));
    console.log(playersPattern);
    var check = checkCorrect();
    if (!check) {
      wrongAudio.play();
      gameOver();
    } else playSound($(this).attr("id"));
    animatePress($(this).attr("id"));
  }
});

// Wait for keyboard press
$(document).keydown(function (event) {
  console.log(start);
  if (!start) addNewColor();
  start = true;
  gameOverBool = false;
});
