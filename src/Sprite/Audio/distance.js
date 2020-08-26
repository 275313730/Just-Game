/**
 * 获取单位和镜头的距离
 * @returns 距离
 */
export function getDistance(sprite) {
  const relX = sprite.relX;
  const relY = sprite.relY;
  return Math.sqrt(relX ** 2 + relY ** 2);
}
