"use strict";

const keys = document.querySelectorAll(".key"); // list of all key div elements

// 1: Changing html element to play specific sound:
function letsDrum(e) {
  // Event can be TouchEvent or KeyEvent!!!
  console.log(e.keyCode);
  console.log(e);
  console.log(e.touches[0].target.childNodes);
  console.log(e.touches[0].target);

  const divInfo = document.querySelector(`div[data-key="${e.keyCode}"]`);
  console.log(divInfo);

  const audioInfo = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if (!divInfo) return; // stop if none of the desired keys
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

// 3: Choosing event to listen to according to viewport:
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  // if using mobile:
  window.addEventListener("touchstart", letsDrum);
} else {
  window.addEventListener("keydown", letsDrum);
}

// window.addEventListener("touchstart", getTouchPosition);


// Returning TouchEvent position:
function getTouchPosition(e) {
  console.log(`the user touched the screen!`);
  var evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
  var touch = evt.touches[0] || evt.changedTouches[0];
  let x = touch.pageX;
  let y = touch.pageY;
  console.log(x, y);
}


// Returning all div.key element (e.g. drum keys) positions:
keys.forEach((key, i) => {
  var rect = key.getBoundingClientRect();
  console.dir(key);
  console.log(
    `key [${i}]: ${rect.top}, ${rect.right}, ${rect.bottom}, ${rect.left}`
  );
});
