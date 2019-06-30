import $ from "jquery"

function fr(coloredElement, string) {
  return $(coloredElement).text(string)
}

let red = "<span class='hint-red'></span>"
let green = "<span class='hint-green'></span>"
let black = "<span class='hint-black'></span>"
let purple = "<span class='hint-purple'></span>"

let allMessages = [
  {
    "button": [],
    "start": [],
    "death": {
      "enemy": [],
      "wall": [
        fr(black, "HAH. You "),
        fr(red, "lost. "),
        fr(black, "Try again? Just press "),
        fr(green, "the button.")
      ],
    },
  },
  {
    "button": ["asdasd" ],
    "start": [
      fr(black,"Oh, you actually made it? Wow. Well, you know "), 
      fr(green,"what to do.")
    ],
    "death": {
      "enemy": "dont die by the snakes",
      "wall": ""
    },
  },
  {
    "button": [],
    "start": [
      fr(black,"So. Uhm. Lucky you, its a safe zone! No enemies!")
    ],
    "death": {
      "enemy": [],
      "wall": [],
    },
  },
]


export default allMessages