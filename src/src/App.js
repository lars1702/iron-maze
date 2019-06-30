/* eslint-disable eqeqeq */

import { mapOne, mapTwo, mapThree } from "./scripts/maps"
import toggleMusic from "./scripts/audio/toggleMusic.js"
import injectMessage from "./scripts/injectMessages"
import injectEnemies from "./scripts/injectEnemies"
import startButton from "./components/StartButton"
import finishZone from "./components/FinishZone"
import floorArea from "./components/FloorArea"
import wallArea from "./components/WallArea"
import $ from "jquery"

function Game(maze, level, messages, enemies) {
  this.map = maze
  this.level = level
  this.messages = messages
  this.enemies = enemies
}

var mazeGame = new Game()

Game.prototype.makeMap = function(map, level) {
  this.level = level
  $(".gameboard").empty()
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 32; j++) {
      let cellDiv = $("<div id='" + i + "-" + j + "' class='cell'></div>")
      $(".gameboard").append(cellDiv)
      floorArea(map)
      wallArea(map)
      startButton(map)
      finishZone(map)
    }
  }

  /* -------------------------------------
  STARTING THE LEVEL
  ------------------------------------- */
  $(".start-btn").click(function() {
    $(".wall").addClass("active")
    toggleMusic('cant-touch-this.mp3')

    // different start-msg for different levels
    if (mazeGame.level === 1) {
      $(".hint").text("Move your mouse through the maze. Don't touch the walls!").css("color", "black")
    }
    else if (mazeGame.level === 2) {
      var purpleSnakesTxt = $("<span class='hint-span'> pointer-eating snakes.</span>").css("color", "purple")
      $(".hint").text("Watch out for those").css("color", "black").append(purpleSnakesTxt)
    }
    else if (mazeGame.level === 3) {
      var evilCurse = $("<span class='hint-span'>evil curse </span>").css("color", "darkred")
      var lurksHere = $("<span class='hint-span'>that lurks here</span>").css("color", "black")
      $(".hint").text("This dungeon hints at the ").css("color", "black").append(evilCurse).append(lurksHere)
    }
  })
  $(".start-btn").mousedown(function() { $(".start-btn").toggleClass("clicked") })
  $(".start-btn").mouseup(function() { $(".start-btn").toggleClass("clicked") })

  /* -------------------------------------
      LOSING THE LEVEL
  ------------------------------------- */
  $(".wall").hover(function() {
    if ($(".wall").hasClass("active")) {
      $(".wall").removeClass("active")
      toggleMusic('cant-touch-this.mp3')
      $("#wall-hit").get(0).play()

      // different msg for different levels
      if (mazeGame.level === 1) {
        injectMessage(mazeGame.level, "death", "wall")
      }
      else if (mazeGame.level === 2) {
        $(".hint").text("Really? The wall? ").css("color", "darkred")
      }
      else if (mazeGame.level === 3) {
        var noFreeTimeSocialLife = $("<span class='hint-span'>curse you with no free-time or social life!</span>").css("color", "darkred")
        var mwahahaha = $("<span class='hint-span'> MWAHAHA!</span>").css("color", "black")
        $(".hint").text("The iron-walls ").css("color", "black").append(noFreeTimeSocialLife).append(mwahahaha)
        $("#wall-lose").get(0).play()
      }
    }
  })

  /* -------------------------------------
  WINNING THE LEVEL
  ------------------------------------- */
  $(".finish-btn").hover(function() {
    if ($(".wall").hasClass("active")) {
      $(".wall").removeClass("active")
      toggleMusic('cant-touch-this.mp3')
      if (mazeGame.level < 3) {
        $("#teleport").get(0).play()
      }
      else {
        $("#final-level-win").get(0).play()
        $(".hint").text("You. You are a champion. You deserve this win.").css({"color": "gold", "text-align": "center", "text-shadow": "2px 2px black"})
      }
      nextLevel()
    }
  })
}

/* ----------------------------------------------------------------------------------------
|
|    Next level-function
|
\---------------------------------------------------------------------------------------- */

function nextLevel() {
  let { level } = mazeGame
  level++
  let curMap = [mapOne, mapTwo, mapThree][level-1]
  mazeGame.makeMap(curMap, level)
  injectEnemies(level)
  injectMessage(level, "start")
  if (level > 3) $("#final-level-win").get(0).play()
}

const startGame = () => {
  mazeGame.makeMap(mapOne, 1)
  //mazeGame.startLevel()
  //mazeGame.loseLevel()
  //mazeGame.winLevel()
  //mazeGame.nextLevel()
}
export default startGame
