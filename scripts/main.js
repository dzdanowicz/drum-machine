import { set } from "/sounds/sets.js";

const $pads = $(".drum-pad");
const keys = ["q", "w", "e", "a", "s", "d", "z", "x", "c"];

for (const [key, value] of Object.entries(set.sounds)) {
  $("#" + key)[0].src = value;
}

function active(element) {}

$(document).keypress(function (event) {
  keys.forEach((key) => {
    if (event.key === key) {
      active($(`div[data-key=${key}]`), key);
    }
  });
});
