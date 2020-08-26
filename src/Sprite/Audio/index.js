import Game from "../../Game/index.js";
import { setVolume } from './volume.js';

export default function audio(sprite) {
  let music = {};
  let sounds = [];

  /**
   * 播放音效
   * @param {AudioNode} newAudio 
   * @param {Object} options 
   */
  function playSound(newAudio, options) {
    const newSound = newAudio.cloneNode();

    newSound.volume = options.volume;
    newSound.play();

    sounds.push({
      audioNode: newSound,
      defalutVolume: options.volume,
      range: options.range
    });
  }

  /**
   * 播放音乐
   * @param {AudioNode} newAudio 
   * @param {Object} options 
   */
  function playMusic(newAudio, options) {
    if (!music.audioNode || music.audioNode !== newAudio) {
      music.audioNode = newAudio;
      music.defalutVolume = options.volume;
      music.range = options.range;

      newAudio.volume = options.volume;
      newAudio.loop = options.loop;
    }
    newAudio.play();
  }

  return {
    /**
     * 更新音频
     */
    update() {
      // 判断是否存在音频
      if (!music.audioNode && sounds.length === 0) return;

      // 音乐
      if (music.audioNode && music.range > 0) {
        setVolume(sprite, music);
      }

      // 音效
      for (let i = 0; i < sounds.length; i++) {
        const sound = sounds[i];
        const audioNode = sound.audioNode;
        // 移除播放完的音效
        if (audioNode.ended === true) {
          sounds.splice(i, 1);
          audioNode.remove();
          i--;
          continue;
        }
        if (range > 0) {
          setVolume(sprite, sound);
        }
      }
    },
    /**
     * 播放音频
     * @param {Object} options 
     */
    play(options) {
      const type = options.type;
      const group = options.group;
      const name = options.name;
      const newAudio = Game.asset.get(group, name);

      if (!type) throw Error("Audio type is missing.");

      // 当类型为音效时，克隆一个独立节点来播放
      // 当类型为音乐时，默认循环播放
      if (type === 'sound') {
        playSound(newAudio, options);
      }
      if (type === 'music') {
        playMusic(newAudio, options)
      }
    },
    /**
     * 停止播放音乐
     */
    stop() {
      music.pause();
      music.currentTime = 0;
    },
    /**
     * 清除所有音频
     */
    clear() {
      if (music.audioNode) {
        music.audioNode.remove();
      }
      sounds.forEach(function (sound) {
        sound.audioNode.remove();
      })
    }
  }
}