/**
 * 设置尺寸
 * @param {number} width 宽度
 * @param {number} height 高度
 * @param {boolean} sameSize 是否与图片相同尺寸
 */
export function setSize(sprite, width, height, sameSize) {
  // 设置单位绘制尺寸
  sprite.drawWidth = width;
  sprite.drawHeight = height;

  if (sameSize) {
    sprite.width = width;
    sprite.height = height;
  }
}




