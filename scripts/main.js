import { sets } from "/sounds/sets.js";

const keys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

let currentSet;

function loadSounds(soundsObj) {
  currentSet = soundsObj;
  for (const sound of Object.entries(soundsObj)) {
    const audio = $("#" + sound[0])[0];
    audio.src = sound[1].path;
    audio.volume = 0.5;
  }
}

loadSounds(sets[0].sounds);

const $display = $("#display");

function display(text) {
  $display.text(text);
}

let pressedKeys = [];

function active(key) {
  const $audio = $("#" + key)[0];
  const $pad = $(`div[data-key=${key}]`);

  pressedKeys.push(key);
  $pad.addClass("drum-pad-active");

  $audio.play();
  $audio.currentTime = 0;

  display(currentSet[key].name);
}

function inactive(event) {
  let key;
  event.key != undefined
    ? (key = event.key.toUpperCase())
    : (key = event.data.key.toUpperCase());

  const isPressed = pressedKeys.map((e, i) => {
    if (e === key) {
      pressedKeys.splice(i, 1);
      return true;
    }
  });

  if (isPressed) {
    const $pad = $(`div[data-key=${key}]`);
    $pad.removeClass("drum-pad-active");
  }
}

$(document).on("keyup", inactive);

$(document).keypress(function (event) {
  const eventKey = event.key.toUpperCase();
  if (pressedKeys.indexOf(eventKey) === -1) {
    keys.forEach((key) => {
      if (eventKey === key) {
        active(key);
      }
    });
  }
});

$(".drum-pad").on("mousedown", function (event) {
  const $element = $(event.currentTarget);
  const key = $element.attr("data-key");
  active(key);
  $(document).one("mouseup", { key: key }, inactive);
});

$("#volume-bar > input").on("input", function (event) {
  const $audios = $(".clip");
  const eventVolume = event.target.valueAsNumber;
  $audios.each((i, e) => (e.volume = eventVolume / 100));
  display("Volume: " + eventVolume);
});

for (let i = 0; i < Object.entries(sets).length; i++) {
  $("#sets").append(
    `<div class="set" data-index="${i}"><div>${i + 1}</div><p>${
      sets[i].title
    }</p></div>`
  );
}

$(`div[data-index="0"] > div`).addClass("set-active");

$(".set").on("click", function (event) {
  const $element = $(event.currentTarget);
  const $index = $element.attr("data-index");
  loadSounds(sets[$index].sounds);
  display(sets[$index].title);
  $(".set-active").removeClass("set-active");
  $(`div[data-index="${$index}"] > div`).addClass("set-active");
});
