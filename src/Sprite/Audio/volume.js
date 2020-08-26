import { getDistance } from "./distance.js";

/**
 * 设置音量
 * @param {AudioNode} audioNode 音频节点
 * @param {number} range 音频范围
 * @param {number} defalutVolume 初始音量 
 * @param {number} distance 距离
 */
export function setVolume(sprite, { audioNode, range, defalutVolume }) {
  const distance = getDistance(sprite)
  if (!range) return;
  if (distance >= range) {
    audioNode.volume = 0;
  } else {
    audioNode.volume = defalutVolume * ((range - distance) / range);
  }
}

