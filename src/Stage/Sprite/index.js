import Game from '../../Game/index.js'
import Sprite from '../../Sprite/index.js';
import { checkLayer, spritesSort, addProperty } from './init.js';

let spritesCache = {}

export default function sprite(stage) {
  let sprites = Object.assign({}, spritesCache);

  return {
    /**
     * 添加新精灵
     * @param {Sprite} newSprite 
     */
    add(newSprite) {
      const id = newSprite.id;
      if (sprites[id]) throw new Error(`Sprite '${id}' exists.`);
      sprites[id] = newSprite;
      addProperty(newSprite, stage);
      checkLayer(newSprite.layer);
      spritesSort();
      return newSprite;
    },
    /**
     * 删除精灵
     * @param {string} id 精灵id
     */
    del(id) {
      const sprite = sprites[id];
      if (!sprite) throw new Error(`sprite ${id} doesn't exist`);
      sprite.beforeDestroy && sprite.beforeDestroy();
      delete Game.inputEvents[id];
      sprite.audio.clear();
      delete sprites[id];
      sprite.destroyed && sprite.destroyed();
    },
    /**
     * 删除所有精灵
     * @param {boolean} includeGlobal 是否包括全局精灵
     */
    clear(includeGlobal) {
      for (const key in sprites) {
        const sprite = sprites[key];
        if (!includeGlobal && sprite.global) {
          spritesCache[key] = sprite;
          continue;
        };
        this.del(key);
      }
    },
    /**
     * 查找精灵
     * @param {string} id 
     */
    find(id) {
      return sprites[id];
    },
    /**
     * 过滤符合条件的精灵(类似Array.prototype.filter)
     * @param {Function} callback 
     */
    filter(callback) {
      let newSprites = {};

      for (const key in sprites) {
        const sprite = sprites[key];
        if (callback(sprite) === false) continue;
        newSprites[key] = sprite;
      }

      return newSprites;
    },
    /**
     * 遍历精灵并执行回调函数(类似Array.prototype.forEach)
     * @param {Function} callback 
     */
    travel(callback) {
      for (const key in sprites) {
        // 回调函数返回false时停止遍历
        if (callback(sprites[key]) === false) break;
      }
    },
  }
}