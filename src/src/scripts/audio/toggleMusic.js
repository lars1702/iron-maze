
let songs = {}

//bake all this into a Promise, where the "new Audio" is called in the Promise, the song[file] is put in the .then after, and everything else is called in the thens after that
function toggleMusic (file) {
  if (typeof file !== "string") return console.log("no worky wida da audio")
  console.log("songs", songs)

  if (!songs[file]){
    const song = new Audio(`../src/audio/${file}`)
    songs[file] = song
  }

  else
    song = songs[file]
  
  if (!song) return console.warn("Yeah, so that audio thing? Didnt work out, man.")

  console.log('DEBUG - song, songs', song, songs)
  
  if (song.paused){
    song.load()
    song.play()
    console.log('DEBUG - song is playing:', Boolean(!song.paused))
  }
  else if (!song.paused) {
    song.pause()
    console.log('DEBUG - Song is paused:', Boolean(song.paused))
  }
}

export default toggleMusic