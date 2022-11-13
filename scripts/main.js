import { set } from "/sounds/sets.js";

const $pads = $(".drum-pad");
const keys = [81, 87, 69, 65, 83, 68, 90, 88, 67];

for (const [key, value] of Object.entries(set.sounds)) {
  $("#" + key)[0].src = value;
}

$(document).keypress(function (event) {});
