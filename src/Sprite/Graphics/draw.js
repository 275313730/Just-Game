import { Game } from '../../index.js';

let ctx = Game.canvas.getContext("2d");
let floor = Math.floor;

/**
 * 绘制图片
 * @param {Image} image 图片
 */
export function drawImage(sprite, image) {
  let { relX: rx, relY: ry, offsetLeft: osl, offsetTop: ost, width, drawWidth: dw, drawHeight: dh, scale, flip } = sprite;
  if (!flip) {
    var tranlateX = floor(rx + osl);
    var tranlateY = floor(ry + ost);
    ctx.drawImage(image, 0, 0, dw, dh, tranlateX, tranlateY, dw * scale, dh * scale);
  } else {
    var tranlateX = floor(Game.width - width * scale - rx + osl);
    var tranlateY = floor(ry + ost);

    // 水平翻转绘制
    drawFlip(Game.width, function () {
      ctx.drawImage(image, 0, 0, dw, dh, tranlateX, tranlateY, dw * scale, dh * scale);
    })
  }
}

/**
 * 绘制动画
 * @param {Image} image 图片
 * @param {number} currFrame 当前帧
 * @param {boolean} imageFlip 是否翻转
 */
export function drawAnimation(sprite, image, currFrame, imageFlip) {
  var { relX: rx, relY: ry, offsetLeft: osl, offsetTop: ost, width: w, drawWidth: dw, drawHeight: dh, scale: s, flip: f } = sprite;

  // 图片方向
  if (!imageFlip && !f || imageFlip && f) {
    var tranlateX = floor(rx + osl);
    var tranlateY = floor(ry + ost);
    ctx.drawImage(image, currFrame * dw, 0, dw, dh, tranlateX, tranlateY, dw * s, dh * s);
  } else {
    var tranlateX = floor(Game.width - w * s - rx + osl);
    var tranlateY = floor(ry + ost);

    // 水平翻转绘制
    drawFlip(Game.width, function () {
      ctx.drawImage(image, currFrame * dw, 0, dw, dh, tranlateX, tranlateY, dw * s, dh * s);
    })
  }
}

/**
 * 测试开启时调用
 */
export function test(sprite) {
  let { relX, relY, width, height } = sprite;

  ctx.strokeStyle = 'red';
  ctx.strokeRect(relX, relY, width, height);
}


/**
 * 翻转绘制
 * @param {number} width 宽度
 * @param {Function} drawFunc 绘制函数
 */
function drawFlip(width, drawFunc) {
  ctx.translate(width, 0);
  ctx.scale(-1, 1);
  drawFunc();
  ctx.translate(width, 0);
  ctx.scale(-1, 1);
}