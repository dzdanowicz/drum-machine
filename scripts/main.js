import { set } from "/sounds/sets.js";

const keys = ["q", "w", "e", "a", "s", "d", "z", "x", "c"];

for (const [key, value] of Object.entries(set.sounds)) {
  $("#" + key)[0].src = value;
}

let pressedKeys = [];

function active(element, key) {
  pressedKeys.push(key);
  $(element).css("filter", "brightness(140%)");
  let $audio = $("#" + key)[0];
  $audio.play();
  $audio.currentTime = 0;
}

$(document).on("keyup", function (event) {
  const eventKey = event.key.toLowerCase();
  const isPressed = pressedKeys.map((e, i) => {
    if (e === eventKey) {
      pressedKeys.splice(i, 1);
      return true;
    }
  });
  if (isPressed) {
    $(`div[data-key=${eventKey}]`).css("filter", "brightness(100%)");
  }
});

$(document).keypress(function (event) {
  const eventKey = event.key.toLowerCase();
  if (pressedKeys.indexOf(eventKey) === -1) {
    keys.forEach((key) => {
      if (eventKey === key) {
        active(`div[data-key=${key}]`, key);
      }
    });
  }
});
