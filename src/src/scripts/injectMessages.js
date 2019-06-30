import "../styles/messages.css"
import $ from "jquery"
import allMessages from "./allMessages.js"
import { messageFailure } from "./messageFailure"

function injectMessage(level, event, subEvent) {
  if (!subEvent && !Object.keys(allMessages[0]).includes(event)){
    //console.log('DEBUG - level', level, "event",event)
    messageFailure(level, event, allMessages)
  }
  if (subEvent && !Object.keys(allMessages[0]).includes(event))
    console.warn("There was subevent, but somehow you still failed?",event, subEvent, level)

  let spanElems
  if (Boolean(event && !subEvent)){
    console.warn("aint got no sub elements b0i")
    spanElems = allMessages[level-1] && allMessages[level-1][event]
  }
  else if (Boolean(event && subEvent)){
    spanElems = allMessages[level-1] && allMessages[level-1][event][subEvent]
  }

  //console.log('DEBUG - event, subEvent', event, subEvent)
  //console.log('DEBUG - spanElems----------------', spanElems)
  //console.log('DEBUG - makeMessage(spanElems', makeMessage(spanElems))

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