import { sets } from "/sounds/sets.js";

const keys = ["q", "w", "e", "a", "s", "d", "z", "x", "c"];

for (const i of Object.entries(sets.sounds)) {
  const audio = $("#" + i[0])[0];
  audio.src = i[1].path;
  audio.volume = 0.5;
}

const $display = $("#display");

function display(text) {
  $display.text(text);
}

let pressedKeys = [];

function active(key) {
  const $audio = $("#" + key)[0];
  const $pad = $(`div[data-key=${key}]`);

  pressedKeys.push(key);
  $pad.addClass("active");

  $audio.play();
  $audio.currentTime = 0;

  display(sets.sounds[key].name);
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
    const $pad = $(`div[data-key=${key}]`);
    $pad.removeClass("active");
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

$("#volume-bar > input").on("input", function (event) {
  const $audios = $(".drum-pad > audio");
  const eventVolume = event.target.valueAsNumber;
  $audios.each((i, e) => (e.volume = eventVolume / 100));
  display("Volume: " + eventVolume);
});
