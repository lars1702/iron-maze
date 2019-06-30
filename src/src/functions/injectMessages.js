import "../styles/messages.css"
import $ from "jquery"
import allMessages from "./allMessages.js"
import { messageFailure } from "./messageFailure"

const injectMessage = (level, event, subEvent) => {
  let spanElems
  if (!subEvent && !Object.keys(allMessages[0]).includes(event))
    return messageFailure(level, event, allMessages)
  if (subEvent && !Object.keys(allMessages[0]).includes(event))
    return console.warn("There was subevent, but somehow you still failed?",event, subEvent, level)
  if (Boolean(event && !subEvent))
    spanElems = allMessages[level-1] && allMessages[level-1][event]
  else if (Boolean(event && subEvent))
    spanElems = allMessages[level-1] && allMessages[level-1][event][subEvent]
  return makeMessage(spanElems)
}

function makeMessage(spanElements) {
  let message = $(".hint").text("")
  if (Array.isArray(spanElements) && spanElements.length >= 1)
    spanElements.forEach((span) => message.append(span))
  else // The general msg when the message event exists, but injection doesnt work.
    message.append($("<span class='hint-red'>I don't know what to say.</span>")) 
  return message
}


export default injectMessage