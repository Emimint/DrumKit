
'use strict';

const keys = document.querySelectorAll(".key"); // list of all key div elements

// 1: Changing html element to play specific sound:
function letsDrum(e) {
  const divInfo = document.querySelector(`div[data-key="${e.keyCode}"]`);
  const audioInfo = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if (!divInfo) return; // stop if none of the desired keys
  divInfo.classList.add("playing");
  audioInfo.currentTime = 0; // rewind files to current time
  audioInfo.play(); // play audio file
}

window.addEventListener("keydown", letsDrum);

// 2: Monitoring each key transition to revert animation:
function revertTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

keys.forEach((x) => x.addEventListener("transitionend", revertTransition));
