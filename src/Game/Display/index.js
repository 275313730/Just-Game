import Game from '../index.js'

export default {
  resolution(width, height) {
    if (!width || !height) {
      return [Game.width, Game.height];
    } else {
      Game.width = width;
      Game.height = height;
      Game.canvas.setAttribute('width', width);
      Game.canvas.setAttribute('height', height);
    }
  },
  background(color) {
    if (color) {
      Game.canvas.style.backgroundColor = color;
    } else {
      return Game.canvas.style.backgroundColor;
    }
  }
}