import { set } from "/sounds/sets.js";

const $pads = $(".drum-pad");
const keys = [113, 119, 101, 97, 115, 100, 122, 120, 99];

for (const [key, value] of Object.entries(set.sounds)) {
  $("#" + key)[0].src = value;
}

$(document).keypress(function (event) {});
