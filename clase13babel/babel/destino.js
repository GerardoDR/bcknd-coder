"use strict";

var random = function random(number) {
  return Math.floor(Math.random() * number);
};

var color = function color() {
  return 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
};
