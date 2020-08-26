import Sprite from "../../Sprite/index.js";
import { createMovement } from "./move.js";
import { cameraCal } from './cal.js';

export default function camera(stage) {
  /**
   * 相机对象
   */
  let camera = {
    x: 0,
    y: 0,
    follow: null,
    movement: null
  };

  return {
    /**
     * 镜头跟随
     * @param {Sprite} sprite 
     */
    follow(sprite) {
      if (sprite === camera.follow) return;
      camera.follow = sprite;
    },
    /**
     * 更新镜头数据
     */
    update() {
      // 计算镜头数据
      cameraCal(camera, stage);

      // 返回镜头数据
      return camera;
    },
    /**
     * 镜头移动
     * @param {number} x 
     * @param {number} y 
     * @param {number} time 
     * @param {Function} callback 
     */
    move(x, y, time, callback) {
      createMovement(stage, x, y, time, callback);
    },
    /**
     * 镜头移动到单位
     * @param {Sprite} sprite 
     * @param {number} time 
     * @param {Function} callback 
     */
    moveTo(sprite, time, callback) {
      // 边界计算
      let { x, y } = borderCal(sprite);

      createMovement(stage, (x - camera.x), (y - camera.y), time, callback);
    },
    /**
     * 解除跟随
     */
    unFollow() {
      camera.follow = null;
    }
  };
}