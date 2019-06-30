import $ from "jquery"
import { mapOne, mapTwo, mapThree } from "./functions/maps"
import toggleMusic from "./functions/audio/toggleMusic"
import injectMessage from "./functions/injectMessages"
import injectEnemies from "./functions/injectEnemies"
import startButton from "./components/StartButton"
import finishZone from "./components/FinishZone"
import floorArea from "./components/FloorArea"
import wallArea from "./components/WallArea"
import React from "react"
import "./style.css"

class Game extends React.Component {
  level = 0
  nextLevel = () => {
    let { level } = this
    let curMap = [mapOne, mapTwo, mapThree][level]
    level++
    this.makeMap(curMap, level)
    injectEnemies(level)
    injectMessage(level, "start")
    if (level > 3) $("#final-level-win").get(0).play()
  }

  makeMap = (map, level) => {
    this.level = level
    $(".gameboard").empty()
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 32; j++) {
        let cellDiv = $("<div id='" + i + "-" + j + "' class='cell'></div>")
        const data = { map,i,j,$ }
        $(".gameboard").append(cellDiv)
        floorArea(data)
        wallArea(data)
        startButton(data)
        finishZone(data)
      }
    }
  
    /* -------------------------------------
    STARTING THE LEVEL
    ------------------------------------- */
    $(".start-btn").click(() => {
      $(".wall").addClass("active")
      toggleMusic('cant-touch-this.mp3')
      injectMessage(this.level, "button")
    })
    $(".start-btn").mousedown(() => { $(".start-btn").toggleClass("clicked") })
    $(".start-btn").mouseup(() => { $(".start-btn").toggleClass("clicked") })
  
    /* -------------------------------------
        LOSING THE LEVEL
    ------------------------------------- */
    $(".wall").hover(() => {
      if ($(".wall").hasClass("active")) {
        $(".wall").removeClass("active")
        toggleMusic('cant-touch-this.mp3')
        $("#wall-hit").get(0).play()
        injectMessage(this.level, "death", "wall")
      }
    })
  
    /* -------------------------------------
    WINNING THE LEVEL
    ------------------------------------- */
    $(".finish-btn").hover(() => {
      if ($(".wall").hasClass("active")) {
        $(".wall").removeClass("active")
        toggleMusic('cant-touch-this.mp3')
        toggleMusic('teleport.mp3')
        if (this.level === 3) {
          $("#final-level-win").get(0).play()
          $(".hint").text("You. You are a champion. You deserve this win.").css({"color": "gold", "text-align": "center", "text-shadow": "2px 2px black"})
        }
        this.nextLevel()
      }
    })
  }

  componentDidMount() {
    this.makeMap(mapOne, 1)
  }
  render() {
      return(
      <div className="game-page">
        <h1 id="game-heading">The Mouse Maze</h1>
        <div className="gameboard"/>
        <p className="hint">Click the green button to start the game!</p>
        <audio id="hammertime" src="../src/audio/cant-touch-this.mp3" type="audio/mpeg">Your browser does not support the audio element.</audio>
        <audio id="teleport" src="../src/audio/teleport.wav" type="audio/wav">Your browser does not support the audio element.</audio>
        <audio id="wall-hit" src="../src/audio/wall-hit.wav" type="audio/wav">Your browser does not support the audio element.</audio>
        <audio id="wall-lose" src="../src/audio/wall-lose.wav" type="audio/wav">Your browser does not support the audio element.</audio>
        <audio id="final-level-win" src="../src/audio/final-level-win.wav" type="audio/wav">Your browser does not support the audio element.</audio>
      </div>
    )
  }
}

export default Game
