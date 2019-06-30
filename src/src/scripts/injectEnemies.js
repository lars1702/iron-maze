import $ from "jquery"

export default function injectEnemies(level) {
  if (level === 2) {
    let enemy1 = $("<div class='lvl2-snakes snake-pos-1'></div>")
    let enemy2 = $("<div class='lvl2-snakes snake-pos-2'></div>")
    let enemy3 = $("<div class='lvl2-snakes snake-pos-3'></div>")
    let enemy4 = $("<div class='lvl2-snakes snake-pos-4'></div>")
    $(".gameboard").append(enemy1, enemy2, enemy3, enemy4)
    $(".lvl2-snakes").hover(() => {
      if ($(".wall").hasClass("active")) {
        $("#hammertime").get(0).pause()
        $("#wall-hit").get(0).play()
        $(".wall").removeClass("active")
        let purpleSnakesTxt = $("<span class='hint-span'> pointer-eating snakes</span>").css("color", "purple")
        let mateTryAgain = $("<span class='hint-span'> mate. Try again.</span>").css("color", "black")
        $(".hint").text("You want to avoid the").css("color", "black").append(purpleSnakesTxt).append(mateTryAgain)
      }
    })
  }
}