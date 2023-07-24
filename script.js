"use strict";

const keys = document.querySelectorAll(".key"); // list of all key div elements

// 1: Changing html element to play specific sound:
function letsDrum( e ) {
    // console.log(e);
    // console.log(e.type);
  let divInfo = null;
  if (e.type == "keydown") {
    divInfo = document.querySelector(`div[data-key="${e.keyCode}"]`);
  } else if (e.type == "click") {
    divInfo = e.target.closest(".key");
  }
  else if (e.type == "touchstart") {
    divInfo = e.target.closest( ".key" );
    console.log(divInfo);
  }
  if (!divInfo) return; // stop if none of the desired keys
  const keyInfo = divInfo.getAttribute( "data-key" );
  const audioInfo = document.querySelector(`audio[data-key="${keyInfo}"]`);
  divInfo.classList.add("playing");
  audioInfo.currentTime = 0; // rewind files to current time
  audioInfo.play(); // play audio file
}

// 2: Monitoring each key transition to revert animation:
function revertTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

keys.forEach((x) => x.addEventListener("transitionend", revertTransition));
keys.forEach((x) =>
  x.addEventListener("webkitTransitionEnd", revertTransition)
);

// 3: Choosing event to listen to according to viewport:
window.addEventListener("keydown", letsDrum);
window.addEventListener("click", letsDrum);
window.addEventListener("touchstart", letsDrum);

