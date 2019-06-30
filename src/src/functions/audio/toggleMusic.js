
let songs = {}

//this function attempts to take in an audio file and play or pause it
function toggleMusic (file) {
  const song = songs[file] || new Audio('../src/audio/'+file)
  if (!song || typeof file !== "string") return console.warn("No working audio file.")
  if (song.paused){
    song.load()
    song.play()
  }
  else song.pause()
  return console.log("DEBUG - song is", Boolean(!song.paused) ? "playing" : "paused")
}

export default toggleMusic