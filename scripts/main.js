import { set } from "/sounds/sets.js";

const keys = ["q", "w", "e", "a", "s", "d", "z", "x", "c"];

for (const i of Object.entries(set.sounds)) {
  $("#" + i[0])[0].src = i[1].path;
}

const $display = $("#display");

function display(text) {
  $display.text(text);
}

let pressedKeys = [];

function active(key) {
  const $audio = $("#" + key)[0];

  pressedKeys.push(key);
  $(`div[data-key=${key}]`).addClass("active");

  $audio.play();
  $audio.currentTime = 0;

  display(set.sounds[key].name);
}

function inactive(event) {
  let key;
  event.key != undefined
    ? (key = event.key.toLowerCase())
    : (key = event.data.key.toLowerCase());
  const isPressed = pressedKeys.map((e, i) => {
    if (e === key) {
      pressedKeys.splice(i, 1);
      return true;
    }
  });
  if (isPressed) {
    $(`div[data-key=${key}]`).removeClass("active");
  }
}

$(document).on("keyup", { test: this }, inactive);

$(document).keypress(function (event) {
  const eventKey = event.key.toLowerCase();
  if (pressedKeys.indexOf(eventKey) === -1) {
    keys.forEach((key) => {
      if (eventKey === key) {
        active(key);
      }
    });
  }
});

$(".drum-pad").on("mousedown", function (event) {
  const $element = $(event.target);
  const key = $element.attr("data-key");
  active(key);
  $element.one("mouseup", { key: key }, inactive);
});
