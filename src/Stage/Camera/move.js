import Game from "../../Game/index.js"
import Stage from "../index.js";

/**
 * 创建相机移动函数
 * @param {Stage} stage 场景实例
 * @param {Number} x 移动横坐标
 * @param {Number} y 移动纵坐标
 * @param {Number} time 移动时间
 * @param {Function} onEnded 移动停止后执行的函数
 * @param {Boolean} disable 是否禁用所有精灵
 */
export function createMovement(stage, x, y, time, onEnded, disable = true) {
  // 计算数据
  const frames = time * 60 || 1;
  const perX = x / frames;
  const perY = y / frames;

  if (perX === 0 && perY === 0) return;

  // 取消相机跟随
  camera.follow = null;

  // 获取边界尺寸
  const { width: sw, height: sh } = stage;
  const { width: gw, height: gh } = Game;

  // 移动计数
  let count = 0;

  // 禁用单位
  if (disable === true) {
    Game.sprite.travel(function (sprite) {
      sprite.disabled = true;
    });
  }

  // 修改镜头移动函数
  camera.movement = function () {
    // 相机移动
    camera.x += perX;
    camera.y += perY;

    // 移动计数增加
    count++;

    // 判断移动计数和相机位置
    if (count > frames ||
      (camera.x < 0 || camera.x > sw - gw) ||
      (camera.y < 0 || camera.y > sh - gh)) {
      camera.x = Math.max(0, camera.x);
      camera.x = Math.min(camera.x, sw - gw);
      camera.y = Math.max(0, camera.y);
      camera.y = Math.min(camera.y, sh - gh);

      // 清空相机移动函数
      camera.movement = null;

      // 启用单位
      if (disable === true) {
        Game.sprite.travel(function (sprite) {
          sprite.disabled = false;
        });
      }

      // 执行回调函数
      onEnded && onEnded();
    }
  };
}

