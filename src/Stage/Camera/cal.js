import Game from "../../index.js"

/**
 * 计算镜头位置
 */
export function cameraCal(camera, stage) {
  let follow = camera.follow;
  // 当相机跟随单位时
  if (follow) {
    const position = borderCal(stage, follow);
    camera.x = position.x;
    camera.y = position.y;
  } else {
    // 执行相机移动函数
    camera.movement && camera.movement();
  }
}

/**
 * 计算边界问题
 * @param {Sprite} sprite 
 */
function borderCal(sprite) {
  const { x: ux, y: uy, width: uw, height: uh } = sprite;
  const { width: sw, height: sh } = stage;
  const { width: gw, height: gh } = Game;
  let x, y;

  // 相机处于舞台宽度范围内才会跟随单位x变化，否则固定值
  if (ux < (gw - uw) / 2) {
    x = 0;
  } else if (ux > sw - (gw + uw) / 2) {
    x = sw - gw;
  } else {
    x = ux - (gw - uw) / 2;
  }

  // 相机处于舞台高度范围内才会跟随单位x变化，否则固定值
  if (uy < (gh - uh) / 2) {
    y = 0;
  } else if (uy > sh - (gh + uh) / 2) {
    y = sh - gh;
  } else {
    y = uy - (gh - uh) / 2;
  }

  return { x, y };
}